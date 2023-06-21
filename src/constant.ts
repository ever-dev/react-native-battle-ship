import {ShipType} from './types';

export const BoardSize = 10;
export const ShipSizes = {
  [ShipType.DESTROYER]: 2,
  [ShipType.SUBMARINE]: 3,
  [ShipType.BATTLESHIP]: 4,
  [ShipType.CARRIER]: 5,
};
