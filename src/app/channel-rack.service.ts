import { Injectable } from '@angular/core';
import { ChannelModel } from './channel.model';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class ChannelRackService {

  channels: Array<ChannelModel>;

  constructor() { }

  addChannel(chanl: ChannelModel) {
    this.channels.push(chanl);
  }

  syncAll() {
  this.channels.forEach((chanl: ChannelModel) => {
    chanl.sync();
  });
  }
}
