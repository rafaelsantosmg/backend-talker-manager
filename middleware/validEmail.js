module.exports = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validEmail.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};