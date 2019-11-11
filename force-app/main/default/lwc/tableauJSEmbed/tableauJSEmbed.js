import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import tableaujs from '@salesforce/resourceUrl/tableaujsapi230';

export default class tableauJSEmbed extends LightningElement {
    // Initialize the javascript controls for Tableau
    tableauVizInitialized = false;

    renderedCallback() {
        if (this.tableauVizInitialized) {
            return;
        }
        this.tableauVizInitialized = true;
        
        // load the Tableau JS API file
        loadScript(this, tableaujs)

        // create and display the visualization
        .then(() => {
            
            let vizDiv = document.getElementById('tableauViz');
            let vizURL = 'https://public.tableau.com/views/TableauJavaScriptAPIExample/BarChart';
            let options = {
                height: '550px',
                width: '1100px',
                hideTabs: true,
                hideToolbar: true
            }
            viz = new tableau.Viz(vizDiv, vizURL, options);
        })
    }
}