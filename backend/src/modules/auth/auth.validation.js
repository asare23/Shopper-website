exports.registerSchema = (data) => {
    const { email, password } = data;
  
    if (!email || !password) {
      return 'Email and password are required';
    }
  
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
  
    return null;
  };

  
