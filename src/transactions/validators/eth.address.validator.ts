import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';
import { isAddress } from 'web3-utils';

export const IsEthAddress = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsEthAddress',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isAddress(value);
        },
      },
    });
  };
};
