import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Counter = props => {

  let done = false;

  useEffect(() => {

    const timer = setInterval(() => {
      
      props.setSeconds(props.seconds - 1);
      if (props.seconds == 0) {
        if (props.minutes > 0) {
          props.setMinutes(props.minutes - 1);
          props.setSeconds(59);
        } else {
          if (!done) {
            done = true;
            props.setState("select");
            props.setMinutes(0);
            props.setSeconds(1);
          }
        }
      }
      
    }, 1000);

    return () => clearInterval(timer);

  });

  const numberFormat = number => {
    let formattedNumber = "";

    if (number < 10) {
      formattedNumber = "0" + number;
    } else {
      formattedNumber = number;
    }

    return formattedNumber;
  }

  const reset = () => {
    props.setState("select");
    props.setMinutes(0);
    props.setSeconds(1);
  }

  const minutes = numberFormat(props.minutes);
  const seconds = numberFormat(props.seconds);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.6)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}
        />

      <View style={{flexDirection: "row"}}>
        <Text style={styles.time}>{minutes} : </Text>
        <Text style={styles.time}>{seconds}</Text>
      </View>

      <TouchableOpacity 
        style={styles.resetButton}
        onPress={() => reset()}
      >
        <Text style={{color: 'white', fontSize: 22}}>Resetar</Text>
      </TouchableOpacity>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  time: {
    color: 'white',
    fontSize: 100
  },

  resetButton: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 30,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'white',
    borderWidth: 2
  }
})


export default Counter;