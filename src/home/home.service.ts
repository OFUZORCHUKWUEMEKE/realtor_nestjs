import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/service.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

interface getHomesParam {
    city?: string;
    price?: {
        gte?: number,
        lte?: number
    }
}


interface CreateHomeDto {

    address: string

    numberOfBedrooms: number


    numberOfBathrooms: number

    city: string


    price: number

    land_size: number


    propertyType: PropertyType
    images?: { url: string }[]
}

@Injectable()
export class HomeService {
    constructor(private prismaService: PrismaService) { }
    async getHomes(filters: getHomesParam): Promise<HomeResponseDto[]> {
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                propertyType: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
                image: {
                    select: {
                        url: true
                    },
                }
            },
            where: filters
        })
        if (!homes.length) {
            'No homes available at the moment'
        }
        return homes.map((home) => new HomeResponseDto(home))
    }

    async getHomesById(id: number) {
        return this.prismaService.home.findFirst({
            where: {
                id
            }
        })
    }

    async createHome({ address, numberOfBathrooms, numberOfBedrooms, images, land_size, price, city, propertyType }: CreateHomeDto) {
        const home = await this.prismaService.home.create({
            data: {
                price,
                number_of_bathrooms: numberOfBathrooms,
                number_of_bedrooms: numberOfBedrooms,
                land_size,
                address,
                realtor_id: 5,
                city,
                propertyType
                //    image:images?
            }
        })
        const homeImages = images.map((image) => {
            return { ...image, home_id: home.id };
          });
      
          await this.prismaService.image.createMany({
            data: homeImages,
          });
        return new HomeResponseDto(home)
    }
}
