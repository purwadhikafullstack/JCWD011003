const router = require("express").Router();
const { auth, validation } = require("../middleware");
const { getAllTransaction, getAllTransactionByBranch, cancelTransaction, getAllStockHistory, getStockHistoryByBranch, getTransactionDetail, getTROnly } = require('../controllers/transactionController1')

router.get("/",auth, getAllTransaction);
router.get("/just",auth, getTROnly);
router.get('/branch', auth, getAllTransactionByBranch )
router.get('/history', auth, getAllStockHistory)
router.get('/bhistory', auth, getStockHistoryByBranch)
router.get('/:id', auth, getTransactionDetail)


module.exports = router;