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
const getAll = async (user, query) => {
  try {
    const { p, limit, q } = query;
    if (/[!-#%-*,-\/:;?@[-\]_{}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65\u{10100}-\u{10102}\u{1039F}\u{103D0}\u{1056F}\u{10857}\u{1091F}\u{1093F}\u{10A50}-\u{10A58}\u{10A7F}\u{10AF0}-\u{10AF6}\u{10B39}-\u{10B3F}\u{10B99}-\u{10B9C}\u{10F55}-\u{10F59}\u{11047}-\u{1104D}\u{110BB}\u{110BC}\u{110BE}-\u{110C1}\u{11140}-\u{11143}\u{11174}\u{11175}\u{111C5}-\u{111C8}\u{111CD}\u{111DB}\u{111DD}-\u{111DF}\u{11238}-\u{1123D}\u{112A9}\u{1144B}-\u{1144F}\u{1145B}\u{1145D}\u{114C6}\u{115C1}-\u{115D7}\u{11641}-\u{11643}\u{11660}-\u{1166C}\u{1173C}-\u{1173E}\u{1183B}\u{11A3F}-\u{11A46}\u{11A9A}-\u{11A9C}\u{11A9E}-\u{11AA2}\u{11C41}-\u{11C45}\u{11C70}\u{11C71}\u{11EF7}\u{11EF8}\u{12470}-\u{12474}\u{16A6E}\u{16A6F}\u{16AF5}\u{16B37}-\u{16B3B}\u{16B44}\u{16E97}-\u{16E9A}\u{1BC9F}\u{1DA87}-\u{1DA8B}\u{1E95E}\u{1E95F}]/u.test(q)) {
      return {
        status: 200,
        data: [],
      };
    }
    let queryString = "";
    queryString = `select p.* , c.name as categoryName from products p, categories c,
      (select distinct slug from products ${limit ? `limit ${limit}` : ""}
      ${(limit && p) ? `offset ${(p - 1) * limit}` : ""}
        ) x where p.slug = x.slug and p.categoryId = c.id
          ${q ? ` and p.name like '%${q}%'` : ""}
        order by createdAt desc`;
    let products = await sequelize.query(queryString, {
      type: QueryTypes.SELECT, raw: true
    });

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
            filterString += `${index !== 0 ? " or " : ""
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
            filterString += `${index !== 0 ? " or " : ""
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
                filterString += `${index !== 0 ? " or " : ""
                  } p.newPrice <= ${max}`;
              }
            } else if (newPriceFilter[newPriceFilter.length - 1] === ";") {
              let min = parseInt(split[0]);
              if (!isNaN(min)) {
                filterString += `${index !== 0 ? " or " : ""
                  } p.newPrice >= ${min}`;
              }
            } else {
              let min = parseInt(split[0]);
              let max = parseInt(split[1]);
              if (!isNaN(min) && !isNaN(max)) {
                filterString += `${index !== 0 ? " or " : ""
                  } (p.newPrice >= ${min} and p.newPrice <= ${max})`;
              }
            }
          });
          filterString += ")";
        }
        return filterString;
      })()} 
    ${sortBy && sortType
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
