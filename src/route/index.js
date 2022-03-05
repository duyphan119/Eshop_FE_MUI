import authRouter from "./auth"
import userRouter from "./user"
import categoryRouter from "./category"



let configRoute = (app) =>{
   app.use("/v1/api/auth", authRouter);
   app.use("/v1/api/user", userRouter);
   app.use("/v1/api/category", categoryRouter);
}
module.exports = configRoute;
