import { Button, StyleSheet, Text, View } from 'react-native'; 
import React from 'react';
import { Audio } from 'expo-av';
import { StatusBar } from 'react-native';
import * as Sharing from 'expo-sharing'
 

const HomePage = () => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");

    async function startRecording() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            playsInOutModeIOS: true,
          });
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          setRecording(recording);
        } else {
          setMessage("Please grant permission to access the microphone app");
        }
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
    async function stopRecording() {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      let updatedRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });
      setRecordings(updatedRecordings);
    }
    function getDurationFormatted(millis) {
      const minutes = millis / 1000 / 60;
      const minutesDisplay = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesDisplay) * 60);
      const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutesDisplay}:${secondsDisplay}`;
    }
    function getRecordingLines() {
      return recordings.map((recordingLine, index) => {
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
            <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} color="#cd12cc" title="Play" />
            <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} color="#ddcd45" title="Share" />
            <Button style={styles.button} onPress={() => recordingLine.sound.DeleteAsync()} color="red" title="Delete"/>
          </View>
        );
      });
    }

   return (
    <View style={styles.container}>
            <Text style={styles.txtTitle}> You may start a recording</Text>
      <Text>{message}</Text>
      <Button style={styles.rcd }color='#dd8985'
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
   )
 }

export default HomePage

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginTop: 0,
    paddingBottom: 25,
    borderRadius: 15,
    backgroundColor: '#ddffdd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    padding: 20,
    paddingVertical: 15,
    fontSize: 28,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#cdcdcd'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 20,
    padding: 7,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
    
});