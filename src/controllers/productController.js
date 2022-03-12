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
      const { all } = req.query;
      let products = await sequelize.query(
        `select p.id, p.name, p.oldPrice, p.newPrice, p.color, p.colorCode, p.slug, p.createdAt, p.updatedAt, 
        p.description, p.categoryId
        from products p, categories c, groupcategories g, buyertypes b
        where p.categoryId = c.id and c.groupCategoryId = g.id and g.buyerTypeId = b.id and
        (c.slug = '${categorySlug}' or g.slug = '${categorySlug}' or b.slug = '${categorySlug}') order by createdAt desc`,
        { type: QueryTypes.SELECT, raw: true }
      );
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
  try {
    let newProducts = products;
    let count = 0;
    let l = 0;
    let indices = [];
    while (l < products.length) {
      let tempProduct = { ...newProducts[count] };
      let index = newProducts.findIndex(
        (item) => item.slug === tempProduct.slug && item.id !== tempProduct.id
      );
      if (index === -1) {
        if (!newProducts[count].productColors) {
          let imagesProduct = await getImages(newProducts[count]);
          let sizes = await getSizes(newProducts[count]);
          newProducts[count].productColors = [
            {
              color: newProducts[count].color,
              colorCode: newProducts[count].colorCode,
              images: imagesProduct,
              sizes,
            },
          ];
          delete newProducts[count].color;
          delete newProducts[count].colorCode;
        }
      } else {
        if (!indices.includes(index)) {
          console.log(index)

          if (!newProducts[count].productColors) {
            let imagesProduct = await getImages(newProducts[count]);
            let sizes = await getSizes("desc", newProducts[count]);
            newProducts[count].productColors = [
              {
                color: newProducts[count].color,
                colorCode: newProducts[count].colorCode,
                images: imagesProduct,
                sizes,
              },
            ];
            delete newProducts[count].color;
            delete newProducts[count].colorCode;
          }
          let imagesProduct = await getImages(newProducts[index]);
          let sizes = await getSizes("desc", newProducts[index]);

          newProducts[count].productColors.push({
            color: newProducts[index].color,
            colorCode: newProducts[index].colorCode,
            images: imagesProduct,
            sizes,
          });
          if (indices.length === 0 || index > indices[indices.length - 1]) {
            indices.push(index);
            newProducts.splice(index, 1);
          }
        }
        count++;
      }
      l++;
    }
    let n = newProducts.length;
    if (!newProducts[n - 1].productColors) {
      let imagesProduct = await getImages(newProducts[n - 1]);
      let sizes = await getSizes("desc", newProducts[n - 1]);
      newProducts[n - 1].productColors = [
        {
          color: newProducts[n - 1].color,
          colorCode: newProducts[n - 1].colorCode,
          images: imagesProduct,
          sizes,
        },
      ];
      delete newProducts[n - 1].color;
      delete newProducts[n - 1].colorCode;
    }
    return newProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
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
