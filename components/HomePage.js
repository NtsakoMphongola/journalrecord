import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Audio } from 'expo-av';
import { StatusBar } from 'react-native';
 

const HomePage = () => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");

    async function startRecording() {
        try {
            console.log('Requesting submission...');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Start recording...');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recordig started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('stop recording...');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording Stopped and srore as', uri)
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = Math.round < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
          return (
            
            <View key={index} style={styles.row}>
              <Text style={styles.fill}>Recording  {index + 1} - {recordingLine.duration}</Text>
              <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
              <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
          
            </View>
          );
        });
    }
    

   return (
     <View>
         <Text>{message}</Text>
       <Text>HomePage</Text>
       <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} > </Button>
       {getRecordingLines()}
      <StatusBar style="auto" />
     </View>
   )
 }

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      fill: {
        flex: 1,
        margin: 26
      },
      button: {
        margin: 16
      }
    });