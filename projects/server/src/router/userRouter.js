const express = require("express");
const router = express.Router();
const {checkTransaction} = require('../middleware/user')
const { updateCart, resetCart, getCart, getCartItems } = require('../controllers/userController1')
const {getAddressCheckout, createTransaction, confirmArrival, } = require('../controllers/userController2')
const {Payment, getUnpaid, deleteCartItem, getAllUserTransactions, getUserTransactionsById, cancelOrder, confirmOrder } = require('../controllers/userController3')
const {auth, multerUpload} = require('../middleware')

console.log(checkTransaction)
router.post(  "/cart",auth, checkTransaction, updateCart);
router.patch(  "/cart",auth, resetCart);
router.post(  "/checkout",auth,checkTransaction, createTransaction);
router.get('/unpaid', auth, getUnpaid)
router.post('/payment', auth, multerUpload.single('payment'), Payment)
router.patch(  "/cart",auth, resetCart);
router.get(  "/cart",auth,checkTransaction, getCart);
router.get(  "/items",auth,checkTransaction, getCartItems);
router.get(  "/address/:branch",auth, getAddressCheckout);
router.get('/transaction', auth, getAllUserTransactions)
router.patch("/cancel/:transactionId",auth, cancelOrder);
router.patch("/confirm/:trId",auth, confirmOrder);
router.delete( "/clean/:id_stock",auth, deleteCartItem);
router.get('/transaction/:trId', auth, getUserTransactionsById)

module.exports = router;