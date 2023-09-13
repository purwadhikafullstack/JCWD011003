const router = require("express").Router();
const { authController } = require("../controllers");
const {  validateRequest,  validateLogin,  validateRegistration,  validateForgotPassword,  validateResetPassword,} = require("../middleware/validation");
const {  verifyToken,  verifyAdmin,  verifyCashierStatus,  verifyUserExist,} = require("../middleware/auth");

router.post(  "/login",   authController.userLogin);
router.post(  "/user",  authController.createUser);
// router.put(  "/forgotpass",  validateForgotPassword,  validateRequest,  authController.forgotPassword);
// router.patch(  "/resetpass",  verifyToken,  verifyUserExist,  validateResetPassword,  validateRequest,  authController.resetPassword);

module.exports = router;