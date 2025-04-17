import { Category } from "../models/index.js";

export const categoryController = {
  // CREATE
  create: async (req, res, next) => {
    try {
      const category = new Category(req.body);
      await category.save();

      res.status(201).send({
        status: "ok",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  // READ ALL
  findAll: async (req, res, next) => {
    try {
      const categories = await Category.find();

      res.status(200).json({
        status: "ok",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },

  // READ ONE
  findOne: async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        status: "ok",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  // UPDATE
  update: async (req, res, next) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        status: "ok",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE
  delete: async (req, res, next) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        status: "ok",
        message: "Category deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
