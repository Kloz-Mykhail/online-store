import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { RelationsExistsPipe } from './pipes/relations-exists.pipe';
import {
  ApiSale,
  ApiSaleCreate,
  ApiSaleDelete,
  ApiSaleGetMany,
  ApiSaleGetOne,
  ApiSaleUpdate,
} from './docs';
import { IDDto } from 'src/common/dto/id.dto';
import { PaginationOptionsDto } from 'src/common/pagination/pagination-options.dto';
import { SaleExistPipe } from './pipes/sale-exist.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

@ApiSale()
@UseGuards(RoleAuthGuard)
@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiSaleCreate()
  @Roles(Role.ADMIN)
  create(@Body(RelationsExistsPipe) createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @ApiSaleGetMany()
  findAll(@Query() pag: PaginationOptionsDto) {
    return this.saleService.findAll(pag);
  }

  @Get(':id')
  @ApiSaleGetOne()
  findOne(@Param(SaleExistPipe) { id }: IDDto) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  @ApiSaleUpdate()
  @Roles(Role.ADMIN)
  update(
    @Param(SaleExistPipe) { id }: IDDto,
    @Body(RelationsExistsPipe) updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiSaleDelete()
  @Roles(Role.ADMIN)
  remove(@Param(SaleExistPipe) { id }: IDDto) {
    return this.saleService.remove(id);
  }
}
