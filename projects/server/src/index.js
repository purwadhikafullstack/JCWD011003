require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const apiRouter = express.Router();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: process.env.WHITELISTED_DOMAIN && process.env.WHITELISTED_DOMAIN.split(","),
  })
);

  app.use(express.json());
  const db = require('./models')
  // db.sequelize.sync({alter: true})
  const {vouchersControllers} = require("./controllers");
  
  const {authRouter, adminRouter,userRouter, profileRouter, rajaongkirRouter, addressRouter, categoriesRouter, productRouter, stockRouter, stockPromoRouter, vouchersRouter, transactionRouter} = require('./router');
  const path = require("path");
  
  app.use('/api', apiRouter)
  apiRouter.use('/user', userRouter)
  // apiRouter.use('/admin', apiRouter,adminRouter)
  apiRouter.use('/profile', profileRouter)
  apiRouter.use('/rajaongkir', rajaongkirRouter)
  apiRouter.use('/auth', authRouter)
  apiRouter.use('/address', addressRouter)
  apiRouter.use('/category', categoriesRouter)
  apiRouter.use('/product', productRouter)
  apiRouter.use('/stock-promo', stockPromoRouter)
  apiRouter.use('/stock', stockRouter)
  apiRouter.use('/vouchers', vouchersRouter)
  apiRouter.use('/transaction', transactionRouter)
  apiRouter.use('/admin', adminRouter)


// app.use('/api', apiRouter)
// const {authRouter, userRouter} = require('./router')
//#region API ROUTES
// app.use("/public", express.static(path.resolve(__dirname,"../public")))
// app.use("/api/public", express.static(path.resolve(__dirname, "../public")))

if(__dirname.split("/").includes("www")) {
  app.use("/api/public", express.static(path.resolve(__dirname, "../../../public")))
} else{
  app.use("/api/public", express.static(path.resolve(__dirname, "../public")))
}
// vouchersControllers.scheduleDeleteExpiredVouchers();

// ===========================
// NOTE : Add your routes here
// apiRouter.use('/auth', authRouter)
// app.get("/api", (req, res) => {
//   res.send(`Hello, this is my API`);
// });

// app.get("/api/greetings", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello, Student !",
//   });
// });

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion


app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

