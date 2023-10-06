import jsonwebtoken from "jsonwebtoken";
import { SECRET_KEY } from "../config";

class Jwt {
  static encrypt(data, expire = "1m", key = SECRET_KEY) {
    return jsonwebtoken.sign(data, key, { expiresIn: expire });
  }
  static verify(token, key = SECRET_KEY) {
    return jsonwebtoken.verify(token, key);
  }
}

export default Jwt;
