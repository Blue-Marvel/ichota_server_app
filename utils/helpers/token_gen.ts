import jwt from "jsonwebtoken";

const createJwt = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
  return token;
};
// const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);
export default createJwt;
