import {ShipInfo, ShipType} from './types';

export const MOCK_SHIPS: Array<ShipInfo> = [
  {
    type: ShipType.CARRIER,
    isSank: false,
    cells: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    type: ShipType.BATTLESHIP,
    isSank: false,
    cells: [
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
    ],
  },
  {
    type: ShipType.SUBMARINE,
    isSank: false,
    cells: [
      [4, 5],
      [4, 6],
      [4, 7],
    ],
  },
  {
    type: ShipType.DESTROYER,
    isSank: false,
    cells: [
      [8, 8],
      [8, 9],
    ],
  },
];
