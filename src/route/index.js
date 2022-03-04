import homeRouter from "./home"



let configRoute = (app) =>{
   app.use("/", homeRouter);
}
module.exports = configRoute;
