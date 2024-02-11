import { Router } from "express"
import { router as UserRouter } from "./user.router"

export const router = Router()

router.use("/user", UserRouter)
