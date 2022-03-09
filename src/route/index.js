import authRouter from "./auth"
import userRouter from "./user"
import groupCategoryRouter from "./groupCategory"
import buyerTypeRouter from "./buyerType"
import categoryRouter from "./category"
import sizeRouter from "./size"
import imagesProductRouter from "./imagesProduct"
import productRouter from "./product"


const configRoute = (app) =>{
   app.use("/v1/api/auth", authRouter);
   app.use("/v1/api/user", userRouter);
   app.use("/v1/api/groupCategory", groupCategoryRouter);
   app.use("/v1/api/buyerType", buyerTypeRouter);
   app.use("/v1/api/category", categoryRouter);
   app.use("/v1/api/size", sizeRouter);
   app.use("/v1/api/images-product", imagesProductRouter);
   app.use("/v1/api/product", productRouter);
}
module.exports = configRoute;
