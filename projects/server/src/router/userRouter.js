const express = require("express");
const router = express.Router();
const { updateCart, resetCart, getCart, getCartItems } = require('../controllers/userController1')
const {verifyUser,} = require('../middleware/auth')

router.post(  "/cart",verifyUser, updateCart);
router.patch(  "/cart",verifyUser, resetCart);
router.get(  "/cart",verifyUser, getCart);
router.get(  "/items",verifyUser, getCartItems);

module.exports = router;
