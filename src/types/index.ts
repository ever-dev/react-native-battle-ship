export enum ShipType {
  CARRIER = 'CARRIER',
  BATTLESHIP = 'BATTLESHIP',
  SUBMARINE = 'SUBMARINE',
  DESTROYER = 'DESTROYER',
}

export enum ShipDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export interface ShipInfo {
  type: ShipType;
  cells: Array<[number, number]>;
  isSank: boolean;
}
