
const prisma = require('../config/database');
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    
    return res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
      select: { 
        id: true, 
        name: true, 
        email: true 
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUsers,
  getProfile
};

