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
    $scope.costAnalyticsActive = true;

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


    



    var plotlyDefaultConfigurationBar = {
        responsive: true,
        displaylogo: false,
        showTips: true,
        pan2d: true,
        modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
    };


    var year = "", month = "", type_of_license = "", product_name = "";
    $scope.getYearlyExpenditure = function (year, month, type_of_license) {
        
        $('#loadergif').show();
        lupaAdminService.getYearlyExpenditureUrl(year, month, type_of_license).then(function (response) {
            $('#loadergif').hide();
            $scope.getYearlyExpenditureData = response.data[0];
            
            $scope.getYearlyList = $scope.getYearlyExpenditureData.years_list;
            $scope.getProductList = $scope.getYearlyExpenditureData.product_name;
            $scope.getLicenseList = $scope.getYearlyExpenditureData.type_of_licenses;
            
            for (i = 0; i < $scope.getYearlyExpenditureData.product_name.length; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
           var plotDataBarY =  [{
                x: $scope.getYearlyExpenditureData.product_name,
                y: $scope.getYearlyExpenditureData.cost_value,
                name: "trace 1",
                //fill: 'tozeroy',
                //type: 'scatter',
                type: 'bar',
                textposition: 'auto',
                marker : {
                    color: customd3Colors
                }
            }];

            
            //Plotly.newPlot('cost-analytics-chart-1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
            Plotly.newPlot('yearly-expenditure-bar', plotDataBarY, layout, plotlyDefaultConfigurationBar);
            
        });

    };
    $scope.getOverallCostAnalytics = function () {
        $('#loadergif').show();
        lupaAdminService.getOverallCostAnalyticsUrl().then(function (response) {
            $scope.getOverallCostAnalyticsData = response.data[0];
            $scope.getCostAnalyticsYearList = $scope.getOverallCostAnalyticsData.year;
            $scope.getCostAnalyticsProductList = $scope.getOverallCostAnalyticsData.products_list;
            
            for (i = 0; i < $scope.getCostAnalyticsProductList; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
           var plotDataBarY =  [{
                x: $scope.getOverallCostAnalyticsData.products_list,
                y: $scope.getOverallCostAnalyticsData.cost_year_val,
                name: "trace 1",
                //fill: 'tozeroy',
                //type: 'scatter',
                type: 'bar',
                textposition: 'auto',
                marker : {
                    color: customd3Colors
                }
            }];

            
            //Plotly.newPlot('cost-analytics-chart-1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
            Plotly.newPlot('overall-cost-analytics', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                

        });

    }

    $scope.overallCostAnalytics = function (product_name, selectedYear2, selectedMonth2) {
        
        $('#loadergif').show();
        lupaAdminService.overallCostAnalyticsUrl(product_name, selectedYear2, selectedMonth2).then(function (response) {
            $('#loadergif').hide();
            $scope.overallCostAnalytics = response.data[0];
            for (i = 0; i < $scope.overallCostAnalytics.products_list.length; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
            var plotDataBarY2 = [{
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

            
            Plotly.newPlot('overall-cost-analytics', plotDataBarY2, layout, plotlyDefaultConfigurationBar);
            //Plotly.newPlot('cost-analytics-chart-1', plotDataBarY1, layout, plotlyDefaultConfigurationBar);

        });


    };
    $scope.overallCostAnalyticsChange = function (product_name, selectedYear2, selectedMonth2) {
        
        $('#loadergif').show();
        lupaAdminService.overallCostAnalyticsUrl(product_name, selectedYear2, selectedMonth2).then(function (response) {
            $('#loadergif').hide();
            $scope.overallCostAnalytics = response.data[0];
            for (i = 0; i < $scope.overallCostAnalytics.products_list.length; i++) {
                customd3Colors.push(d3colors(i));
            }


            //$rootScope.plotDataBarY2 = [];
            var plotDataBarY2 = [{
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

            
            Plotly.newPlot('overall-cost-analytics', plotDataBarY2, layout, plotlyDefaultConfigurationBar);
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
    $scope.selectedRadio4 = false;
    $scope.selectedRadio5 = false;
    
    $scope.selectedYear1 = "";
    $scope.selectedMonth1 = "";
    $scope.selectedYear2 = "";
    $scope.selectedMonth2 = "";

    $scope.typeOfLicense = "";

    $scope.changeOverallCostAnalyticsBtn = function (selectedDropdown, selectedYear2, selectedMonth2) {
        if(selectedDropdown == "year") {
            selectedYear2 = $scope.getCostAnalyticsYearList[0];
            $scope.selectedYear2 = selectedYear2.toString();
            $scope.selectedRadio4 = true;
        }
        if(selectedDropdown == "month") {
            selectedMonth2 = 1;
            $scope.selectedMonth2 = monthArray[0];
            $scope.selectedRadio5 = true;
        }
        
        //$scope.chartRenderId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        
        var d = new Date();
        if (selectedYear2 == d.getFullYear()) {
            var currentMonth = d.getMonth();
            var newMonthArray = [];
            for (i = 0; i <= currentMonth; i++) {
                newMonthArray.push(monthArray[i])
            }
            $scope.getCostAnalyticsMonthList = newMonthArray;

        }
        else {
            $scope.getCostAnalyticsMonthList = monthArray;
        }
        $scope.overallCostAnalyticsChange("LSDYNA", $scope.selectedYear2, selectedMonth2);





    }
    
    $scope.changeYearlyExpenditureBtn = function (selectedDropdown, selectedYear1, selectedMonth1, typeOfLicense) {
        if(selectedDropdown == "year") {
            selectedYear1 = $scope.getYearlyList[0];
            $scope.selectedYear1 = selectedYear1.toString();
            $scope.selectedRadio1 = true;
        }
        if(selectedDropdown == "month") {
            selectedMonth1 = 1;
            $scope.selectedMonth1 = monthArray[0];
            $scope.selectedRadio2 = true;
        }
        if(selectedDropdown == "license") {
            typeOfLicense = $scope.getLicenseList[0];
            $scope.typeOfLicense = typeOfLicense;
            $scope.selectedRadio3 = true;
        }
        //$scope.chartRenderId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        
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
    $scope.yearlyExpenditure = function (selectedYear1, selectedMonth1, typeOfLicense) {
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
    /*$scope.getAllFeatureListData = function() {
        $('#loadergif').show();
        lupaAdminService.getAllFeatureListUrl().then(function (response) {
            $('#loadergif').hide();
            $scope.getAllFeatureListData = response.data[0];
            $scope.featureProd = [];
            $scope.featureProdData = [];
            for(key in $scope.getAllFeatureListData)  {
                $scope.featureProd.push(key);
                $scope.featureProdData.push($scope.getAllFeatureListData[key][0]);
                

            }
            $scope.getAllFeatureList();
            
        });
    }*/
    
    $scope.getFeaturePercentage = function (year,month,product_name) {
        
        $('#loadergif').show();
        lupaAdminService.getFeaturePercentageUrl(year,month,product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.getFeaturePercentageData = response.data[0];
            
            
        });

    }
    $scope.getFeaturePercentageOnChange = function (year,month,product_name, id) {
        
        $('#loadergif').show();
        lupaAdminService.getFeaturePercentageUrl(year,month,product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.getFeaturePercentageChangeData = response.data;
           
            $scope.drawGraph($scope.getFeaturePercentageChangeData, id);
            
            
            
            
        });

    }
    $scope.drawGraph = function(response, id) {
            $scope.prod_name = [];
            $scope.featureProdDataChange = [];
            for(key in response)  {
                $scope.prod_name = key;
                $scope.featureProdDataChange.push(response[key][0]);
             }
        var plotDataBarY= [];

         var plotDataBarY = [{
                x: $scope.featureProdDataChange[0].features_list,
                y: $scope.featureProdDataChange[0].cost_year_val,
                name: "trace 1",
                type: 'bar',
                text: $scope.featureProdDataChange[0].cost_year_percentage,
                textposition: 'auto',
                marker: {
                    color: customd3Colors
                }
            }];
            layout.title = $scope.prod_name;
            
            Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);


    }
    $scope.changeFeatureAnalyticsGraphType = function(chartType, id, response, prod_name) {
        
        var plotDataBarY = [];
        if(chartType == 'vertical_bar_chart') {
             plotDataBarY.push({
                                    x: response.features_list,
                                    y: response.cost_year_val,
                                    name: prod_name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(0)
                                    }
                });
                layout.title = prod_name;
                Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);

        }
        else if(chartType == 'pie_chart') {
            
            
                  var plotDataBarY = [{
                        values: response.cost_year_val,
                        labels: response.features_list,
                        type: 'pie'
                    }];
                    Plotly.newPlot(id, plotDataBarY, {title: prod_name}, plotlyDefaultConfigurationBar);
        }
        else if(chartType == 'line_chart') {
                 plotDataBarY.push({
                                    x: response.features_list,
                                    y: response.cost_year_val,
                                    name: prod_name,
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(0)
                                    }
                });
                layout.title = prod_name;
                Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                

        }
        else if(chartType == 'area_chart') {
            plotDataBarY.push({
                                    x: response.features_list,
                                    y: response.cost_year_val,
                                    name: prod_name,
                                    type: 'scatter',
                                    fill: 'tozeroy',
                                    marker: {
                                        color: d3colors(0)
                                    }
                })
                layout.title = prod_name;
                Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);

        }
        else if(chartType == 'horizontal_bar_chart') {
                plotDataBarY.push({
                                    y: response.features_list,
                                    x: response.cost_year_val,
                                    name: prod_name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(0)
                                    }
                });
                layout.title = prod_name;
                Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        }
    }
    $scope.featurechartfilteryear1 = false;
    $scope.featurechartfiltermonth1 = false;
    $scope.featurechartfilterselectyear1 = false;
    $scope.featurechartfilterselectmonth1 = false;
    $scope.overallfeature = true;

    $scope.getYearlyExpenditure(year,month,type_of_license);
    ////$scope.getFeaturePercentage(year,month,product_name);
    $scope.getOverallCostAnalytics();
    
    
    $scope.changeFeatureAnalyticsGraph = function(year,month,product_name, id) {
        
        
        if(month == undefined || month == false) {
            month = "";
        }
        var d = new Date();
        if (year == d.getFullYear()) {
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
        month = monthArray.indexOf(month) + 1;
        
        $scope.getFeaturePercentageOnChange(year, month, product_name,id);
        
    }
    //$scope.getFeaturePercentage();
    $scope.changeCostAnalyticsGraph = function (event,chartType) {
        var analyticId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        
       // $rootScope.plotDataBarY = $rootScope.plotDataBarY
        if (chartType == 'vertical_bar_chart') {
            //Plotly.newPlot(analyticId, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);
            


        }
        else if (chartType == 'pie_chart') {

        }
        else if (chartType == 'line_chart') {
            
            $rootScope.plotDataBarY2[0].type = "scatter";
            Plotly.newPlot('cost-analytics-chart-' + index, $rootScope.plotDataBarY2, layout, plotlyDefaultConfigurationBar);

        }
        else if (chartType == 'area_chart') {
            
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



    
    //$scope.getAllFeatureListData();

    $scope.getAllFeatureList = function () {
        
        $('#loadergif').show();
        lupaAdminService.getAllFeatureListUrl().then(function (response) {
             $('#loadergif').hide();
            $scope.getAllFeatureListData = response.data[0];
            $scope.featureProd = [];
            $scope.featureProdData = [];
            for(key in $scope.getAllFeatureListData)  {
                $scope.featureProd.push(key);
                $scope.featureProdData.push($scope.getAllFeatureListData[key][0]);
             }
            setTimeout(function() {
                 
            for(i=0;i<$scope.featureProdData.length;i++) {
                var plotDataBarY = [];
                plotDataBarY.push({
                x: $scope.featureProdData[i].features_list,
                y: $scope.featureProdData[i].cost_year_val,
                name: "trace 1",
                type: 'bar',
                text: $scope.featureProdData[i].cost_year_percentage,
                textposition: 'auto',
                marker: {
                    color: d3colors(i)
                }
            });
            layout.title = $scope.featureProd[i];
            Plotly.newPlot('cost-analytics-feature-chart-' + i, plotDataBarY, layout, plotlyDefaultConfigurationBar);
            
            
            
            

            }
            });
           /* 
            var index = -1;
            for(key in $scope.getAllFeatureListData)  {
              index++;
              //customd3Colors.push(d3colors(i));


               $scope.plotDataBarY = [{
                x: $scope.getAllFeatureListData[key][0].features_list,
                y: $scope.getAllFeatureListData[key][0].cost_year_val,
                name: "trace 1",
                type: 'bar',
                text: $scope.getAllFeatureListData[key][0].cost_year_percentage,
                textposition: 'auto',
                marker: {
                    color: d3colors(index)
                }
            }];*/

            
            
            
        });


    };


    $scope.changeYearlyFeatureBtn = function (selectedDropdown, selectedYear1, selectedMonth1, product_name) {
        if(selectedDropdown == "year") {
            selectedYear1 = $scope.featureProd[0];
            /*$scope.selectedYear1 = selectedYear1.toString();
            $scope.selectedRadio1 = true;*/
        }
        if(selectedDropdown == "month") {
            selectedMonth1 = 1;
            $scope.selectedMonth1 = monthArray[0];
            /*$scope.selectedRadio2 = true;*/
        }
        
        //$scope.chartRenderId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        
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
        //$scope.getYearlyExpenditure(selectedYear1, selectedMonth1, typeOfLicense)





    }
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
    $scope.getAllFeatureList();

    
     








}]);