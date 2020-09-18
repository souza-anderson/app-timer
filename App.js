import { Picker } from '@react-native-community/picker';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold  
} from '@expo-google-fonts/roboto';

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Counter from './Counter';
import { AppLoading } from 'expo';

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  console.disableYellowBox = true;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [state, setState] = useState("select");
  const [sounds, setSounds] = useState([
    {
      id: 1,
      selected: false,
      sound: 'Alarme 1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id: 2,
      selected: true,
      sound: 'Alarme 2',
      file: require('./assets/alarme2.mp3')
    },
    {
      id: 3,
      selected: false,
      sound: 'Alarme 3',
      file: require('./assets/alarme3.mp3')
    }
  ]);
  
  const numbers = [];
  for (let i = 0; i < 60; i++) {
    numbers.push(i);
  }

  function alarmClick(id) {
    let soundsTemp = sounds.map(sound => {
      if (sound.id == id) {
        sound.selected = true;
      } else {
        sound.selected = false;
      }
      
      return sound;
    })

    setSounds(soundsTemp);
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else if (state == "select") {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(2, 43, 84,0.6)', 'rgba(2, 43, 84,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%'              
            }}
        />

        <Text style={{
          color: 'white',
          fontSize: 30,
          fontFamily: 'Roboto_500Medium'}}>Selecione seu tempo:</Text>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.label}>Minutos: </Text>
          <Picker
            selectedValue={minutes}
            style={{height: 50, width: 100, color: 'white'}}
            onValueChange={(itemValue, itemIndex) =>
            setMinutes(itemValue)
          }>
            <Picker.Item label='0' value='0' />
            {
              numbers.map(number => {
                return(
                  <Picker.Item label={number.toString()} value={number.toString()} />
                )
              })
            }
          </Picker>

          <Text style={styles.label}>Segundos: </Text>
          <Picker
            selectedValue={seconds}
            style={{height: 50, width: 100, color: 'white'}}
            onValueChange={(itemValue, itemIndex) =>
            setSeconds(itemValue)
          }>
            {
              numbers.map(number => {
                return (
                  <Picker.Item label={number.toString()} value={number.toString()} />
                )
              })
            }
          </Picker>
        </View>

        <View style={{flexDirection: "row"}}>  
          {
            sounds.map(sound => {
              if (sound.selected) {
                return (
                  <TouchableOpacity onPress={() => alarmClick(sound.id)} style={styles.alarmButtonSelected}>
                    <Text style={{
                      color: 'white',
                      fontFamily: 'Roboto_400Regular'}}>{sound.sound}</Text>
                  </TouchableOpacity>
                )
              } else {
                return (
                  <TouchableOpacity onPress={() => alarmClick(sound.id)} style={styles.alarmButton}>
                    <Text style={{
                      color: 'white',
                      fontFamily: 'Roboto_400Regular'}}>{sound.sound}</Text>
                  </TouchableOpacity>
                )
              }  
            })
          }      
        </View>

        <View>
          <TouchableOpacity onPress={() => setState('start')} style={styles.startButton}>
            <Text style={{
              color: 'white',
              fontSize: 22,
              fontFamily: 'Roboto_500Medium'}}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (state == 'start') {
    return (      
        <Counter
          setMinutes={setMinutes}
          setSeconds={setSeconds} 
          setState={setState} 
          sounds={sounds}
          minutes={minutes} 
          seconds={seconds}
        >      
        </Counter>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'  
  },

  label: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Roboto_400Regular'
  },

  alarmButton: {
    padding: 8,
    marginRight: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },

  alarmButtonSelected: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },

  startButton: {
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
});
