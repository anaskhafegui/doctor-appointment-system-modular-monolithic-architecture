import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { CreateSlotDto } from './dto/create-slot.dto';

@Controller('slots')
export class DoctorAvailabilityController {
  constructor(private readonly service: DoctorAvailabilityService) {}

  @Get()
  getAllSlots(@Query('isAvailable') isAvailable?: string) {
    const isAvailableBool =
      isAvailable === 'true'
        ? true
        : isAvailable === 'false'
          ? false
          : undefined;
    return this.service.getAllSlots(isAvailableBool);
  }

  @Post()
  createSlot(@Body() createSlotDto: CreateSlotDto) {
    return this.service.createSlot(createSlotDto);
  }

  @Patch(':id/reserve')
  reserveSlot(@Param('id') id: string) {
    return this.service.reserveSlot(id);
  }

  @Delete(':id')
  deleteSlot(@Param('id') id: string) {
    return this.service.deleteSlot(id);
  }
}
