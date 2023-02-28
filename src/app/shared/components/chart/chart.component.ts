import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { VoteOption } from '../../../core/model/data-res.model';
import { PusherService } from '../../pusher/pusher.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit, OnInit {
  @Input('mockData') mockData?: VoteOption;
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;

  data: any = [];
  canvasChart?: Chart;


  vote_channel: any;

  constructor(
    private pusher: PusherService,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    let self = this;
    this.vote_channel = this.pusher.init();
    this.vote_channel.bind('new-entry', function (body: any) {
      self.mockData = body.data;
      self.editChart();
    });
  }

  ngAfterViewInit() {
    this.editChart();
  }

  editChart() {
    if (this.mockData) {
      let votes: number[] = [];

      let labels: string[] = [];

      const backgroundColor = [
        'rgba(255, 199, 132, 0.2)',
        'rgba(55, 99, 132, 0.4)',
        'rgba(155, 99, 132, 0.4)',
        'rgba(55, 99, 232, 0.4)',
      ];
      const borderColor = [
        'rgba(255, 99, 32, 0.8)',
        'rgba(55, 99, 132, 0.8)',
        'rgba(155, 99, 132, 0.8)',
        'rgba(55, 99, 132, 0.8)',
      ];

      Object.keys(this.mockData).forEach((key, index, array) => {
        if (index > 3) {
          return true;
        }
        labels.push(key);
        if (this.mockData) {
          votes.push(this.mockData[key].votes);
        }
        return false;
      });

      this.data = {
        labels: labels,
        backgroundColor,
        datasets: [{
          data: votes,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 2
        }]
      }
    };

    this.changeChart({
      detail: {
        value: 'doughnut'
      }
    });
  }

  changeChart(event: any) {
    const type = event.detail.value || 'doughnut';
    if (this.canvasChart) {
      this.canvasChart.destroy();
    }
    if (this.chartCanvas) {
      this.canvasChart = new Chart(this.chartCanvas.nativeElement, {
        type: type,
        data: this.data,
        options: {
          indexAxis: 'x'
        }
      });
    }
  }

  addRandom(points: any): number {
    return Number(points) - Number(Math.floor((Math.random() * 100) + 1));
  }
}
