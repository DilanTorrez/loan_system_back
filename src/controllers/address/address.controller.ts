import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO, UpdateAddressDTO } from './create-address.dto';
import { AddressService } from 'src/services/address/address.service';
import { OcupationService } from 'src/services/ocupation/ocupation.service';

@ApiTags('Address')
@Controller('address')
export class AddressController {

    constructor(
        private readonly _addressService: AddressService,
        private readonly _ocupationService: OcupationService
        ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll( ){
        return this._addressService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() accountData: CreateAddressDTO){
        console.log('acountData',accountData)
        let response = await this._addressService.create(accountData)
        return response
    }

    /*
    //no hay ocupation dentro de Address
    // no existe data dentro de CreateAddressDTO
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() addressArray: any)
    {
        console.log('address',addressArray)
        addressArray.forEach(async (address_row:any) => {
            let response: any =  await this._addressService.create(address_row)
            let address = response.data
            address_row.ocupations.forEach(async (ocupation: any) => {
                let ocupation_payload = ocupation
                ocupation_payload.address = address
                await this._ocupationService.create(ocupation_payload)
            });
        })
        // aqui devolver array con lo guardado tarea para el pasante jajaja
        return 'addresses created'
    }*/

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findAddressById(@Param('id',ParseIntPipe) id:number){
        return this._addressService.findAddressById(id)
    } 
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateAddressDTO) {
        return this._addressService.updateById(id, updateData);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateAddressById(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<UpdateAddressDTO>) {
        return this._addressService.updateAddressById(id, updateData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this._addressService.deleteById(id);
    }
}
