import { Router } from 'express'
import { cartGet, cartAddItem, cartRemoveItem, cartClear } from '../controllers/cart.controller.js'

const router = Router()

router.get('/:userId', cartGet)
router.post('/:userId/items', cartAddItem)
router.delete('/:userId/items/:lineId', cartRemoveItem)
router.delete('/:userId', cartClear)

export default router
