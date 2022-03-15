import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const getGroupCategoriesByBuyerTypeSlug = async (params) =>{
   const {buyerTypeSlug} = params;
   try {
      let groupCategories = await sequelize.query(
        `select g.* from  groupcategories g, buyertypes b
           where b.slug = '${buyerTypeSlug}' and 
           g.buyerTypeId = b.id order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
      return groupCategories;
    } catch (error) {
      console.log(error);
      return [];
    }
}
module.exports = {getGroupCategoriesByBuyerTypeSlug}