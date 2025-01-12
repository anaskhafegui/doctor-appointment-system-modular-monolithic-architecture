import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DoctorAvailabilityModule } from '../../doctor-availability.module';
import { CreateSlotDto } from '../../dto/create-slot.dto';
import { Slot } from '../../entities/slot.entity';

describe('DoctorAvailabilityController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DoctorAvailabilityModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET slots', () => {
    return request(app.getHttpServer())
      .get('/slots')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: 'dummy-slot-id',
            isReserved: false,
            doctorId: 'dummy-doctor-id',
            doctorName: 'Anas',
            cost: 1000,
            time: expect.any(String),
          },
        ]);
      });
  });

  it('/POST slots', () => {
    const createSlotDto: CreateSlotDto = {
      doctorId: 'doc1',
      doctorName: 'Dr. Smith',
      cost: 100,
    };
    return request(app.getHttpServer())
      .post('/slots')
      .send(createSlotDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('isReserved', false);
      });
  });

  it('/PATCH slots/:id/reserve', async () => {
    const createSlotDto: CreateSlotDto = {
      doctorId: 'doc1',
      doctorName: 'Dr. Smith',
      cost: 100,
    };
    const slot: Slot = await request(app.getHttpServer())
      .post('/slots')
      .send(createSlotDto)
      .then((res) => res.body);

    return request(app.getHttpServer())
      .patch(`/slots/${slot.id}/reserve`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('isReserved', true);
      });
  });

  it('/DELETE slots/:id', async () => {
    const createSlotDto: CreateSlotDto = {
      doctorId: 'doc1',
      doctorName: 'Dr. Smith',
      cost: 100,
    };
    const slot: Slot = await request(app.getHttpServer())
      .post('/slots')
      .send(createSlotDto)
      .then((res) => res.body);

    return request(app.getHttpServer()).delete(`/slots/${slot.id}`).expect(200);
  });
});
