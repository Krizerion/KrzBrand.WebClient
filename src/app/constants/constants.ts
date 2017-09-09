export class CONSTANTS {
     public static CHART_TYPES = [{
         name: 'Pie Chart',
         value: 'pie'
     }, {
        name: 'Advanced Pie Chart',
        value: 'pie-advanced'
    }, {
        name: 'Pie Grid',
        value: 'pie-grid'
    }, {
        name: 'Horizontal Bar Chart',
        value: 'bar-horizontal'
    }, {
        name: 'Vertical Bar Chart',
        value: 'bar-vertical'
    }];

    public static DETAILS_COLUMN_TITLES = ['Product Id', 'Name', 'Date', 'Price', 'Gender', 'Color'];

    public static SELECTED_CHART = {
        DASHBOARD: 'dashboard-chart',
        DASHBOARD_COUNTRY: 'dashboard-country-chart',
        DASHBOARD_BRAND: 'dashboard-brand-chart',
        DETAILS: 'details-chart'
    };
}
