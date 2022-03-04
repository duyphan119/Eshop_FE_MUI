import authRouter from "./auth"



let configRoute = (app) =>{
   app.use("/v1/api/auth", authRouter);
}
module.exports = configRoute;
