import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
)

const getUserModel = () => mongoose.model("User", UserSchema)

type UserModelType = ReturnType<typeof getUserModel>

export type IUserDocument = Awaited<ReturnType<UserModelType["create"]>>[number]

export default (mongoose.models.User as UserModelType) || getUserModel()
