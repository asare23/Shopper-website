const supabase = require("../../config/supabase");

exports.getAllNewProducts = async () => {
  const { data, error } = await supabase
    .from("new_products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
