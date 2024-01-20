export const jwtConfig = () => ({
  secret: `${process.env.JWT_SECRET}`,
  expirationTime: `${process.env.JWT_EXPIRATION_TIME}`,
});
