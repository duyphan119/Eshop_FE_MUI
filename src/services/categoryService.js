import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
const getCategoriesByBuyerTypeSlug = async (params) =>{
   const {buyerTypeSlug} = params;
   try {
      let categories = await sequelize.query(
        `select c.* from categories c, groupcategories g, buyertypes b
           where b.slug = '${buyerTypeSlug}' and c.groupCategoryId = g.id
           and g.buyerTypeId = b.id order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
      return categories;
    } catch (error) {
      console.log(error);
      return [];
    }
}
module.exports = {getCategoriesByBuyerTypeSlug}