import express from 'express'
import authMiddleware from '../middlewares/authmiddleware'
import { createTaskHandler, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/tasks-controller'
import { createTaskValidator, readTaskIdValidator } from '../validators/create-taks-validator'

const router = express.Router()

router.post("/create-task", createTaskValidator, authMiddleware, createTaskHandler)

router.get("/", authMiddleware, getAllTasks)

router.get("/:id", readTaskIdValidator, authMiddleware, getTaskById)

router.put("/:id/update-task", readTaskIdValidator, createTaskValidator, authMiddleware, updateTask)

router.delete("/:id/delete-task", readTaskIdValidator, authMiddleware, deleteTask)

export default router