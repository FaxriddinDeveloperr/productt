import { Product } from "../models/index.js";

export const productController = {

  create: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).send(product);
    } catch (err) {
      next(err);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const products = await Product.find()
        .populate("category", "name")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments();

      res.status(200).send({
        data: products,
        meta: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).populate("category", "name");

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  },


  delete: async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send({ message: "Product deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
};
