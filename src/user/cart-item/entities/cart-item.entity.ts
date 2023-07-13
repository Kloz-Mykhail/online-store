import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Article,
  ArticleDiscription,
} from 'src/article/entities/article.entity';
import { User, UserDiscription } from 'src/user/user.entity';
import { CartItem as ICartItem } from '@prisma/client';
export class CartItemDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, default: 1 })
  quantity: number;
}
export class CartItem extends CartItemDiscription implements ICartItem {
  @ApiPropertyOptional({ type: () => ArticleDiscription })
  article?: Article;

  @ApiPropertyOptional({ type: () => UserDiscription })
  user?: User;

  @Exclude()
  userId: number;
  @Exclude()
  articleId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<CartItem>) {
    super();
    Object.assign(this, partial);
  }
}
