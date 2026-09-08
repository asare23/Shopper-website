import React, { createContext, useState, useEffect } from "react";
import importedProducts from "../Components/Assets/all_product";
import { supabase } from "../client";

export const ShopContext = createContext(null);

const all_product = Array.isArray(importedProducts) ? importedProducts : [];

const getdefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItem] = useState(getdefaultCart());
  const [cartProducts, setCartProducts] = useState({});
  const [cartLoaded, setCartLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.warn("Failed to fetch profile", err.message);
      setProfile(null);
    }
  };

  const loadCart = async (userId) => {
    const { data, error } = await supabase
      .from("user_cart_items")
      .select("product_id, quantity, product")
      .eq("user_id", userId);

    if (error) {
      console.warn("Failed to load cart", error.message);
      setCartItem(getdefaultCart());
      setCartProducts({});
      setCartLoaded(true);
      return;
    }

    const nextItems = getdefaultCart();
    const nextProducts = {};
    data.forEach((item) => {
      nextItems[item.product_id] = item.quantity;
      if (item.product) nextProducts[item.product_id] = item.product;
    });
    setCartItem(nextItems);
    setCartProducts(nextProducts);
    setCartLoaded(true);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          fetchProfile(u.id);
          loadCart(u.id);
        } else {
          setCartItem(getdefaultCart());
          setCartProducts({});
          setCartLoaded(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.warn("Failed to restore session", error.message);
        }
        if (isMounted) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        // Do not await Supabase calls inside the auth event callback.
        setTimeout(() => {
          fetchProfile(u.id);
          loadCart(u.id);
        }, 0);
      } else {
        setProfile(null);
        setCartItem(getdefaultCart());
        setCartProducts({});
        setCartLoaded(true);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
    setCartItem(getdefaultCart());
    setCartProducts({});
    setCartLoaded(true);
  };

  const addToCart = (itemId, product) => {
    const quantity = (cartItems[itemId] || 0) + 1;
    setCartItem((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
    if (product) {
      setCartProducts((prev) => ({ ...prev, [itemId]: product }));
    }
    if (user && cartLoaded) {
      supabase.from("user_cart_items").upsert(
        {
          user_id: user.id,
          product_id: String(itemId),
          quantity,
          product: product || cartProducts[itemId] || null,
        },
        { onConflict: "user_id,product_id" },
      );
    }
  };

  const removeFromCart = (itemId) => {
    const quantity = Math.max((cartItems[itemId] || 0) - 1, 0);
    setCartItem((prev) => ({ ...prev, [itemId]: quantity }));
    if (quantity === 0) {
      setCartProducts((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    }
    if (user && cartLoaded) {
      const request =
        quantity === 0
          ? supabase
              .from("user_cart_items")
              .delete()
              .match({ user_id: user.id, product_id: String(itemId) })
          : supabase
              .from("user_cart_items")
              .update({ quantity })
              .match({ user_id: user.id, product_id: String(itemId) });
      request.then(({ error }) => {
        if (error) console.warn("Failed to update cart", error.message);
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo =
          cartProducts[item] ||
          all_product.find((product) => product.id === parseInt(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // derive first name
  const firstName =
    (profile?.full_name && profile.full_name.split(" ")[0]) ||
    (user?.user_metadata?.full_name &&
      user.user_metadata.full_name.split(" ")[0]) ||
    "";

  const contextValue = {
    all_product,
    cartProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    user,
    loading,
    login,
    logout,
    firstName,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
