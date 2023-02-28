import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  channel: any;

  constructor(public http: HttpClient) {
  }
  public init() {
    const pusher = new Pusher('41b0bb6a49c98aa068e5', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('vote-channel');
    return this.channel;
  }
}
