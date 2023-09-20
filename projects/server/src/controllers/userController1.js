const db = require('../models')
const { Op } = require("sequelize");
const Transaction = db.Transaction;
const TP = db.Transaction_Stock;
const Product = db.Product;
const Category = db.Category;
const Stock = db.Stock;
const Cart = db.Cart;
const Cart_Stock = db.Cart_Stock;

async function updateCart(req, res) {
  try {
    const { stockId, quantity } = req.body;
    const { cartId } = req.user;

    await db.sequelize.transaction(async (t) => {
      const stockItem = await Stock.findByPk(stockId, {
        include: Product,
        transaction: t,
      });

      if (!stockItem) {
        throw new Error('Stock item not found');
      }

      const weight = stockItem.Product.weight * quantity;
      const price = stockItem.Product.price * quantity;

      // Check if a record with the same stockId and cartId exists
      const [cartStockItem, created] = await Cart_Stock.findOrCreate({
        where: { id_stock: stockItem.id, id_cart: cartId },
        defaults: {
          price: price,
          qty: quantity,
          weight: weight,
        },
        transaction: t,
      });

      if (!created) {
        // If not created, update the existing record
        await Cart_Stock.update(
          {
            price: price,
            qty: quantity,
            weight: weight,
          },
          {
            where: { id_stock: stockItem.id, id_cart: cartId },
            transaction: t,
          }
        );
      }

      // Calculate and update Cart totals based on Cart_Stock changes
      const cartStockItems = await Cart_Stock.findAll({
        where: { id_cart: cartId },
        transaction: t,
      });

      const totPrice = cartStockItems.reduce((total, item) => total + item.price, 0);
      const totQty = cartStockItems.reduce((total, item) => total + item.qty, 0);
      const totWeight = cartStockItems.reduce((total, item) => total + item.weight, 0);

      // Update the Cart with the new totals
      await Cart.update(
        {
          totPrice: totPrice,
          totQty: totQty,
          totWeight: totWeight,
        },
        {
          where: { id: cartId },
          transaction: t,
        }
      );

      res.status(201).json(cartStockItem);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
      const { cartId } = req.user;
      await db.sequelize.transaction(async (t) => {
        await Cart.update(
          {
            totPrice: 0,
            totQty: 0,
            totWeight: 0,
          },
          {
            where: { id: cartId },
            transaction: t,
          }
        );
  
        await Cart_Stock.destroy({
          where: { id_cart: cartId },
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
  try {
    const { cartId } = req.user;
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the cart' });
  }
};
async function getCartItems(req, res) {
  try {
    const { cartId } = req.user;

    if (!cartId) {
      return res.status(400).json({ message: 'Invalid cartId' });
    }

    const cartItems = await Cart_Stock.findAll({
      where: { id_cart: cartId },
      include: [
        {
          model: Stock,
          include: [
            {
              model: Product, // Include the Product model
              attributes: ['name', 'price', 'productImg'], // Select specific attributes from Product
            },
          ],
        },
        Cart,
      ],
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching cart items', error: error.message });
  }
}


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
              totalItem += item.qty;
              totalPrice += item.qty * item.Stock.StockPrice;
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
                      qty: item.qty,
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