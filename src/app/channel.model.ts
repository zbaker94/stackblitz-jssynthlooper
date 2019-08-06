import * as Tone from 'tone';
import {Instrument} from './instrument';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export class ChannelModel {
  private readonly input: Tone.Channel;
  private readonly output: Tone.Channel;
  private volume: number;
  private PLAYER: Tone.Player;
  private effects: Array<Tone.Effect>;
  private recorderURL: SafeUrl;
  private recording: boolean;
  private recorder: MediaRecorder;

  constructor(volume: number) {
      this.volume = volume;

      this.input = new Tone.Channel(-12);
      this.output = new Tone.Channel(this.volume).toMaster();

      this.input.connect(this.output);

      this.recording = false;

      Tone.Transport.loop = true;
      Tone.Transport.loopStart = 0;
      Tone.Transport.loopEnd = '4m';
  }

  connectInput(source: Tone.ToneNode) {
    console.log('connected ' + source.toString() + ' to input');
    source.connect(this.input);
    return source;
  }

  connectOutput(source: Tone.ToneNode) {
    console.log('connected ' + source.toString() + ' to output');
    source.connect(this.output);
    return source;
  }

  record() {
    if (this.recording) {
      console.error('Cannot Start Recording, Already Recording');
      return;
    }

    console.log('started recording');
    this.recording = true;
    const ctx = this.input.context;
    const dest = ctx.createMediaStreamDestination();
    this.recorder = new MediaRecorder(dest.stream);
    this.input.connect(dest);

    const chunks = [];
    this.recorder.start();

    this.recorder.ondataavailable = evt => chunks.push(evt.data);
    this.recorder.onstop = evt => {
      this.saveAudioToPlayer(chunks);
    };
    Tone.Transport.start();
  }

  stopRecord() {
    if (!this.recording) {
      console.error('cannot stop recording when not recording');
      return;
    }
    this.recorder.stop();
    Tone.Transport.stop(Tone.Now, (transport) => {
      Tone.Transport = transport;
    });
  }

  play() {
    console.log('playing');
    Tone.Transport.start();
  }

  pause() {
    Tone.Transport.pause();
  }

  stop() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      console.log('stopping');
      this.recorder.stop();
    }
    Tone.Transport.stop(Tone.Now, (transport) => {
      Tone.Transport = transport;
    });
  }

  printTransportTime(tag: string) {
      console.log('Transport time at ' + tag + ': ' + Tone.Transport.position);
  }

  sync() {
    if (this.PLAYER) {
      console.log('syncing player to Transport');
      this.PLAYER.sync().start();
    } else {
      console.error('unable to sync. Player must not be undefined');
    }
  }

  saveAudioToPlayer(chunks: Array<any>) {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    this.recorderURL = URL.createObjectURL(blob);
    this.recording = false;
    console.log('stopped recording');

    this.PLAYER = new Tone.Player(this.recorderURL, (player) => {
      console.log('player loaded');
      console.error('PLAYER buffer length: ' + this.PLAYER.buffer.length);
      this.connectOutput(this.PLAYER);
      this.sync();
    });
  }
}
