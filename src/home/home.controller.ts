import { Controller, Get, Query,Param,Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService) { }

    @Get('')
    async getHomes(
        @Query('city') city?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('propertyType') propertyType?: PropertyType
    ): Promise<HomeResponseDto[]> {

        const price = minPrice || maxPrice ? {
            ...(minPrice && { gte: minPrice }),
            ...(maxPrice && { lte: maxPrice })
        } : undefined
        const filters = {
            ...(city && { city }),
            ...(price && { price }),
            ...(propertyType && { propertyType })
        }
        return this.homeService.getHomes(filters)
    }

    @Get(':id')
    getById(@Param('id') id:number){
        return this.homeService.getHomesById(id)
    }

    @Post()
    createHome(){

    }
}
