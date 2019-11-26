import * as Joi from 'joi';
import * as objectId from 'joi-objectid';
import { CURRENCY_TYPE } from '../transactions.constants';

Joi.objectId = objectId(Joi);

export const GetTransactionsValidator = Joi.object().keys({
  offset: Joi.number(),
  count: Joi.number(),
  currencyType: Joi.string().valid(Object.values(CURRENCY_TYPE)),
});
