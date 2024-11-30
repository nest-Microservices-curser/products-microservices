import { Controller, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //@Post()
  @MessagePattern({ create: 'create_product' })// se puede colocar como un string o un objeto
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ create: 'get_products' })
  findAll(
    @Payload() paginationDto: PaginationDto,
  ) {
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ create: 'get_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {//{id: '1'} => '1', el id es el nombre del parametro
    return this.productsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({ create: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    const { id, ...rest } = updateProductDto;
    return this.productsService.update(id, { id, ...rest });
  }

  //@Delete(':id')
  @MessagePattern({ create: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
