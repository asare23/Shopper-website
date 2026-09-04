const supabase = require("../../config/supabase");

exports.getAllProducts = async () => {
  const { data, error } = await supabase
    .from("cat_products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

exports.getProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from("cat_products")
    .select("*")
    .eq("category", category);

  if (error) throw new Error(error.message);
  return data;
};
