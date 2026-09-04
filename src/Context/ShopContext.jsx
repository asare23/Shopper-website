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

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        const u = session?.user ?? null;
        setUser(u);
        if (u) fetchProfile(u.id);
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
        setTimeout(() => fetchProfile(u.id), 0);
      } else {
        setProfile(null);
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
  };

  const addToCart = (itemId, product) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (product) {
      setCartProducts((prev) => ({ ...prev, [itemId]: product }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
