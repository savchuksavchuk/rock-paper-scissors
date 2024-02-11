import { UserDto } from "../dtos/user.dto"
import { ApiError } from "../exceptions/api.error"
import userModel from "../models/user.model"
import bcrypt from "bcrypt"
import { TokenService } from "./token.service"

export class UserService {
  static registration = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const candidate = await userModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists!`)
    }

    const hashedPassword = await bcrypt.hash(password, 7)

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    })

    const userDto = new UserDto(user)

    const token = await TokenService.generateToken(userDto)

    return {
      ...token,
      user: userDto,
    }
  }

  static login = async (email: string, password: string) => {
    const user = await userModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest("Incorrect email or password!")
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password)

    if (!isPasswordEqual) {
      throw ApiError.BadRequest("Incorrect email or password!")
    }

    const userDto = new UserDto(user)

    const token = await TokenService.generateToken({ ...userDto })

    return {
      ...token,
      user: userDto,
    }
  }
}
