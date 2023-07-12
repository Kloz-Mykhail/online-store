import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export const ApiReviewUpdate = () =>
  applyDecorators(
    ApiResponseData(Review, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update an review in db by id. [open for: ADMIN, ME]',
    }),
  );
