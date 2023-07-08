import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Article } from '../entities/article.entity';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleUpdate = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiOperation({ summary: 'Update an article in db by id' }),
  );
