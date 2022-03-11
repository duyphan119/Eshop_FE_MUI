import authRouter from "./auth";
import userRouter from "./user";
import groupCategoryRouter from "./groupCategory";
import buyerTypeRouter from "./buyerType";
import categoryRouter from "./category";
import sizeRouter from "./size";
import imagesProductRouter from "./imagesProduct";
import productRouter from "./product";
import fileRouter from "./file";

const configRoute = (app) => {
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/user", userRouter);
  app.use("/v1/api/group-category", groupCategoryRouter);
  app.use("/v1/api/buyer-type", buyerTypeRouter);
  app.use("/v1/api/category", categoryRouter);
  app.use("/v1/api/size", sizeRouter);
  app.use("/v1/api/images-product", imagesProductRouter);
  app.use("/v1/api/product", productRouter);
  app.use("/v1/api/file", fileRouter);
};
module.exports = configRoute;
