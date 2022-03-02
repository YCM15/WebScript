import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WorkSpaceService } from 'src/app/work-space/services/work-space.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit, OnChanges{

  @ViewChild('baseChart') chart?: BaseChartDirective;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() barChartLabels: any = [];
  @Input() barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  @Input() barChartData: ChartDataset[] = [];
  

  constructor(private wService: WorkSpaceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    //console.log(this.chart?.chart)
    
  }


  ngAfterViewInit(){
  }

}
