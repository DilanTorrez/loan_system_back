import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CityService } from "src/services/city/city.service";
import { City } from "./city.entity";
import { Repository } from "typeorm";

@Injectable()
export class CitySeeder implements OnModuleInit {
    constructor(
        private readonly cityService: CityService,
        @Inject('CITY_REPOSITORY')
        private cityRepository: Repository<City>,
        ) {}

    async onModuleInit() {
        // await this.cityRepository.query('TRUNCATE TABLE city RESTART IDENTITY CASCADE');
        const exist = await this.cityRepository.find();
        if (exist.length > 0) {
            console.log('Saltando proceso del seeder -> (City). Ya existen registros en la base de datos.');
            return;
        }
        console.log('Iniciando el seeder -> (City). Cargando registros en la base de datos.');
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