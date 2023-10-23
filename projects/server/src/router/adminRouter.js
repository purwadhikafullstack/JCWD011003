const router = require("express").Router();
const { adminControllers } = require('../controllers');
const { auth, validation } = require("../middleware");
const {  confirmPayment, sendOrder, cancelPayment } = require('../controllers/adminController1')
const { getAllTransaction, cancelTransaction } = require('../controllers/transactionController1')

router.post("/login", adminControllers.loginAdmin);
router.post("/admin", adminControllers.createAdmin); 
router.get("/all", auth, getAllTransaction); 
router.get("/admin", adminControllers.getAllAdmin); 
router.patch("/activate", adminControllers.adminActive); 
router.patch("/deactivate", adminControllers.adminInActive); 
router.patch("/update/:id", adminControllers.updateAdmin); 
router.patch('/cancel/:id', auth, cancelPayment )
router.patch('/confirm/:id', auth, confirmPayment )
router.patch('/send/:id', auth, sendOrder )



module.exports = router