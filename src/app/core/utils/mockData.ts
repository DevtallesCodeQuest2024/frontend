import { ILottery } from '../models/loterry';

export const lotterysMockData = [
  {
    id: 1,
    name: 'Sorteo 1',
    description: 'Se sortea una PS5',
    participants: 10,
  },
  {
    id: 2,
    name: 'Sorteo 2',
    description: 'Se sortea una subscripcion premium a devtalles',
    participants: 30,
  },
  {
    id: 3,
    name: 'Sorteo 3',
    description: 'Se sortea laptop gamer',
    participants: 40,
  },
  {
    id: 4,
    name: 'Sorteo 4',
    description: 'Se sortea una camara',
    participants: 23,
  },
  {
    id: 5,
    name: 'Sorteo 5',
    description: 'Se sortea una gorra',
    participants: 76,
  },
  {
    id: 6,
    name: 'Sorteo 6',
    description: 'Se sortea un boleto a paris',
    participants: 24,
  },
  {
    id: 7,
    name: 'Sorteo 7',
    description: 'Se sortea unos caramelos xD',
    participants: 87,
  },
  {
    id: 8,
    name: 'Sorteo 8',
    description: 'Se sortea un balon autografiado por messi',
    participants: 45,
  },
] satisfies ILottery[];
