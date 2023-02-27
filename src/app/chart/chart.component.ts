import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { VoteOption } from '../core/model/data-res.model';

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

  constructor(
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    if (this.mockData) {
      let stocks = await this.mockData;

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

      Object.keys(stocks).forEach((key, index, array) => {
        if (index > 3) {
          return true;
        }
        labels.push(key);
        votes.push(stocks[key].votes);
        backgroundColor.push(backgroundColor[index]);
        borderColor.push(borderColor[index])
        return false;
      });

      this.data = {
        labels: labels,
        datasets: [{
          label: 'Germany',
          data: votes,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 2
        }]
      }
      console.log('backgroundColor',backgroundColor)
      console.log('borderColor',borderColor)
    };

    this.changeChart({
      detail: {
        value: 'bar'
      }
    });
  }

  changeChart(event: any) {
    const type = event.detail.value || 'bar';
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
