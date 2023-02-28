import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PusherService } from 'src/app/shared/pusher/pusher.service';
import { DataRes, VoteOption } from '../../core/model/data-res.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  options: VoteOption = {
    germany: { name: 'Germany', votes: 0 },
    spain: { name: 'Spain', votes: 0 },
    france: { name: 'France', votes: 0 },
    nigeria: { name: 'Nigeria', votes: 0 },
  };
  mockData?: VoteOption;

  post: any = {};
  presence_channel: any;
  current_user: any;
  users_online = {};

  vote_channel: any;
  optionsArray = Object.keys(this.options);
  chartData = this.optionsArray.map((val) => this.options[val].votes);
  selectedOption = '';
  chartType = 'doughnut';
  voted = false;

  constructor(
    private http: HttpClient,
    private pusher: PusherService
  ) {
    let self = this;
    let luid = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);
    this.presence_channel = this.pusher.init(luid);
    this.presence_channel.bind(
      'pusher:subscription_succeeded',
      function (members: any) {
        console.log(members);
        self.users_online = members.members;
        self.current_user = members.myID;
      }
    );
  }

  get_users_online() {
    return Object.keys(this.users_online).length - 1;
  }

  isOnline(username: string) {
    if (username in this.users_online) {
      return 'online';
    } else {
      return 'offline';
    }
  }

  ngOnInit() {}

  selectOption(option: string) {
    this.selectedOption = this.selectedOption !== option ? option : '';
  }

  vote() {
    if (this.selectedOption) {
      this.http
        .post<DataRes>('http://localhost:4000/vote', {
          option: this.selectedOption,
        })
        .subscribe((res) => {
          this.mockData = res.data;
          this.voted = true;
        });
    }
  }
}
