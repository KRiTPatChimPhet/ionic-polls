import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PusherProvider } from 'src/providers/pusher/pusher';
import { DataRes, VoteOption } from '../core/model/data-res.model';


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

  optionsArray = Object.keys(this.options);
  chartData = this.optionsArray.map((val ) => this.options[val].votes);
  selectedOption = '';
  chartType = 'doughnut';
  voted = false;

  constructor(
    private http: HttpClient,
    private pusher: PusherProvider
  ) {}

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('new-entry', (data: { option: any; }) => {
      this.computeData(data.option);
    });
  }

  selectOption(option: string) {
    this.selectedOption = this.selectedOption !== option ? option : '';
  }

  computeData(option: string | number) {
    this.options = {
      ...this.options,
      [option]: {
        ...this.options[option],
        votes: ++this.options[option].votes,
      },
    };
    this.chartData = this.optionsArray.map((val) => this.options[val].votes);
  }

  vote() {
    if (this.selectedOption) {
      this.http
        .post<DataRes>( 'http://localhost:4000/vote',
          { option: this.selectedOption } )
        .subscribe((res) => {
          this.mockData = res.data;
          this.voted = true;
        });
    }
  }
}
