import express from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import Expense from "../models/Expense.js";
import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Setting from "../models/Setting.js";
import Supplier from "../models/Supplier.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true, service: "prosale-pos-api" });
});

router.get("/bootstrap", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        settings: { country: "NG", currency: "NGN" },
        products: [],
        customers: [],
        suppliers: [],
        expenses: [],
        sales: [],
        databaseConnected: false,
      });
    }

    const [settings, products, customers, suppliers, expenses, sales] = await Promise.all([
      Setting.findOneAndUpdate({ key: "default" }, { $setOnInsert: { key: "default" } }, { new: true, upsert: true }),
      Product.find().sort({ createdAt: -1 }),
      Customer.find().sort({ createdAt: -1 }),
      Supplier.find().sort({ createdAt: -1 }),
      Expense.find().sort({ createdAt: -1 }),
      Sale.find().sort({ createdAt: -1 }),
    ]);

    res.json({ settings, products, customers, suppliers, expenses, sales });
  } catch (error) {
    next(error);
  }
});

router.put("/settings", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "MongoDB is not connected" });
    }

    const settings = await Setting.findOneAndUpdate(
      { key: "default" },
      { country: req.body.country, currency: req.body.currency },
      { new: true, upsert: true, runValidators: true },
    );
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

function resourceRoutes(path, Model) {
  router.get(path, async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.json([]);
      }

      res.json(await Model.find().sort({ createdAt: -1 }));
    } catch (error) {
      next(error);
    }
  });

  router.post(path, async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: "MongoDB is not connected" });
      }

      res.status(201).json(await Model.create(req.body));
    } catch (error) {
      next(error);
    }
  });
}

resourceRoutes("/products", Product);
resourceRoutes("/customers", Customer);
resourceRoutes("/suppliers", Supplier);
resourceRoutes("/expenses", Expense);

router.post("/sales", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "MongoDB is not connected" });
    }

    const sale = await Sale.create({
      ...req.body,
      receiptNumber: `PS-${Date.now()}`,
    });

    await Promise.all(
      (req.body.items || []).map((item) =>
        Product.findByIdAndUpdate(item.product, { $inc: { stock: -Number(item.quantity || 0) } }),
      ),
    );

    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
});

export default router;
