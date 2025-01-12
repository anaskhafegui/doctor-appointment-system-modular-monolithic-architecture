import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppointmentBookingModule } from '../appointment-booking.module';

describe('AppointmentBookingController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppointmentBookingModule],
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
            time: '2025-01-12T16:05:37.381Z',
            doctorId: 'dummy-doctor-id',
            doctorName: 'Anas',
            cost: 1000,
          },
          {
            id: 'slot1',
            time: '2025-02-01T14:30:00.000Z',
            isReserved: true,
            doctorId: 'dummy-doctor-id',
            doctorName: 'Anas',
            cost: 1000,
          },
          {
            id: 'slot2',
            time: '2025-02-01T15:30:00.000Z',
            isReserved: false,
            doctorId: 'dummy-doctor-id',
            doctorName: 'Anas',
            cost: 1000,
          },
        ]);
      });
  });

  it('/POST appointments', () => {
    const appointmentDto = {
      slotId: 'dummy-slot-id',
      patientDetails: {
        patientId: 'patient1',
        patientName: 'John Doe',
      },
    };
    return request(app.getHttpServer())
      .post('/appointments')
      .send(appointmentDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('slotId', 'dummy-slot-id');
        expect(res.body).toHaveProperty('patientId', 'patient1');
        expect(res.body).toHaveProperty('patientName', 'John Doe');
        expect(res.body).toHaveProperty('reservedAt', expect.any(String));
      });
  });
});
