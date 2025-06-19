const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.status(201).json({ email: user.email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
