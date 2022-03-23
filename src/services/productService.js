import sizeService from "./sizeService";
import imagesProductService from "./imagesProductService";
import commentService from "./commentService";
import { QueryTypes } from "@sequelize/core";
import db, { sequelize } from "../models";
import slugify from "slugify";
const getProductsAllFields = async (user, products) => {
  const newProducts = [];
  for (let i = 0; i < products.length; i++) {
    let imagesProduct = (
      await imagesProductService.getByProductId({ productId: products[i].id })
    ).data;
    let sizes = (
      await sizeService.getByProductId({ productId: products[i].id })
    ).data;
    let index = newProducts.findIndex((item) => item.slug === products[i].slug);
    let productColor = {
      color: products[i].color,
      colorCode: products[i].colorCode,
      images: imagesProduct,
      sizes,
    };
    delete products[i].color;
    delete products[i].colorCode;
    products[i].productColors = [];
    if (index === -1) {
      // Thêm
      let comments = await commentService.getByProductSlug({
        productSlug: products[i].slug,
      });
      products[i].productColors.push(productColor);
      products[i].comments = comments;
      products[i].isWished = false;
      if (user) {
        let queryString = `select * from wishlistitems where productSlug = '${products[i].slug}' and userId = ${user.id}`;
        const checkWishlist = await sequelize.query(queryString, {
          type: QueryTypes.SELECT,
          raw: true,
        });
        products[i].isWished = checkWishlist.length !== 0;
      }
      newProducts.push(products[i]);
    } else {
      // Gộm
      newProducts[index].productColors.push(productColor);
    }
  }
  return newProducts;
};
const getTotalPages = async (query) => {
  try {
    const { limit } = query;
    let queryString = `select distinct slug from products`;
    const products = await sequelize.query(queryString, {
      type: QueryTypes.SELECT,
      raw: true,
    });
    return {
      status: 200,
      data: Math.round(products.length / limit),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const deleteById = async (params) => {
  try {
    const { productId } = params;
    await db.Product.destroy({ where: { id: productId } });
    return {
      status: 200,
      data: "This product is deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const updateById = async (params, body) => {
  try {
    const { productId } = params;
    const {
      name,
      oldPrice,
      newPrice,
      color,
      colorCode,
      description,
      categoryId,
    } = body;
    const slug = slugify(name.toLowerCase());
    await db.Product.update(
      {
        name,
        oldPrice,
        newPrice,
        color,
        colorCode,
        description,
        slug,
        categoryId,
      },
      { where: { id: productId } }
    );
    return {
      status: 200,
      data: "This product is updated",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getById = async (params) => {
  try {
    const { productId } = params;
    const product = await db.Product.findByPk(productId);
    return {
      status: 200,
      data: product,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getAll = async (query) => {
  try {
    const { p, limit } = query;
    let queryString = "";
    if (p && limit) {
      queryString = `select p.* , c.name as categoryName from products p, categories c,
      (select distinct slug from products limit ${limit} 
        offset ${
          (p - 1) * limit
        }) x where p.slug = x.slug and p.categoryId = c.id order by createdAt desc`;
    } else {
      queryString = `select p.* , c.name as categoryName from products p, categories c,
      (select distinct slug from products
       ) x where p.slug = x.slug and p.categoryId = c.id order by createdAt desc`;
    }
    const products = await sequelize.query(queryString, {
      type: QueryTypes.SELECT,
    });
    return {
      status: 200,
      data: products,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getBySlug = async (user, params, query) => {
  try {
    const { productSlug } = params;
    const { all } = query;
    const products = await db.Product.findAll({
      where: {
        slug: productSlug,
      },
      raw: true,
    });
    if (!all || products.length === 0) {
      return {
        status: 200,
        data: null,
      };
    }
    const newProducts = await getProductsAllFields(user, products);
    return {
      status: 200,
      data: newProducts[0],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const getByCategorySlug = async (user, params, query) => {
  try {
    const { categorySlug } = params;
    const { all, sortBy, sortType, color, size, newPrice, p, num } = query;
    const queryString = `select p.*
    from products p, (select DISTINCT p.slug
    from products p, categories c, groupcategories g, buyertypes b, sizes s
    where p.categoryId = c.id and c.groupCategoryId = g.id and g.buyerTypeId = b.id and s.productId = p.id and
    (c.slug = '${categorySlug}' or g.slug = '${categorySlug}' or b.slug = '${categorySlug}')
    ${(() => {
      let filterString = "";
      if (color) {
        filterString += " and (";
        let colorFilters = JSON.parse(color);
        if (colorFilters.length === 0) {
          return "";
        }
        colorFilters.forEach((colorFilter, index) => {
          filterString += `${
            index !== 0 ? " or " : ""
          } p.color = '${colorFilter}'`;
        });
        filterString += ")";
      }
      return filterString;
    })()} 
    ${(() => {
      let filterString = "";
      if (size) {
        filterString += " and (";
        let sizeFilters = JSON.parse(size);
        if (sizeFilters.length === 0) {
          return "";
        }
        sizeFilters.forEach((sizeFilter, index) => {
          filterString += `${
            index !== 0 ? " or " : ""
          } s.size = '${sizeFilter}'`;
        });
        filterString += ")";
      }
      return filterString;
    })()} 
    ${(() => {
      let filterString = "";
      if (newPrice) {
        filterString += " and (";
        let newPriceFilters = JSON.parse(newPrice);
        if (newPriceFilters.length === 0) {
          return "";
        }
        newPriceFilters.forEach((newPriceFilter, index) => {
          let split = newPriceFilter.split(";");
          if (newPriceFilter[0] === ";") {
            let max = parseInt(split[1]);
            if (!isNaN(max)) {
              filterString += `${
                index !== 0 ? " or " : ""
              } p.newPrice <= ${max}`;
            }
          } else if (newPriceFilter[newPriceFilter.length - 1] === ";") {
            let min = parseInt(split[0]);
            if (!isNaN(min)) {
              filterString += `${
                index !== 0 ? " or " : ""
              } p.newPrice >= ${min}`;
            }
          } else {
            let min = parseInt(split[0]);
            let max = parseInt(split[1]);
            if (!isNaN(min) && !isNaN(max)) {
              filterString += `${
                index !== 0 ? " or " : ""
              } (p.newPrice >= ${min} and p.newPrice <= ${max})`;
            }
          }
        });
        filterString += ")";
      }
      return filterString;
    })()} 
    ${
      sortBy && sortType
        ? `order by p.${sortBy} ${sortType}`
        : "order by p.createdAt desc"
    }  ${num ? `limit ${num}` : ""}  ${p ? `offset ${(p - 1) * num}` : ""} ) x
    where p.slug = x.slug`;
    let products = await sequelize.query(queryString, {
      type: QueryTypes.SELECT,
      raw: true,
    });
    if (!all || products.length === 0) {
      return {
        status: 200,
        data: products,
      };
    }
    const newProducts = await getProductsAllFields(user, products);
    return {
      status: 200,
      data: newProducts,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const create = async (body) => {
  try {
    const {
      name,
      oldPrice,
      newPrice,
      color,
      colorCode,
      description,
      categoryId,
    } = body;
    const id = await generateId();
    console.log(id);
    const slug = slugify(name.toLowerCase());
    const savedProduct = await db.Product.create({
      id,
      name,
      oldPrice,
      newPrice,
      color,
      colorCode,
      description,
      slug,
      categoryId,
    });
    return {
      status: 200,
      data: savedProduct,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

const generateId = async () => {
  let result = "P";
  let date = new Date();
  result += date.getFullYear().toString().substring(2);

  let queryString = `select count(id) as total from products`;
  const queryResult = await sequelize.query(queryString, {
    type: QueryTypes.SELECT,
    raw: true,
  });
  let count = queryResult[0].total + 1;
  let prefix = "";
  if (count < 10) {
    prefix = "000";
  } else if (count < 100) {
    prefix = "00";
  } else if (count < 1000) {
    prefix = "0";
  }
  result += prefix + count;
  return result;
};

module.exports = {
  deleteById,
  getTotalPages,
  getProductsAllFields,
  updateById,
  getById,
  getAll,
  getBySlug,
  getByCategorySlug,
  create,
};
