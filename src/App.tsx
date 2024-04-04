import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import CurrencyButton from './component/currencyButton';
import {currencyByRupee} from './constants';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [initialValue, setInitialValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [resultValue, setResultValue] = useState('');

  const buttonPressed = (targetValue: currency) => {
    if (!initialValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }
    const inputAmount = parseFloat(initialValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'NOt a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headingText}>Currency Converter</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            style={styles.rupeeInput}
            maxLength={14}
            value={initialValue}
            clearButtonMode="always"
            onChangeText={setInitialValue}
            keyboardType="number-pad"
            placeholder="Enter amount in Rupees"
          />
        </View>

        <View style={styles.resultContainer}>
          {resultValue && <Text style={styles.resultText}>{resultValue}</Text>}
        </View>

        <View style={styles.viewContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAE0E2',
    height: 760,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  rupee: {
    fontSize: 30,
    width: '20%',
    textAlign: 'right',
    color: '#000',
  },
  rupeeInput: {
    backgroundColor: '#515151',
    width: '70%',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    borderBottomWidth: 3,
    opacity: 0.8,
  },
  resultContainer: {
    backgroundColor: '#fff',
    height: 70,
    width: '60%',
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    left:20
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  selected: {
    backgroundColor: '#0A79DF',
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    margin:2,
    marginTop: 6,
    marginBottom: 4,
  },
  viewContainer: {
    marginBottom: 270,
  },
});

export default App;
