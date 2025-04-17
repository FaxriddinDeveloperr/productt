import bcrypt from "bcrypt";

const password = "qwer12345";
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const hashedPassword2 = await bcrypt.hash(password, salt);
const hashedPassword3 = await bcrypt.hash(password, salt);

const newPassword = "qwer12345";
console.log(hashedPassword);