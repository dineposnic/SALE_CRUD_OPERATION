// controllers/authController.js
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: 'Login successful', token: 'dummy-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
