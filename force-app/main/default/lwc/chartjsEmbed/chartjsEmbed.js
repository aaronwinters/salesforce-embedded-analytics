/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import getAxisLabels from "@salesforce/apex/ChartJSController.getAxisLabels";
//import getChartDataset from '@salesforce/apex/ChartJSController.getChartDataset';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjslibrary';

export default class ChartjsEmbed extends LightningElement {
    @api recordId;
    
    @track error;
    
    chart;
    chartjsInitialized = false;

    // config object structure based on chart.js docs
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

    // Chain of promises to update config object with data from Salesforce and build and display the chart
    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        // Get labels for x-axis from Salesforce and update config object with values
        getAxisLabels()

        .then(result => {
            this.config.data.labels = result;
            console.log('rendered callback axis labels: ' + this.config.data.labels);
        }) 

        // load the chartjs library from static resources
        .then (loadScript(this, chartjs))

        // create and display the chart
        .then(() => {
            console.log('chart axis labels are: ' + this.config.data.labels);
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