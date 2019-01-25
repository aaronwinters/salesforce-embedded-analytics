# Embedded Analytics for Salesforce
The repository contains the source code and metadata for embedding various data visualization tools in Salesforce and accompanies a series of how-to [articles on embedding analytics in Salesforce](https://www.aaronwinters.org/embedded-analytics-for-salesforce-applications/) applications.

## Install and Configure the App

### Installation
1. Install Salesforce DX. Follow the instructions in the [Salesforce DX Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) or in the [guide for setting up the CLI on WSL](https://www.aaronwinters.org/setting-up-sfdx-cli-on-the-windows-subsystem-for-linux/).

1. Clone the **salesforce-embedded-analytics** repository:

   ```
   git clone https://github.com/aaronwinters/salesforce-embedded-analytics.git
   cd salesforce-embedded-analytics
   ```

1. Create a scratch org and provide it with an alias (dh):

   ```
   sfdx force:org:create -s -f config/project-scratch-def.json -a dh
   ```

1. Push the app to your scratch org:

   ```
   sfdx force:source:push
   ```

1. Assign the **Embedded Analytics** permission set to the default user:

   ```
   sfdx force:user:permset:assign -n embedded_analytics
   ```

1. Open the scratch org:

   ```
   sfdx force:org:open
   ```

### Configure Embedded Einstein Analytics Dashboard
Complete the steps in the [embedding Einstein Analytics dashboards in Salesforce](https://www.aaronwinters.org/embed-einstein-analytics-dashboard-in-salesforce-records/) tutorial.

## Configure Embedded Tableau Dashboards
Complete the steps in the [embedding Tableau dashboards in Salesforce using Visualforce](https://www.aaronwinters.org/embed-tableau-dashboard-in-salesforce-records-using-visualforce/) tutorial. Be sure to replace [URL FOR TABLEAU DASHBOARD] in the SimpleTableauEmbed visualforce page with your Tableau Online/Server URL.

Complete the steps in the [embedding Tableau dashboards in Salesforce using Canvas](https://www.aaronwinters.org/embed-tableau-dashboard-in-salesforce-records-with-canvas/) tutorial.

## Configure Embedded Qlik Sense Visualizations
Complete the steps in the [embedding Tableau dashboards in Salesforce using Visualforce](https://www.aaronwinters.org/embed-qlik-sense-dashboards-in-salesforce-records/) tutorial. Be sure to replace `[ngrok URL][Qlik Sense Single Object URL]` in the QlikSenseEmbed visualforce page with your Qlik Sense Server URL.

## Resources
Visit the full series for [tutorials for embedding visualizations in Salesforce](https://www.aaronwinters.org/embedded-analytics-for-salesforce-applications/).


