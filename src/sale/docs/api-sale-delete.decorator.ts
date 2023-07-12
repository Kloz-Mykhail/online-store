import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Sale } from '../entities/sale.entity';

export const ApiSaleDelete = () =>
  applyDecorators(
    ApiResponseData(Sale),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete one sale from db by id. [open for: ADMIN]',
    }),
  );
