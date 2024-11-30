import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

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

    const Product = await this.product.findUnique({ where: { id, available: true } });
    if (!Product) {
      throw new NotFoundException('Product not found with id ' + id);
    }

  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    await this.product.findUnique({ where: { id } });

    return this.product.update({
      where: { id },
      data: updateProductDto,
    });


  }

  async remove(id: number) {
    await this.product.findUnique({ where: { id } });

    const product = await this.product.update({ where: { id }, data: { available: false } });
    return {
      message: 'Product deleted successfully',
      data: product,
      status: 200,
    }
  }
}
