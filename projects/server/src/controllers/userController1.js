const db = require('../models')
const Transaction = db.Transaction;
const TP = db.Transaction_Stock;
const Stock = db.Stocks;
const Category = db.Category;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;
const { Op } = require("sequelize");

const updateCart = async (req, res) => {
    const { id_cart, id_stock, quantity } = req.body;
  
    try {
      await db.sequelize.transaction(async (t) => {
       
          const existingItem = await Cart_Stock.findOne({ where: { id_cart, id_stock } }, { transaction: t });
  
          if (existingItem) {
            existingItem.quantity = quantity;
            await existingItem.save({ transaction: t });
            res.status(200).json({ message: 'Item updated successfully', item: existingItem });
          } else {
            const newItem = await Cart_Stock.create(
              {
                id_cart,
                id_stock,
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
            totPrice: 0,
            totQty: 0,
          },
          {
            where: { id: id },
            transaction: t,
          }
        );
  
        await Cart_Stock.destroy({
          where: { id_cart: id },
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
    const field = req.query.field || 'createdAt'; 
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

async function getCart(req, res) {
  const { id_cart } = req.params;

  try {
    const cart = await Cart.findByPk(id_cart);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the cart' });
  }
};
async function getCartItems (req,res) {
  try {
      const cartItems = await Cart_Stock.findAll({
        include: [Cart, Stock] // Include both Cart and Stock models in the query
      });
      // console.log(cartItems)
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching cart items' });
    }
};

async function cartTotal() {
  try {
    const carts = await Cart.findAll({
      attributes: ["id", "userId", "totalPrice", "totalItem", [sequelize.fn('SUM', sequelize.col('Cart_Stock.qty')), 'totQty']],
      include: [{
        model: Cart_Stock,
        attributes: []
      }],
      group: ["Cart.id"]
    });

    console.log(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
  }
}

async function createTransaction(req, res) {
  try {
      await db.sequelize.transaction(async (t) => {
          const cartItemsObject = req.body;
          const cartItems = cartItemsObject.cartItems; 

          let totalItem = 0;
          let totalPrice = 0;

          for (const item of cartItems) {
              totalItem += item.quantity;
              totalPrice += item.quantity * item.Stock.StockPrice;
          }
          const transaction = await Transaction.create(
              {
                  userId: cartItems[0].Cart.userId,
                  totalPrice: totalPrice,
                  totalItem: totalItem,
                 
              },
              { transaction: t } 
          );
          for (const item of cartItems) {
              await TP.create(
                  {
                      transactionId: transaction.id,
                      id_stock: item.Stock.id,
                      StockPrice: item.Stock.StockPrice,
                      quantity: item.quantity,
                  },
                  { transaction: t } 
              );
          }
          res.status(201).json({ message: 'Cart items sent successfully', data: transaction.id });
      });

  } catch (error) {
      console.error('Error sending cart:', error);
      res.status(500).json({ error: 'An error occurred' });
  }
};
async function deleteCartItems (req,res) {
  const { id_cart, id_stock } = req.body;

  try {
    await db.sequelize.transaction(async (t) => {
      const existingItem = await Cart_Stock.findOne({ where: { id_cart, id_stock } });

      if (existingItem) {
        await existingItem.destroy({ transaction: t });

        return res.status(200).json({ message: 'Item deleted from cart successfully' });
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the item from cart' });
  }
};

  module.exports ={getStock,payment,resetCart, transactionUser, updateCart, createTransaction, deleteCartItems, getCartItems, getCart }