import {ShipInfo} from '../types';

export const isCellShip = (
  ships: Array<ShipInfo>,
  [x, y]: [number, number],
) => {
  return !!ships.find(ship => isCellInShip(ship, [x, y]));
};

export const isCellInShip = (ship: ShipInfo, [x, y]: [number, number]) => {
  return ship.cells.map(cell => `${cell[0]}:${cell[1]}`).includes(`${x}:${y}`);
};

export const checkShipIsSank = (
  ship: ShipInfo,
  revealed: Array<Array<boolean>>,
): boolean => {
  return ship.cells.every(([x, y]) => revealed[x][y] === true);
};
