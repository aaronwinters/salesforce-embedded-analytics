/* eslint-disable no-console */
import { LightningElement, track, wire, api } from 'lwc';
import getAxisLabels from "@salesforce/apex/ChartJSController.getAxisLabels";
//import getChartDataset from '@salesforce/apex/ChartJSController.getChartDataset';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjslibrary';

export default class ChartjsEmbed extends LightningElement {
    @api recordId;
    
    // get the dynamic axis labels for the Chart and set axisLabel parameter
    @track labelError;
    @track axisLabels;
    @wire(getAxisLabels)
    wiredAxisLabels({ error, data }) {
        if(data) {
            this.axisLabels = data;
            console.log('axisLabels in wired function: ' + this.axisLabels);
            this.labelError = undefined;
        } else if (error) {
            this.labelError = error;
            this.axisLabels = undefined;
        }
    }


    // non-wired objects and properties used for building the chart
    @track error;
    
    testAxisLabels = ['Q3 2017', 'Q2 2018', 'Q3 2018'];
    chart;
    chartjsInitialized = false;

    config = {
        type: 'bar',
        data: {
            labels: [],
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

    // Script to build and display the chart
    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;
        this.wiredAxisLabels();

        loadScript(this, chartjs)
            .then(() => {
                console.log('axisLabels are: ' + this.axisLabels);
                console.log('testAxisLabels are: ' + this.testAxisLabels);
                console.log('Stringified version of axisLabels ' + JSON.stringify(this.axisLabels));
                this.config.data.labels = this.testAxisLabels;
                console.log('axis labels are: ' + this.config.data.labels)
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