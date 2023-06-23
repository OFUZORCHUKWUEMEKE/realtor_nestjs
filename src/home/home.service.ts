import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/service.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';
import { User } from 'src/user/user.decorator';

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
interface UpdateHomeDto {

    address?: string

    numberOfBedrooms?: number

    numberOfBathrooms?: number

    city?: string

    price?: number

    land_size?: number

    propertyType?: PropertyType

    images?: { url: string }[]
    
}

@Injectable()
export class HomeService {
    constructor(private prismaService: PrismaService) { }
    async getHomes(filters: getHomesParam): Promise<HomeResponseDto[]> {
        // console.log(user)
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

    async updateHomeById(id: number, data: UpdateHomeDto) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id
            }
        })

        if (!home) {
            throw new HttpException('home not found in the database', 400)
        }

        const updatedHome = await this.prismaService.home.update({
            where: { id }, data
        })

        return updatedHome
    }

    async deleteHome(id: number) {

        const home = await this.prismaService.home.findUnique({ where: { id } })

        await this.prismaService.image.deleteMany({ where: { home_id: home.id } })

        await this.prismaService.home.delete({ where: { id } })

        return 'Sussessfully Deleted Home'
    }
}
