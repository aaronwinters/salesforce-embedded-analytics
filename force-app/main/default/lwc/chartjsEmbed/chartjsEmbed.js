import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjslibrary';

export default class ChartjsEmbed extends LightningElement {
    @track error;
    chart;
    chartjsInitialized = false;

    // segment1 = [90274, 3440, 0];
    // segment2 = [0,0, 578880];
    //dates = ['Q3 2017', 'Q2 2018', 'Q3 2018'];

    config = {
        type: 'bar',
        data: {
            labels: ['Q3 2017', 'Q2 2018', 'Q3 2018'],
            datasets: [
                {
                    label: 'Closed Won',
                    data: [90274, 3440, 0],
                    backgroundColor: "#512DA8",
                    hoverBackgroundColor: "#7E57C2",
                },
                {
                    label: 'Perception Analysis',
                    data: [0,0, 578880],
                    backgroundColor: "#FFA000",
                    hoverBackgroundColor: "#FFCA28",
                }
            ],
            
        },
        options: {
            responsive: true,
            legend: {
                position: 'right'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            scales: {
                xAxes: [{ 
                    stacked: true, 
                  gridLines: { display: false },
                }],
                yAxes: [{ 
                    stacked: true
                }]
            }
        }
    };

    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, chartjs)
            .then(() => {
                const ctx = this.template
                    .querySelector('canvas.bar')
                    .getContext('2d');
                this.chart = new window.Chart(ctx, this.config);
            })
            .catch(error => {
                this.error = error;
            });
    }
}