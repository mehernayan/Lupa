lupaApp.controller('adminCostAnalyticsController', ['$scope', '$rootScope', 'userData', 'lupaAdminService', '$location', 'localStorageService', function ($scope, $rootScope, userData, lupaAdminService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.adminFilter = 'overall';
    $scope.adminReport = 'Department'
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.favouriteActive = false;

    //layout 
    var layout = {
        title: '',
        showlegend: false,
        legend: {
            "orientation": "h",
            x: 0.58,
            y: 1.1
        },
        xaxis: {
            type: 'category',
            showgrid: false,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            tickangle: 0,
        },
        yaxis: {
            showgrid: true,
            title: "",
            showline: true
        },
        barmode: 'group',
        bargroupgap: 0.5

    };

    var d3colors = Plotly.d3.scale.category10();
    var customd3Colors = [];


    //debugger;



    var plotlyDefaultConfigurationBar = {
        responsive: true,
        displaylogo: false,
        showTips: true,
        pan2d: true,
        modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
    };


    var year = "", month = "", type_of_license = "", product_name = "";
    $scope.getYearlyExpenditure = function (year, month, type_of_license) {
        // debugger;
        $('#loadergif').show();
        lupaAdminService.getYearlyExpenditureUrl(year, month, type_of_license).then(function (response) {
            $('#loadergif').hide();
            $scope.getYearlyExpenditureData = response.data[0];
            $scope.getYearlyList = $scope.getYearlyExpenditureData.years_list;
            $scope.getProductList = $scope.getYearlyExpenditureData.product_name;
            $scope.getLicenseList = $scope.getYearlyExpenditureData.type_of_licenses;
            //debugger;
            for (i = 0; i < $scope.getYearlyExpenditureData.product_name.length; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
            $rootScope.plotDataBarY1 = [{
                x: $scope.getYearlyExpenditureData.product_name,
                y: $scope.getYearlyExpenditureData.cost_value,
                name: "trace 1",
                type: 'bar',
                textposition: 'auto',
                marker: {
                    color: customd3Colors
                }
            }];

            //debugger;
            Plotly.newPlot('cost-analytics-chart-1', $rootScope.plotDataBarY1, layout, plotlyDefaultConfigurationBar);
        });

    };
    $scope.getOverallCostAnalytics = function () {
        // debugger;
        $('#loadergif').show();
        lupaAdminService.getOverallCostAnalyticsUrl().then(function (response) {
            $('#loadergif').hide();
            $scope.overallCostAnalytics = response.data[0];
            for (i = 0; i < $scope.overallCostAnalytics.products_list.length; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
            $rootScope.plotDataBarY2 = [{
                x: $scope.overallCostAnalytics.products_list,
                y: $scope.overallCostAnalytics.cost_year_val,
                name: "trace 1",
                type: 'bar',
                text: $scope.overallCostAnalytics.cost_year_percentage,
                textposition: 'auto',
                marker: {
                    color: customd3Colors
                }
            }];

            //debugger;
            Plotly.newPlot('cost-analytics-chart-2', $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);
            //Plotly.newPlot('cost-analytics-chart-1', plotDataBarY1, layout, plotlyDefaultConfigurationBar);

        });


    };
    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    /*$scope.selectedYear1 = false;
    $scope.selectedMonth1 = false;
    $scope.typeOfLicense = false;
    $scope.selectedYearRadio = false;
    $scope.selected = true;*/
    $scope.selectedRadio1 = false;
    $scope.selectedRadio2 = false;
    $scope.selectedRadio3 = false;
    $scope.selectedYear1 = "";
    $scope.selectedMonth1 = "";
    $scope.typeOfLicense = "";


    $scope.changeCostAnalyticsGraph1 = function (selectedYear1, selectedMonth1, typeOfLicense) {
        //debugger;
        var d = new Date();
        if (selectedYear1 == d.getFullYear()) {
            var currentMonth = d.getMonth();
            var newMonthArray = [];
            for (i = 0; i <= currentMonth; i++) {
                newMonthArray.push(monthArray[i])
            }
            $scope.getMonthList = newMonthArray;

        }
        else {
            $scope.getMonthList = monthArray;
        }
        $scope.getYearlyExpenditure(selectedYear1, selectedMonth1, typeOfLicense)





    }
    $scope.getAllFeatureList = function () {
        // debugger;
        $('#loadergif').show();
        lupaAdminService.getAllFeatureListUrl().then(function (response) {
            $('#loadergif').hide();
            $scope.getAllFeatureListData = response.data[0];
            var index = 0;
            for(key in $scope.getAllFeatureListData)  {

              //customd3Colors.push(d3colors(i));


               $scope.plotDataBarY = [{
                x: $scope.getAllFeatureListData[key][0].features_list,
                y: $scope.getAllFeatureListData[key][0].cost_year_val,
                name: "trace 1",
                type: 'bar',
                text: $scope.getAllFeatureListData[key][0].cost_year_percentage,
                textposition: 'auto',
                marker: {
                    color: d3colors(i)
                }
            }];

            //debugger;
            Plotly.newPlot('cost-analytics-feature-chart-' + index, $scope.plotDataBarY, layout, plotlyDefaultConfigurationBar);
            index++
            }
            
            
        });


    }
    $scope.getFeaturePercentage = function (year,month,product_name) {
        // debugger;
        $('#loadergif').show();
        lupaAdminService.getFeaturePercentageUrl().then(function (response) {
            $('#loadergif').hide();
            $scope.getFeaturePercentageData = response.data[0];
            
            //debugger;
        });

    }
    $scope.getYearlyExpenditure(year,month,type_of_license);
    $scope.getFeaturePercentage(year,month,product_name);
    $scope.getOverallCostAnalytics();
    $scope.getAllFeatureList();
    $scope.changeFeatureAnalyticsGraph1 = function(year,month,index) {
        //debugger;
        var d = new Date();
        if (selectedYear1 == d.getFullYear()) {
            var currentMonth = d.getMonth();
            var newMonthArray = [];
            for (i = 0; i <= currentMonth; i++) {
                newMonthArray.push(monthArray[i])
            }
            $scope.getMonthList = newMonthArray;

        }
        else {
            $scope.getMonthList = monthArray;
        }
        $scope.getYearlyExpenditure(selectedYear1, selectedMonth1, index)
        
    }
    //$scope.getFeaturePercentage();
    $scope.changeCostAnalyticsGraph = function (chartType, index) {
       // $rootScope.plotDataBarY = $rootScope.plotDataBarY
        if (chartType == 'vertical_bar_chart') {
            $rootScope.plotDataBarY2[0].type = "bar";
            Plotly.newPlot('cost-analytics-chart-' + index, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);
            //debugger;


        }
        else if (chartType == 'pie_chart') {

        }
        else if (chartType == 'line_chart') {
            //debugger;
            $rootScope.plotDataBarY2[0].type = "scatter";
            Plotly.newPlot('cost-analytics-chart-' + index, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);

        }
        else if (chartType == 'area_chart') {
            //debugger;
            $rootScope.plotDataBarY2[0].type = "scatter";
            $rootScope.plotDataBarY2[0].fill = "tozeroy";
            Plotly.newPlot('cost-analytics-chart-' + index, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);
        }
        else if (chartType == 'horizontal_bar_chart') {
            $rootScope.plotDataBarY2[0].x = $rootScope.plotDataBarY2[0].y;
            $rootScope.plotDataBarY2[0].y = $rootScope.plotDataBarY2[0].x;
            $rootScope.plotDataBarY2[0].type = "bar";
            $rootScope.plotDataBarY2[0].orientation = "h";
            Plotly.newPlot('cost-analytics-chart-' + index, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);
        }

    }










}]);