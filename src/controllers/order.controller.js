import { Order } from "../models/index.js";

export const orderController = {

  create: async (req, res, next) => {
    try {
      const User = req.user
      if(!User)
        return res.status(401).json({message: "User not found"})

      const {status,total,user,product} = req.body

      if(!status || !total || !product)
        return res.status(400).json({message: "All data is required"})


      const order = new Order({
        status,
        total,
        user:user._id,
        product
      });

      await order.save();
      res.status(201).send(order);
    } catch (err) {
      next(err);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "name price")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments();

      res.status(200).send({
        data: orders,
        meta: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product", "name price");

      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }

      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }

      res.status(200).send(order);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }

      res.status(200).send({ message: "Order deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
