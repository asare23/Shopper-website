const supabase = require("../../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ({ email, password, full_name }) => {
  // Check if user exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hashedPassword,
        full_name,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  const token = jwt.sign(
    { id: data.id, email: data.email, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user: data, token };
};

exports.login = async ({ email, password }) => {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  delete user.password;
  return { user, token };
};
