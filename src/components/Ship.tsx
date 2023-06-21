import React from 'react';
import {ShipDirection, ShipType} from '../types';
import {Text, TouchableOpacity, View} from 'react-native';
import {DraxView} from 'react-native-drax';

interface ShipProps {
  shipType: ShipType;
  direction: ShipDirection;
  isDisabled?: boolean;
  onChangeDirection: (shipType: ShipType, newDirection: ShipDirection) => void;
}

export default function Ship({
  shipType,
  direction,
  isDisabled,
  onChangeDirection,
}: ShipProps) {
  return (
    <View style={{flexDirection: 'row'}}>
      <DraxView draggable={!isDisabled} dragPayload={{shipType, direction}}>
        <Text>{shipType}</Text>
      </DraxView>
      <Text>:</Text>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() =>
          onChangeDirection(
            shipType,
            direction === ShipDirection.HORIZONTAL
              ? ShipDirection.VERTICAL
              : ShipDirection.HORIZONTAL,
          )
        }>
        <Text>{direction}</Text>
      </TouchableOpacity>
    </View>
  );
}
