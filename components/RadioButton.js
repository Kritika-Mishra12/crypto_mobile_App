import React, { useState, useEffect} from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';

export default function RadioButton({ data, onSelect, defaultSelected }) {
  const [userOption, setUserOption] = useState(defaultSelected);

  useEffect(() => {
    setUserOption(defaultSelected);
  }, [defaultSelected]);

  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };
  return (
    <View>
      {data.map((item) => {
        return (
          <Pressable
            key={item.value}
            style={
              item.value === userOption
                ? [styles.selected, styles.backgroundColor] // Apply orange background if selected
                : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
            <Text style={styles.option}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}