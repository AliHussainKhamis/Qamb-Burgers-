import { Router } from 'express'
import { orderCreate, orderIndex, orderShow } from '../controllers/order.controller.js'

const router = Router()

router.post('/', orderCreate)  
router.get('/', orderIndex)     
router.get('/:id', orderShow)   

export default router
