import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/user.service"

export class UserController {
  static registration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username, email, password } = req.body

      const userData = await UserService.registration(username, email, password)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      const userData = await UserService.login(email, password)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}
