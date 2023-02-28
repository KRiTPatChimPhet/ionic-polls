import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  channel: any;
  presenceChannel: any;

  constructor(public http: HttpClient) {
  }
  public vote() {
    const pusher = new Pusher('41b0bb6a49c98aa068e5', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('vote-channel');
    return this.channel;
  }

  public init(luid:string) {
    let pusher = new Pusher('41b0bb6a49c98aa068e5', {
      authEndpoint: 'http://localhost:4000/pusher/auth?luid=' + luid,
      cluster: 'ap1',
    });
    this.presenceChannel = pusher.subscribe('presence-channel');
    return this.presenceChannel;
  }
}
