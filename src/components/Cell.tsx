import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {DraxView} from 'react-native-drax';
import {ShipDirection, ShipType} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  onCellPress: (pos: [number, number]) => void;
  isRevealed: boolean;
  isShipCell: boolean;
  onShipDrop: (
    pos: [number, number],
    shipType: ShipType,
    direction: ShipDirection,
  ) => void;
}

export default function Cell({
  rowIndex,
  colIndex,
  isRevealed,
  isShipCell,
  onCellPress,
  onShipDrop,
}: CellProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DraxView
      draggable={false}
      onReceiveDragEnter={() => setIsHovered(true)}
      onReceiveDragExit={() => setIsHovered(false)}
      onReceiveDragDrop={data => {
        setIsHovered(false);
        onShipDrop(
          [rowIndex, colIndex],
          data.dragged.payload.shipType,
          data.dragged.payload.direction,
        );
      }}>
      <TouchableOpacity
        style={[styles.cell, isHovered ? styles.hovered : {}]}
        onPress={() => onCellPress([rowIndex, colIndex])}>
        {isRevealed && <Text>{isShipCell ? 'X' : 'W'}</Text>}
      </TouchableOpacity>
    </DraxView>
  );
}

const styles = StyleSheet.create({
  hovered: {
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  cell: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
