import { PropertyType } from "@prisma/client";
import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class HomeResponseDto {

    id: number;

    address: string;

    @Exclude()
    number_of_bedrooms: number

    @Expose({ name: "numberOfBedrooms" })
    numberOfBedrooms() {
        return this.number_of_bedrooms
    }
    @Exclude()
    number_of_bathrooms: number

    @Expose({ name: "numberOfBathrooms" })
    numberOfBathrooms() {
        return this.number_of_bathrooms
    }

    city: string;

    listed_date: Date;

    price: number;

    land_size: number

    propertyType: PropertyType

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date

    @Exclude()
    realtor_id: number

    constructor(partial: Partial<HomeResponseDto>) {
        Object.assign(this, partial)
    }

}

class Image {
    @IsString()
    @IsNotEmpty()
    url: string
}

export class CreateHomeDto {
    @IsString()
    @IsNotEmpty()
    address: string

    @IsNumber()
    @IsNotEmpty()
    numberOfBedrooms: number

    @IsNumber()
    @IsNotEmpty()
    numberOfBathrooms: number

    @IsString()
    @IsNotEmpty()
    city: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    land_size: number

    @IsEnum(PropertyType)
    propertyType: PropertyType

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Image)
    images: Image[];
}
export class UpdateHomeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    numberOfBedrooms?: number

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    numberOfBathrooms?:number

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    city?:string

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    price?:number

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    land_size?:number

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Image)
    images?: Image[];
}