import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {BoardSize, ShipSizes} from '../constant';
import Board from './Board';
import {checkShipIsSank, isCellInShip, isCellShip} from '../utils/ship';
import Toast from 'react-native-toast-message';
import {DraxProvider} from 'react-native-drax';
import {ShipInfo, ShipDirection, ShipType} from '../types';
import Ship from './Ship';

export default function Game() {
  const [ships, setShips] = useState<Array<ShipInfo>>([]);
  const [draggableShips, setDraggableShips] = useState([
    {
      type: ShipType.CARRIER,
      direction: ShipDirection.HORIZONTAL,
      isDisabled: false,
    },
    {
      type: ShipType.BATTLESHIP,
      direction: ShipDirection.HORIZONTAL,
      isDisabled: false,
    },
    {
      type: ShipType.SUBMARINE,
      direction: ShipDirection.HORIZONTAL,
      isDisabled: false,
    },
    {
      type: ShipType.DESTROYER,
      direction: ShipDirection.HORIZONTAL,
      isDisabled: false,
    },
  ]);
  const [revealed, setRevealed] = useState(
    new Array(BoardSize).fill(false).map(() => new Array(BoardSize).fill(true)),
  );

  const handleStartGame = () => {
    console.log(JSON.stringify(ships));
    setRevealed(
      new Array(BoardSize)
        .fill(false)
        .map(() => new Array(BoardSize).fill(false)),
    );
  };

  const handleCellPress = ([x, y]: [number, number]) => {
    if (revealed[x][y] === false) {
      const newRevealed = revealed.map((row, rowIndex) =>
        rowIndex !== x
          ? row
          : row.map((cell, cellIndex) => (cellIndex === y ? true : cell)),
      );
      setRevealed(newRevealed);
      if (isCellShip(ships, [x, y])) {
        Toast.show({
          type: 'success',
          text1: 'You hit a ship',
        });

        const newShips = ships.map(ship =>
          isCellInShip(ship, [x, y]) && checkShipIsSank(ship, newRevealed)
            ? {...ship, isSank: true}
            : ship,
        );
        setShips(newShips);
        if (newShips.every(ship => ship.isSank)) {
          Toast.show({
            type: 'info',
            text1: 'You hit all ships',
          });
          setRevealed(
            new Array(BoardSize)
              .fill(false)
              .map(() => new Array(BoardSize).fill(true)),
          );
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'You missed',
        });
      }
    }
  };

  const handleChangeShipDirection = (
    type: ShipType,
    newDirection: ShipDirection,
  ) => {
    setDraggableShips(old =>
      old.map(ship =>
        ship.type === type ? {...ship, direction: newDirection} : ship,
      ),
    );
  };

  const handleShipDrop = (
    [x, y]: [number, number],
    shipType: ShipType,
    direction: ShipDirection,
  ) => {
    setDraggableShips(old =>
      old.map(ship =>
        ship.type === shipType ? {...ship, isDisabled: true} : ship,
      ),
    );

    const newShip: ShipInfo = {
      type: shipType,
      isSank: false,
      cells: [],
    };
    for (let i = 0; i < ShipSizes[shipType]; i++) {
      const [newX, newY] = [
        x + (direction === ShipDirection.VERTICAL ? i : 0),
        y + (direction === ShipDirection.HORIZONTAL ? i : 0),
      ];
      if (newX < BoardSize && newY < BoardSize) {
        newShip.cells.push([newX, newY]);
      }
    }
    console.log(newShip);
    setShips(old => [...old, newShip]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleStartGame}>
        <Text>Start Game</Text>
      </TouchableOpacity>
      <View>
        {ships.map(ship => (
          <Text key={ship.type}>
            {ship.type}: {ship.isSank ? 'Sank' : 'Alive'}
          </Text>
        ))}
      </View>
      <DraxProvider>
        <Board
          ships={ships}
          revealed={revealed}
          onCellPress={handleCellPress}
          onShipDrop={handleShipDrop}
        />
        {draggableShips.map(ship => (
          <Ship
            key={ship.type}
            shipType={ship.type}
            direction={ship.direction}
            isDisabled={ship.isDisabled}
            onChangeDirection={handleChangeShipDirection}
          />
        ))}
      </DraxProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
