import jwt from "jsonwebtoken"
import { UserDto } from "../dtos/user.dto"

export class TokenService {
  static generateToken = async (payload: UserDto) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_SECRET) {
      throw new Error("No jwt secrets available!")
    }

    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET)

    return {
      token,
    }
  }
}
