import { Slot } from '../../entities/slot.entity';
import { SlotRepository } from '../../slot.repository';

describe('SlotRepository', () => {
  let repository: SlotRepository;

  beforeEach(() => {
    repository = new SlotRepository();
  });

  describe('findAll', () => {
    it('should return all slots if isAvailable is not provided', () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
        {
          id: '2',
          time: new Date(),
          doctorId: 'doc2',
          doctorName: 'Dr. John',
          isReserved: true,
          cost: 200,
        },
      ];
      repository['slots'] = slots;

      expect(repository.findAll()).toEqual(slots);
    });

    it('should return available slots if isAvailable is true', () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
        {
          id: '2',
          time: new Date(),
          doctorId: 'doc2',
          doctorName: 'Dr. John',
          isReserved: true,
          cost: 200,
        },
      ];
      repository['slots'] = slots;

      expect(repository.findAll(true)).toEqual([slots[0]]);
    });

    it('should return reserved slots if isAvailable is false', () => {
      const slots: Slot[] = [
        {
          id: '1',
          time: new Date(),
          doctorId: 'doc1',
          doctorName: 'Dr. Smith',
          isReserved: false,
          cost: 100,
        },
        {
          id: '2',
          time: new Date(),
          doctorId: 'doc2',
          doctorName: 'Dr. John',
          isReserved: true,
          cost: 200,
        },
      ];
      repository['slots'] = slots;

      expect(repository.findAll(false)).toEqual(slots);
    });
  });

  describe('findById', () => {
    it('should return a slot by id', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      repository.create(slot);

      expect(repository.findById('1')).toEqual(slot);
    });

    it('should return undefined if slot is not found', () => {
      expect(repository.findById('1')).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new slot', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      repository.create(slot);

      expect(repository.findById('1')).toEqual(slot);
    });
  });

  describe('update', () => {
    it('should update an existing slot', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      repository.create(slot);

      const updatedSlot: Partial<Slot> = { isReserved: true };
      repository.update('1', updatedSlot);

      expect(repository.findById('1')?.isReserved).toBe(true);
    });

    it('should return undefined if slot is not found', () => {
      expect(repository.update('1', { isReserved: true })).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete a slot by id', () => {
      const slot: Slot = {
        id: '1',
        time: new Date(),
        doctorId: 'doc1',
        doctorName: 'Dr. Smith',
        isReserved: false,
        cost: 100,
      };
      repository.create(slot);

      repository.delete('1');

      expect(repository.findById('1')).toBeUndefined();
    });
  });
});
