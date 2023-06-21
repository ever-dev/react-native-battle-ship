import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {ShipInfo, ShipDirection, ShipType} from '../types';
import {isCellShip} from '../utils/ship';
import Cell from './Cell';

interface BoardProps {
  ships: Array<ShipInfo>;
  revealed: Array<Array<boolean>>;
  onCellPress: (pos: [number, number]) => void;
  onShipDrop: (
    pos: [number, number],
    shipType: ShipType,
    direction: ShipDirection,
  ) => void;
}

export default function Board({
  ships,
  revealed,
  onCellPress,
  onShipDrop,
}: BoardProps) {
  return (
    <View style={styles.container}>
      {revealed.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={`${rowIndex}:${colIndex}`}
              onCellPress={onCellPress}
              onShipDrop={onShipDrop}
              isRevealed={cell}
              isShipCell={isCellShip(ships, [rowIndex, colIndex])}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
