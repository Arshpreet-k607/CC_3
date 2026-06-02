import Joi from "joi";

const skuPattern: RegExp = /^[A-Z]{3}[0-9]{4}$/;
const categories = ["electronics", "clothing", "food", "tools", "other"] as const;

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  sku: Joi.string().pattern(skuPattern).required(),
  quantity: Joi.number().integer().min(0).required(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().valid(...categories).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(80),
  quantity: Joi.number().integer().min(0),
  price: Joi.number().positive(),
  category: Joi.string().valid(...categories),
}).min(1);
