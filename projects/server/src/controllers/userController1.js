const db = require('../models')
const Transaction = db.Transaction;
const TP = db.Transaction_Stock;
const Stock = db.Stocks;
const Category = db.Category;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;
const { Op } = require("sequelize");

const updateCart = async (req, res) => {
    const { cartId, StockId, quantity } = req.body;
  
    try {
      await db.sequelize.transaction(async (t) => {
       
          const existingItem = await Cart_Stock.findOne({ where: { cartId, StockId } }, { transaction: t });
  
          if (existingItem) {
            existingItem.quantity = quantity;
            await existingItem.save({ transaction: t });
            res.status(200).json({ message: 'Item updated successfully', item: existingItem });
          } else {
            const newItem = await Cart_Stock.create(
              {
                cartId,
                StockId,
                quantity,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              { transaction: t }
            );
  
            res.status(201).json({ message: 'Item added to cart successfully', item: newItem });
          }
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the cart' });
    }
  };

  async function transactionUser (req, res) {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id, {
            where: {
              isPaid: false
            },
          include: [
            {
              model: TP,
              include: [
                {
                  model: Stock
                }
              ],
            }
        ]
        });
    
        if (!transaction) {
          res.status(404).json({ error: 'Transaction not found' });
          return;
        }
    
        res.status(200).json({ data: transaction });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
}

async function resetCart(req, res) {
    try {
      const { id } = req.params;
      await db.sequelize.transaction(async (t) => {
        await Cart.update(
          {
            totalPrice: 0,
            totalQty: 0,
          },
          {
            where: { id: id },
            transaction: t,
          }
        );
  
        await Cart_Stock.destroy({
          where: { cartId: id },
          transaction: t,
        });
      });
      res.status(200).json({ message: 'Cart deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting cart.' });
    }
  }
  
async function payment (req,res) {
    try {
        const {id} = req.params;
        await db.sequelize.transaction(async(t) =>{
            await Transaction.update(
                {
                    isPaid: true
                },
                {
                    where: {
                        id: id
                    },
                    transaction: t
                }
            )
        })
        res.status(200).json({message: 'Payment recorded'})
    } catch (error) {
        res.json(500).json({message: error})
    }
} 

const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

const buildStockFilter = (req) => {
    const { id_category, StockName } = req.query;
    const where = { isActive: true };
    if (id_category) {
        where.categoryId = id_category; 
    }
    if (StockName) {
        where.StockName = { [Op.like]: `%${StockName}%` };
    }
    return where;
};

const getStockSortOrder = (req) => {
    const sort = req.query.sort || 'desc';
    const field = req.query.field || 'createdAt'; // default sort field
    return sort === 'asc' ? [[field, 'ASC']] : [[field, 'DESC']];
};

const getStocksAndInclude = async (where, order, offset, limit) => {
    const includeOptions = [
        { model: Category },
    ];
    where.isActive = true;

    return await Stock.findAll({
        where,
        order,
        offset,
        limit,
        include: includeOptions,
    });
};

async function getStock(req, res){
    try {
        console.log(req.query)
        const { page, limit, offset } = getPaginationParams(req);
        const where = buildStockFilter(req);
        const order = getStockSortOrder(req);
  
        const totalStocks = await Stock.count({ where });
        const totalPages = Math.ceil(totalStocks / limit);

        const size = (function() {
            if (totalPages > limit) {
                return limit;
            } else {
                return totalPages;
            }
        })();
        console.log(size)
  
        const Stocks = await getStocksAndInclude(where, order, offset, limit);
  
        return res.status(200).json({
            message: "Stocks fetched successfully",
            data: {
                totalPages: totalPages,
                page: page,
                pageSize: size,
                Stocks: Stocks,
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Fetching Stocks failed' });
    }
}

  module.exports ={getStock,payment,resetCart, transactionUser, updateCart }