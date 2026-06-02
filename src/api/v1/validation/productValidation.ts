import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  description: Joi.string().trim().allow('', null),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().trim().min(2),
  description: Joi.string().trim().allow('', null),
  price: Joi.number().min(0),
  stock: Joi.number().integer().min(0),
}).min(1);
