import { Injectable ,NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/service.service';
import { HomeResponseDto } from './dto/home.dto';

interface getHomesParam{
    city?:string;
    price?:{
       gte?:number,
       lte?:number 
    }
}

@Injectable()
export class HomeService {
    constructor(private prismaService: PrismaService) { }
    async getHomes(filters:getHomesParam): Promise<HomeResponseDto[]> {
        const homes = await this.prismaService.home.findMany({
            select:{
                id:true,
                address:true,
                city:true,
                price:true,
                propertyType:true,
                number_of_bathrooms:true,
                number_of_bedrooms:true,
                image:{
                    select:{
                        url:true
                    },
                }
            },
            where:filters
        })
        if(!homes.length){
            throw new NotFoundException()
        }
        return homes.map((home) => new HomeResponseDto(home))
    }

    async getHomesById(id:number){
        return this.prismaService.home.findFirst({
            where:{
                id
            }
        })
    }
}
