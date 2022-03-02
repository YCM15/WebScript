import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {

  @ViewChild('mychartBar') chart?: BaseChartDirective;
  @ViewChild('mychartPie') chart2?: BaseChartDirective;

  load:boolean=false;

  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any = ['Users', 'Folders', 'Proyects', 'Snippets'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public chartPlugins = [];
  public barChartData: ChartDataset[] = [];

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ ],
    datasets: [{
      data: [  ]
    }]
  };
  public pieChartType: ChartType = 'pie';

  constructor(private wService: WorkSpaceService) { 
    this.wService.getStatistics().subscribe((res:any)=>{
      if(res.status){
        let st = res.statistics;
        this.barChartData.push({ 
          data: [
            st.users, st.folders, st.proyects, st.snippets
          ], 
          label: 'All Data', 
          backgroundColor:'#33b5e5', 
          hoverBackgroundColor:"#0099CC"
        });
      }
    })
    this.wService.getStatisticsSnippets().subscribe((res:any)=>{
      if(res.status){
        let st = res.statistics;
        let tempLabel = [];
        st.forEach((el:any) => {
          this.pieChartData.labels!.push(el._id);
          this.pieChartData.datasets[0].data.push(el.count)
        });
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.load=true
      console.log(this.pieChartData)
      this.chart2?.chart?.update();
      this.chart?.chart?.update();
    }, 1000);
  }

  ngOnInit(): void {
    
  }

}
