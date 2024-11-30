import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name: string;
    @IsString()
    public description: string;

    @IsNumber({ maxDecimalPlaces: 4 })
    @Min(0)
    @Type(() => Number)
    public price: number;
}
