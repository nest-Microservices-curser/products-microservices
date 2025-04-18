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
  @MessagePattern({ cmd: 'create_product' })// se puede colocar como un string o un objeto
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'get_products' })
  findAll(
    @Payload() paginationDto: PaginationDto,
  ) {
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'get_one_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {//{id: '1'} => '1', el id es el nombre del parametro
    console.log('id', id);
    return this.productsService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    console.log('updateProductDto', updateProductDto);
    const { id, ...rest } = updateProductDto;
    return this.productsService.update(id, { id, ...rest });
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }


  @MessagePattern({ cmd: 'validate_product' })
  validateProduct(@Payload() id: number[]) {
    return this.productsService.validateProduct(id);
  }



}
