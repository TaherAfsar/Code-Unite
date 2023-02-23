import { Router } from 'express'
const router = Router()
import { getAllProblems, getProblemById } from '../controllers/problem.js'

router.get('/fetch', getAllProblems)
router.get('/fetch/:id', getProblemById)


export default router;