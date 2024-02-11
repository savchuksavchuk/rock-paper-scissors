import mongoose from "mongoose"
import { IUserDocument } from "../models/user.model"

export class UserDto {
  _id: mongoose.Types.ObjectId
  username: string
  email: string

  constructor(model: IUserDocument) {
    this._id = model._id
    this.username = model.username
    this.email = model.email
  }
}
