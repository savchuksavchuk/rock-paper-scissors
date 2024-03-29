import { Router } from "express"
import { UserController } from "../controllers/user.controller"

export const router = Router()

router.post("/registration", UserController.registration)
router.post("/login", UserController.login)
