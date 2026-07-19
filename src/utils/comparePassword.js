import bcrypt from "bcrypt";

const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

export default comparePassword;