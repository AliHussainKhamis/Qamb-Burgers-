import { Router } from 'express'
import {
  menuIndex,
  menuShow,
  menuCreate,
  menuUpdate,
  menuDelete
} from '../controllers/menu.controller.js'

const router = Router()

router.get('/', menuIndex)
router.get('/:id', menuShow)
router.post('/', menuCreate)
router.put('/:id', menuUpdate)
router.delete('/:id', menuDelete)

export default router
