import { Injectable, OnModuleInit } from "@nestjs/common";
import { CityService } from "src/services/city/city.service";
import { City } from "./city.entity";

@Injectable()
export class CitySeeder implements OnModuleInit {
    constructor(private readonly cityService: CityService) {}

    async onModuleInit() {
        const cities = [
            { name: 'New York', short_name: 'NY' },
            { name: 'Los Angeles', short_name: 'LA' },
            { name: 'Chicago', short_name: 'CH' },
        ];
    
        for (const data of cities) {
            const city = new City();
            city.name = data.name;
            city.short_name = data.short_name;
    
            await this.cityService.create(city);
        }
    }
}
