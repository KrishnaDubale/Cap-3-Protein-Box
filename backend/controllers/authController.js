// Authentication controller
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(422).json({ message: "User Already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    });

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY);

    return res.status(200).json({ 
      token: token, 
      message: "User Created Successfully!" 
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(422).json({ message: "User does not exists" });
    }


    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password is incorrect." });
    }


    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    return res.status(200).json({ 
      token: token, 
      email: email 
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login
};

