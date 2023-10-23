const db = require("../models");
const Product = db.Product;
const Stock = db.Stock;
const Cart_Stock = db.Cart_Stock;
const Cart = db.Cart;
const Branch = db.Branch;
const Stock_Promos = db.Stock_Promos;
const Stock_History = db.Stock_History;
const Category = db.Category;
const { Op } = require("sequelize");

const stockControllers = {
  createStock: async (req, res) => {
    try {
      const {
        id_product,
        id_branch,
        qty,
        discountPercent,
        id_stock_promo,
        isActive,
      } = req.body;

      const product = await Product.findByPk(id_product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const branch = await Branch.findByPk(id_branch);
      if (!branch) {
        return res.status(404).json({ error: "Branch not found" });
      }

      const stockPromo = await Stock_Promos.findByPk(id_stock_promo);
      if (!stockPromo) {
        return res.status(404).json({ error: "Stock Promo not found" });
      }

      let stock = await Stock.findOne({
        where: {
          id_product,
          id_branch,
        },
      });

      if (stock) {
        return res.status(400).json({
          error:
            "Stock already exists. Please update if you want to modify data.",
        });
      }

      stock = await Stock.create({
        id_product,
        id_branch,
        qty,
        discountPercent,
        id_stock_promo,
        isActive,
      });

      const updatedStock = await Stock.findOne({
        where: {
          id_product,
          id_branch,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
          },
          {
            model: Branch,
            attributes: ["id", "name"],
          },
          {
            model: Stock_Promos,
            attributes: ["id", "promoName"],
          },
        ],
      });

      return res.status(200).json({
        message: "Stock created successfully",
        stock: updatedStock,
      });
    } catch (error) {
      console.error("Error creating stock:", error);
      return res.status(500).json({ error: "Internal server error", error });
    }
  },

  updateAndRetrieveStock: async (req, res) => {
    try {
      const {
        id_product,
        id_branch,
        discountPercent,
        id_stock_promo,
        isActive,
      } = req.body;

      const product = await Product.findByPk(id_product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const branch = await Branch.findByPk(id_branch);
      if (!branch) {
        return res.status(404).json({ error: "Branch not found" });
      }

      let stock = await Stock.findOne({
        where: {
          id_product,
          id_branch,
        },
      });

      if (!stock) {
        stock = await Stock.create({
          id_product,
          id_branch,
          qty: 0,
        });
      }

      stock.discountPercent = discountPercent;
      stock.id_stock_promo = id_stock_promo;
      stock.isActive = isActive !== undefined ? isActive : stock.isActive;

      await stock.save();

      const updatedStock = await Stock.findOne({
        where: {
          id_product,
          id_branch,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
          },
          {
            model: Branch,
            attributes: ["id", "name"],
          },
          {
            model: Stock_Promos,
            attributes: ["id", "promoName"],
          },
        ],
      });

      return res.status(200).json({
        message: "Stock updated successfully",
        stock: updatedStock,
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  addStockProduct: async (req, res) => {
    try {
        const { id_product, id_branch, qty } = req.body;

        // Find the existing stock record or create a new one if it doesn't exist
        let stock = await Stock.findOne({
            where: {
                id_product,
                id_branch,
            },
        });

        if (!stock) {
            stock = await Stock.create({
                id_product,
                id_branch,
                qty: 0,
            });
        }

        // Record the current stock quantity before the update
        const oldQty = stock.qty;

        // Update the stock quantity
        stock.qty += qty;

        // Save the updated stock record
        await stock.save();

        // Create a Stock_History record to log the change
        await Stock_History.create({
            id_stock: stock.id,  // Assuming 'id' is the primary key of the Stock model
            changeQty: qty,
            totalQty: stock.qty,
            changedBy: 'Stock Addition', // Assuming you have user information in the request
            actor: `Admin id${req.account.id}`, // Assuming you have user information in the request
            // You can add more information to the history record as needed
        });

        // Fetch the updated stock with related data
        const updatedStock = await Stock.findOne({
            where: {
                id_product,
                id_branch,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "price"],
                },
                {
                    model: Branch,
                    attributes: ["id", "name"],
                },
                {
                    model: Stock_Promos,
                    attributes: ["id", "promoName"],
                },
            ],
        });

        return res.status(200).json({
            message: "Stock added successfully",
            stock: updatedStock,
        });
    } catch (error) {
        console.error("Error updating stock:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
},


  reduceStockProduct: async (req, res) => {
    try {
        const { id_product, id_branch, qty } = req.body;

        // Find the existing stock record
        let stock = await Stock.findOne({
            where: {
                id_product,
                id_branch,
            },
        });

        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        if (stock.qty < qty) {
            return res.status(400).json({ error: "Insufficient stock quantity" });
        }

        // Record the current stock quantity before the update
        const oldQty = stock.qty;

        // Update the stock quantity
        stock.qty -= qty;

        // Save the updated stock record
        await stock.save();

        // Create a Stock_History record to log the change
        Stock_History.create({
          id_stock: stock.id,  // Assuming 'id' is the primary key of the Stock model
          changeQty: -qty,
          totalQty: stock.qty,
          changedBy: 'Stock reduction', // Assuming you have user information in the request
          actor: `Admin id${req.account.id}`, // Assuming you have user information in the request
            // You can add more information to the history record as needed
        });

        // Fetch the updated stock with related data
        const updatedStock = await Stock.findOne({
            where: {
                id_product,
                id_branch,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "price"],
                },
                {
                    model: Branch,
                    attributes: ["id", "name"],
                },
                {
                    model: Stock_Promos,
                    attributes: ["id", "promoName"],
                },
            ],
        });

        return res.status(200).json({
            message: "Stock reduced successfully",
            stock: updatedStock,
        });
    } catch (error) {
        console.error("Error updating stock:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
},


  getAllStock: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const idProduct = parseInt(req.query.id_product);
      const idCategory = parseInt(req.query.id_category);
      const orderByName = req.query.orderByName;
      const orderByPrice = req.query.orderByPrice;
      const name = req.query.name;
      const id_branch = req.query.id_branch;

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const whereClause = {};
      if (idProduct) {
        whereClause.id_product = idProduct;
      }
      if (idCategory) {
        whereClause["$Product.id_category$"] = idCategory;
      }
      const order = [];
      if (orderByName) {
        order.push(["Product", "name", orderByName]);
      }
      if (orderByPrice) {
        order.push(["Product", "price", orderByPrice]);
      }
      if (name) {
        whereClause["$Product.name$"] = { [Op.like]: `%${name}%` };
      }
      if (id_branch) {
        whereClause["$Branch.id$"] = id_branch;
      }

      // Add a condition for isActive category
      whereClause["$Product.Category.isActive$"] = true; // Assuming the field is called 'isActive'

      const { count, rows: allStock } = await Stock.findAndCountAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "description", "productImg", "id_category"],
            include: [
              {
                model: Category,
                attributes: ["id", "category", "isActive"], // Include 'isActive' in the attributes
              },
            ],
          },
          {
            model: Branch,
            attributes: ["id", "name"],
          },
          {
            model: Stock_Promos,
            attributes: ["id", "promoName"],
          },
        ],
        offset,
        limit,
        where: whereClause,
        order,
      });

      if (allStock.length === 0) {
        return res
          .status(404)
          .json({ message: "No stock records found", count });
      }

      const totalPages = Math.ceil(count / pageSize);

      return res.status(200).json({
        message: "Get all stock records successfully",
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: count,
        data: allStock,
      });
    } catch (error) {
      console.error("Error fetching all stock records:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },



  
  getStockById: async (req, res) => {
    try {
      const { id } = req.params; // Get the stock ID from the URL parameter
      const { cartId } = req.account;
      console.log(cartId)
  
      // Find the stock record by ID
      const stock = await Stock.findByPk(id, {
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "description", "productImg", "id_category"],
            include: [
              {
                model: Category,
                attributes: ["id", "category"],
              },
            ],
          },
          {
            model: Branch,
            attributes: ["id", "name"],
          },
          {
            model: Stock_Promos,
            attributes: ["id", "promoName"],
          },
          
        ],
      });
     
      if (!stock) {
        return res.status(404).json({ message: "Stock record not found" });
      }
      const stockQty = await Cart_Stock.findOne({
        attributes: ["qty"], // Specify the attributes you want to include
        where: {
          id_cart: cartId, // Filter by cartId
          id_stock: id, // Filter by the stock's ID
        },
      });
      
        // console.log('qty',stockQty)
  
      return res.status(200).json({
        message: "Get stock record by ID successfully",
        data: stock,
        qty: stockQty ? stockQty.dataValues.qty : 0,
      });
    } catch (error) {
      console.error("Error fetching stock record by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deactivateStock: async (req, res) => {
    try {
      res.status(200).json({ message: "Stock deactivated successfully" });
    } catch (error) {
      console.error("Error deactivating stock:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  activateStock: async (req, res) => {
    try {
      res.status(200).json({ message: "Stock activated successfully" });
    } catch (error) {
      console.error("Error activating stock:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = stockControllers;
