import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import tableaujs from '@salesforce/resourceUrl/tableaujsapi230';

export default class tableauJSEmbed extends LightningElement {
    @track error;
    // Initialize the javascript controls for Tableau
    tableauVizInitialized = false;
    vizURL = 'https://tableau.fairtradecertified.org/views/EmbedTest_RevPipeline/Dashboard1';
    vizOptions = {
        height: '300px',
        width: '100%',
        hideTabs: true,
        hideToolbar: true
    }

    renderedCallback() {
        if (this.tableauVizInitialized) {
            return;
        }
        this.tableauVizInitialized = true;
        console.log("start promise chain");
        // load the Tableau JS API file
        loadScript(this, tableaujs)
        // create and display the visualization
        .then(() => {
            console.log("then clause of promise before initialize method");
            this.initializeTableau();
        })
        .catch(error => {
            this.error = error;
        });
    }

    initializeTableau() {
        const vizDiv = this.template.querySelector('div')
        const URL = this.vizURL;
        const options = this.vizOptions;
        Console.log('tableau redendering attempted with ' + vizDiv + ' ' + URL + ' ' + options);
        viz = new tableauSoftware.Viz(vizDiv, URL, options);
    }
}