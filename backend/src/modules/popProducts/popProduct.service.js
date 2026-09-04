const supabase = require("../../config/supabase");

exports.createProduct = async (payload) => {
  const { data, error } = await supabase
    .from("pop_products")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
};

exports.getAllProducts = async () => {
  const { data, error } = await supabase
    .from("pop_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

exports.getProductById = async (id) => {
  const { data, error } = await supabase
    .from("pop_products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

exports.deleteProduct = async (id) => {
  const { error } = await supabase.from("pop_products").delete().eq("id", id);

  if (error) throw error;
};
