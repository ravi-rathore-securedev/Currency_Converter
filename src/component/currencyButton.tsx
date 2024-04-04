import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type currencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

export default function CurrencyButton(
  props: currencyButtonProps,
): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.name}> {props.name} </Text>
      <Text style={styles.flag}> {props.flag} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: '#01CBC6',
    margin: 5,
    borderRadius:12
  },
  name: {
    paddingTop:6,
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color:'#000'
  },
  flag: {
    textAlign: 'center',
    fontSize: 38,
  },
});
