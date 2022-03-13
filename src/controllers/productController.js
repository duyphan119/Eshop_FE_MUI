import db from "../models";
import { QueryTypes } from "@sequelize/core";
import { sequelize } from "../config/connectDB";
import slugify from "slugify";
const productController = {
  create: async (req, res) => {
    try {
      const { name, price, color, colorCode, description, categoryId } =
        req.body;
      const id = (new Date().getTime() * Math.random()) / Math.random();
      const slug = slugify(name);
      const savedProduct = await db.Product.create({
        id,
        name,
        price,
        color,
        colorCode,
        description,
        slug,
        categoryId,
      });
      res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByCategorySlug: async (req, res) => {
    try {
      const { categorySlug } = req.params;
      const { all, sortBy, sortType, color, size, newPrice } = req.query;
      const queryString = `select p.*
      from products p, categories c, groupcategories g, buyertypes b
      where p.categoryId = c.id and c.groupCategoryId = g.id and g.buyerTypeId = b.id and
      (c.slug = '${categorySlug}' or g.slug = '${categorySlug}' or b.slug = '${categorySlug}')
      ${(() => {
        let filterString = "";
        if (color) {
          filterString += "and (";
          let colorFilters = JSON.parse(color);
          colorFilters.forEach((colorFilter, index) => {
            if (index === 0) {
              filterString += `p.color = '${colorFilter}'`;
            }else{
              filterString += `or p.color = '${colorFilter}'`;
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
      }`;
      let products = await sequelize.query(queryString, {
        type: QueryTypes.SELECT,
        raw: true,
      });
      if (!all || products.length === 0) {
        return res.status(200).json(products);
      }
      const newProducts = await filterProduct(products);
      res.status(200).json(newProducts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getBySlug: async (req, res) => {
    try {
      const { productSlug } = req.params;
      const { all } = req.query;
      const products = await db.Product.findAll({
        where: {
          slug: productSlug,
        },
        raw: true,
      });
      if (!all || products.length === 0) {
        return res.status(200).json(products);
      }
      const newProducts = await filterProduct(products);

      res.status(200).json(newProducts[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const products = db.Product.findAll({ raw: true });
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await db.Product.findByPk(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { name, price, color, colorCode, description, categoryId } =
        req.body;
      const slug = slugify(name);
      const { productId } = req.params;
      await db.Size.update(
        {
          name,
          price,
          color,
          colorCode,
          description,
          slug,
          categoryId,
        },
        { where: { id: productId } }
      );
      res.status(200).json("This product is updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { productId } = req.params;
      await db.Product.destroy({ where: { id: productId } });
      res.status(200).json("This product is deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

const filterProduct = async (products) => {
  const newProducts = [];
  for (let i = 0; i < products.length; i++) {
    let imagesProduct = await getImages(products[i]);
    let sizes = await getSizes("desc", products[i]);
    let index = newProducts.findIndex((item) => item.slug === products[i].slug);
    let productColor = {
      color: products[i].color,
      colorCode: products[i].colorCode,
      images: imagesProduct,
      sizes,
    };
    products[i].productColors = [];
    if (index === -1) {
      // Thêm
      products[i].productColors.push(productColor);
      newProducts.push(products[i]);
    } else {
      // Gộm
      newProducts[index].productColors.push(productColor);
    }
  }
  return newProducts;
};

const getImages = async (product) => {
  try {
    let imagesProduct = await db.ImagesProduct.findAll({
      where: {
        productId: product.id,
      },
      raw: true,
    });
    return imagesProduct;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getSizes = async (sort, product) => {
  try {
    let sizes = await sequelize.query(
      `select * from sizes
      where productId = ${product.id} order by createdAt ${sort}`,
      { type: QueryTypes.SELECT, raw: true }
    );
    return sizes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = productController;
