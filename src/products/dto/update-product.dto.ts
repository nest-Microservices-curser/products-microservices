import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @Transform(({ value }) => {
        if (isNaN(value) || value === null || value === undefined || value === '') {
            throw new RpcException({ message: 'El id no es valido', status: 400 });
        }
        return Number(value);
    })
    @IsNumber({}, { message: 'El id debe ser un número' })
    @IsPositive({ message: 'El id debe ser un número positivo' })
    id: number;
}
