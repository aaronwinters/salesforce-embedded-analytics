public with sharing class ChartJSController {

    public class ChartDataWrapper {
        String label;
        List<Integer> data;
        String backgroundColor;
        String hoverBackgroundColor;

        //Contructor to use in getChartData method
        public ChartDataWrapper (String label, List<Integer> data, String backgroundColor, String hoverBackgroundColor) {
            this.label = label;
            this.data = data;
            this.backgroundColor = backgroundColor;
            this.hoverBackgroundColor = hoverBackgroundColor;
            }

    }

    @AuraEnabled(cacheable=true)
    public static List<String> getAxisLabels () {
        List<String> tempList = new List<String> {'Q3 2017', 'Q2 2018', 'Q3 2018'};
        return tempList;
        
    }

    @AuraEnabled(cacheable=true)
    public static String getChartDataset() {
        List<ChartDataWrapper> recordChartDataset = new List<ChartDataWrapper>();
        recordChartDataset.add(new ChartDataWrapper('Closed Won', new List<Integer>{90274, 3440, 0}, '#512DA8', '#7E57C2'));
        recordChartDataset.add(new ChartDataWrapper('Perception Analysis', new List<Integer>{0, 0, 578880}, '#512DA8', '#FFA000'));
        return JSON.serialize(recordChartDataset);
    }
    
}
