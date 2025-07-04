const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.AWS_USER_POOL_CLIENT_ID,
});

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const payload = await verifier.verify(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      publicMetadata: payload['custom:publicMetadata'] ? 
        JSON.parse(payload['custom:publicMetadata']) : {},
      unsafeMetadata: payload['custom:unsafeMetadata'] ? 
        JSON.parse(payload['custom:unsafeMetadata']) : {},
    };
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.publicMetadata.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, requireAdmin }; 