import * as Joi from 'joi';

export const SignTransactionValidator = Joi.object().keys({
  from: Joi.string().length(42).required(),
  escrow: Joi.string().length(42).required(),
  sig: Joi.string().required(),
});
