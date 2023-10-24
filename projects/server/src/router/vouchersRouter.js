const router = require("express").Router();
const { vouchersControllers } = require("../controllers");
const {auth, } = require('../middleware')

router.post("/", vouchersControllers.createVoucher);
router.patch("/:id", vouchersControllers.updateVoucher);
router.get("/", vouchersControllers.getAllVouchers);
router.get("/user",auth, vouchersControllers.getAllUserVouchers);


module.exports = router;