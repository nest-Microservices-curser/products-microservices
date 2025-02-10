import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  async create(createProductDto: CreateProductDto) {
    const product = this.product.create({ data: createProductDto });
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);
    const products = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true },
    });
    return {
      data: products,
      metadata: {
        page,
        limit,
        totalPages,
        lastPage,
      }
    };
  }

  async findOne(id: number) {
    console.log('Product not found with id ' + id);
    const Product = await this.product.findUnique({ where: { id, available: true } });
    if (!Product) {
      console.log('Product not found with id ' + id);
      throw new RpcException({ message: 'Product not found with id ' + id, status: HttpStatus.BAD_REQUEST });
    }
    return Product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log('Product not found with id ' + id);
    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: updateProductDto,
    });


  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({ where: { id }, data: { available: false } });
    return {
      message: 'Product deleted successfully',
      data: product,
      status: 200,
    }
  }
}
