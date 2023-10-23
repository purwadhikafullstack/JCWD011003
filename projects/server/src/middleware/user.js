const db = require('../models')
const Transaction = db.Transaction;
const checkTransaction = async (req, res, next) => {
    const { id } = req.account;
  
    try {
      const checkTR = await Transaction.findOne({
        where: {
          id_user: id,
          id_status: 1
        }
      });
  
      if (!checkTR) {
        // Data with status 1 exists for the user, no need to pass it.
        next(); // Continue to the next middleware or route handler.
      } else {
        // No data found, you can handle this as needed (e.g., return an error response).
        return res.status(200).json({message: 'you have unpaid transaction', value: false});
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = {checkTransaction}