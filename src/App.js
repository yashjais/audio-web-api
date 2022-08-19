import { useState, Component } from 'react';

import MicrophoneStream from 'microphone-stream';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // showControls: false,
      isRecording: false,
      recordedData: null,
      timer: 0,
      audio: false,
      recorder: false,
      audio: null,
      recorder: null,
      micStream: null,
    }
    // this.speechToText = React.createRef();
    // this.recordedData = React.createRef();
  }

  onRecordingData = (event) => {
    console.log('in onRecordingData', event);
    this.setState({
      recordedData: [...this.state.recordedData, event.data]
    });
    // this.awsTranscribe(event);
  }

  onRecordingStopped = async () => {
    try {
      console.log('in onRecordingStopped', this.state);
      // // clearInterval(this.timerInterval);
      // // this.state.recorder.stop();
      // // this.state.audio.getTracks().forEach(track => track.stop());
      // // const blob = new Blob(this.recordedData, { 'type': 'audio/ogg; codecs=opus' });
      // const blob = new Blob(this.state.recordedData);
      // console.log('blob', blob);
      // // const duration = blob.size === 0 ? 0 : await getBlobDuration(blob);
      // const duration = blob.size === 0 ? 0 : this.state.timer;
      // console.log('duration', duration);

      // this.setState({
      //   recordedData: blob,
      //   audio: null,
      //   recorder: null,
      //   recordingDuration: duration,
      //   recordingStopped: true
      // });
      // // if (this.props.enableAI) {
      // //   this.sendAudioToProcess(blob);
      // // }
    }
    catch (err) {
      console.log('err', err);
    }
  }

  handleStartRecording = async () => {
    console.log('in handleStartRecording');
    try {
      console.log('in startRecording');
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setInterval(() => {
        this.setState(prevState => ({ ...prevState, timer: prevState.timer + 1 }));
      }, 1000);

      // first approach
      // const recorder = new MediaStream(audio);
      // awsTranscribe(recorder);

      // second approach
      const recorder = new MediaRecorder(audio);
      // console.log('recorder', recorder);
      // console.log('recorder stream', recorder.stream);
      recorder.ondataavailable = this.onRecordingData;
      recorder.onstop = this.onRecordingStopped;
      // // recorder.requestData = requestData;
      // // recorder.stream = streamRecording;
      // // recorder.stream.onactive = streamRecording;

      // // const audioCtx = new AudioContext();
      // // const source = audioCtx.createMediaStreamSource(audio);
      // // awsTranscribe(source);

      recorder.start();
      // // awsTranscribe(recorder);
      // // recorder.start(3000);

      // // setInterval(() => {
      // //   recorder.requestData = requestData;
      // // }, 2000)

      // third approach
      // const recordedData = null;
      // console.log('recordedData', recordedData);
      // const micStream = new MicrophoneStream();
      // console.log('mic stream', micStream);
      // micStream.setStream(audio);
      // let audioBuffer = new Float32Array();
      // micStream.on('data', chunk => {
      //   console.log('lets see chunk', chunk, chunk.byteLength);
      // var raw = MicrophoneStream.toRaw(chunk);
      // console.log('raw', raw);
      // if (raw == null) {
      //   return;
      // }
      // const tmp = new Float32Array(audioBuffer.byteLength + chunk.byteLength);
      // tmp.set(new Float32Array(audioBuffer), 0);
      // tmp.set(new Float32Array(chunk), audioBuffer.byteLength);
      // audioBuffer = [...audioBuffer, chunk];
      // recordedData = tmp;
      // });
      // // micStream. = onRecordingData;
      // // micStream.stop = onRecordingStopped;
      // awsTranscribe(micStream);


      this.setState({
        // showControls: true,
        isRecording: true,
        audio,
        recorder,
        // micStream,
      });
    } catch (err) {
      console.log("Error. ", err);
    }
  };

  handleStopRecording = async () => {
    console.log('in handleStopRecording', this.state);
    console.log('this.state', this.state);
    // console.log('this.state.audio', this.state.audio);
    // clearInterval(this.timerInterval);
    // this.state.recorder.stop();
    // if (this.state.micStream) {
    //   this.state.micStream.stop();
    // }
    // this.state.audio.getTracks().forEach(track => track.stop());

    // // console.log('recordedData', this.recordedData);
    // // const blob = new Blob(this.recordedData, { 'type': 'audio/ogg; codecs=opus' });
    // // console.log('blob', blob);
    // // // const duration = blob.size === 0 ? 0 : await getBlobDuration(blob);
    // // const duration = blob.size === 0 ? 0 : this.state.timer;
    // // console.log('duration', duration);

    // // this.setState({
    // //   recordedData: blob,
    // //   audio: null,
    // //   recorder: null,
    // //   recordingDuration: duration,
    // //   recordingStopped: true
    // // });
  };

  render() {
    const { isRecording, timer } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={!isRecording ? this.handleStartRecording : this.handleStopRecording}>{!isRecording ? 'Start Recording' : 'Stop Recording'}</button>
          <p>{timer}</p>
          <audio></audio>
        </header>
      </div>
    );
  }
}

export default App;
