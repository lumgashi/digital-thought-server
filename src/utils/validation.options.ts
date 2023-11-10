import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ICustomResponse } from './interfaces';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    const errorResponse: ICustomResponse = {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      success: false,
      errors: errors.reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          [currentValue.property]: Object.values(
            currentValue.constraints ?? {},
          ).join(', '),
        };
      }, {}),
    };

    return new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
  },
};

export default validationOptions;
