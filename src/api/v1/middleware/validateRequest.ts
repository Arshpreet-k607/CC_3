import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Schema } from 'joi';

export default function validateRequest(schema: Schema, partial = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      presence: partial ? 'optional' : 'required',
    });

    if (error) {
      return res.status(400).json({ errors: error.details.map((detail) => detail.message) });
    }

    req.body = value;
    return next();
  };
}
