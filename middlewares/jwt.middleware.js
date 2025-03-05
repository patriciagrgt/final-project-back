import pkg from 'jsonwebtoken';
const { verify } = pkg;

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided or not valid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid" });
  }
};

// Export the middleware so that we can use it to create protected routes
export {
  isAuthenticated
};
