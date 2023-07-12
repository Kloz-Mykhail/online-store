import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleUpdate = () =>
  applyDecorators(
    ApiResponseData(Sale, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a sale in db by id. [open for: ADMIN]' }),
  );
