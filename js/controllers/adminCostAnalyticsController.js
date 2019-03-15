lupaApp.controller('adminCostAnalyticsController', ['$scope', '$rootScope', 'userData', 'lupaAdminService', '$location', 'localStorageService', '$route', function ($scope, $rootScope, userData, lupaAdminService, $location, localStorageService, $route) {
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
            tickangle: -45
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
            

            layout.title = "Total Software expenditure";
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
                text: $scope.getOverallCostAnalyticsData.cost_year_percentage,
                textposition: 'auto',
                marker : {
                    color: customd3Colors
                }
            }];

            layout.title = "Total software utilization";
            //Plotly.newPlot('cost-analytics-chart-1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
            Plotly.newPlot('overall-cost-analytics', plotDataBarY, layout, plotlyDefaultConfigurationBar);
            $('#loadergif').hide();
                

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
        if(selectedMonth2 == "Jan") {
            selectedMonth2 = "01";
        }else if(selectedMonth2 == "Feb"){
            selectedMonth2 = "02";
        }else if(selectedMonth2 == "Mar"){
            selectedMonth2 = "03";
        }else if(selectedMonth2 == "Apr"){
            selectedMonth2 = "04";
        }else if(selectedMonth2 == "May"){
            selectedMonth2 = "05";
        }else if(selectedMonth2 == "Jun"){
            selectedMonth2 = "06";
        }else if(selectedMonth2 == "Jul"){
            selectedMonth2 = "07";
        }else if(selectedMonth2 == "Aug"){
            selectedMonth2 = "08";
        }else if(selectedMonth2 == "Sep"){
            selectedMonth2 = "09";
        }else if(selectedMonth2 == "Oct"){
            selectedMonth2 = "10";
        }else if(selectedMonth2 == "Nov"){
            selectedMonth2 = "11";
        }else if(selectedMonth2 == "Dec"){
            selectedMonth2 = "12";
        }
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
        $scope.overallUti = false;
        if(selectedDropdown == "year") {
            selectedYear2 = $scope.getCostAnalyticsYearList[0];
            $scope.selectedYear2 = selectedYear2.toString();
            $scope.selectedRadio4 = true;
        }
        if(selectedDropdown == "month") {
            if(selectedYear2 == "") {
                selectedYear2 = $scope.getCostAnalyticsYearList[0];
                $scope.selectedYear2 = selectedYear2.toString();
                $scope.selectedRadio4 = true;
            }
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
    $scope.overallExp = true;
    $scope.overallUti = true;
    $scope.reloadPage = function() {
        
        $route.reload();

    }
    
    $scope.changeYearlyExpenditureBtn = function (selectedDropdown, selectedYear1, selectedMonth1, typeOfLicense) {
        $scope.overallExp = false;
        if(selectedDropdown == "year") {
            selectedYear1 = $scope.getYearlyList[0];
            $scope.selectedYear1 = selectedYear1.toString();
            $scope.selectedRadio1 = true;
        }
        if(selectedDropdown == "month") {
            selectedMonth1 = "01";
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
        $scope.getYearlyExpenditure(selectedYear1, selectedMonth1, typeOfLicense);
        






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
        
        if(selectedMonth1 == "Jan") {
            selectedMonth1 = "01";
        }else if(selectedMonth1 == "Feb"){
            selectedMonth1 = "02";
        }else if(selectedMonth1 == "Mar"){
            selectedMonth1 = "03";
        }else if(selectedMonth1 == "Apr"){
            selectedMonth1 = "04";
        }else if(selectedMonth1 == "May"){
            selectedMonth1 = "05";
        }else if(selectedMonth1 == "Jun"){
            selectedMonth1 = "06";
        }else if(selectedMonth1 == "Jul"){
            selectedMonth1 = "07";
        }else if(selectedMonth1 == "Aug"){
            selectedMonth1 = "08";
        }else if(selectedMonth1 == "Sep"){
            selectedMonth1 = "09";
        }else if(selectedMonth1 == "Oct"){
            selectedMonth1 = "10";
        }else if(selectedMonth1 == "Nov"){
            selectedMonth1 = "11";
        }else if(selectedMonth1 == "Dec"){
            selectedMonth1 = "12";
        }
        
        $scope.getYearlyExpenditure(selectedYear1, selectedMonth1, typeOfLicense);
        





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
           
            $scope.drawGraph($scope.getFeaturePercentageChangeData, id, product_name);
            
            
            
            
        });

    }
    $scope.drawGraph = function(response, id, product_name) {
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
            layout.title = product_name + " Per feature Total utilization";
            
            
            Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);


    }
    
    $scope.changeFeatureAnalyticsGraphType = function(chartType, id, response, prod_name) {
        
        
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        var plotDataBarY = [];
        var type = "bar";
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
                layout.title = prod_name + " Per feature Total utilization";
                
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
                layout.title = prod_name + " Per feature Total utilization";
                
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
                layout.title = prod_name + " Per feature Total utilization";
                
                Plotly.newPlot(id, plotDataBarY, layout, plotlyDefaultConfigurationBar);

        }
        else if(chartType == 'horizontal_bar_chart') {
                plotDataBarY = [];
                plotDataBarY.push({
                    y: ["abv", "ete", "sds"],
                    x: [123,44,655],
                    name: "Year wise",
                    type: type,
                    orientation: 'h',
                    marker : {
                    color: customd3Colors
                    }
                })
                layout.title = prod_name + " Per feature Total utilization";
                
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
    
    
    $scope.changeFeatureAnalyticsGraph = function(year,selectedMonth2,product_name, id) {
        //debugger;
        
        if(selectedMonth2 == undefined || selectedMonth2 == false) {
            selectedMonth2 = "";
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
        if(selectedMonth2 == "Jan") {
            selectedMonth2 = "01";
        }else if(selectedMonth2 == "Feb"){
            selectedMonth2 = "02";
        }else if(selectedMonth2 == "Mar"){
            selectedMonth2 = "03";
        }else if(selectedMonth2 == "Apr"){
            selectedMonth2 = "04";
        }else if(selectedMonth2 == "May"){
            selectedMonth2 = "05";
        }else if(selectedMonth2 == "Jun"){
            selectedMonth2 = "06";
        }else if(selectedMonth2 == "Jul"){
            selectedMonth2 = "07";
        }else if(selectedMonth2 == "Aug"){
            selectedMonth2 = "08";
        }else if(selectedMonth2 == "Sep"){
            selectedMonth2 = "09";
        }else if(selectedMonth2 == "Oct"){
            selectedMonth2 = "10";
        }else if(selectedMonth2 == "Nov"){
            selectedMonth2 = "11";
        }else if(selectedMonth2 == "Dec"){
            selectedMonth2 = "12";
        }
        
        $scope.getFeaturePercentageOnChange(year, selectedMonth2, product_name,id);
        
    }
    //$scope.getFeaturePercentage();
    $scope.changeCostAnalyticsGraph = function (event,chartType, getYearlyExpenditureData) {
        var analyticId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        var type = 'bar';
        var fill = '';
        var mode = "";
        var plotDataBarY = [];
        var plotlyDefaultConfigurationBar = {
            responsive: true,
            displaylogo: false,
            showTips: true,
            pan2d: true,
            modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
        };
        var d3colors = Plotly.d3.scale.category10();
        if (chartType == "vertical_bar_chart") {
            var type = 'bar';
            plotDataBarY.push({
                x: getYearlyExpenditureData.product_name,
                y: getYearlyExpenditureData.cost_value,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }


        else if (chartType == "line_chart") {
            var type = "scatter";
            plotDataBarY.push({
                x: getYearlyExpenditureData.product_name,
                y: getYearlyExpenditureData.cost_value,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == "area_chart") {
            var type = 'scatter',
                fill = 'tozeroy';
                plotDataBarY.push({
                x: getYearlyExpenditureData.product_name,
                y: getYearlyExpenditureData.cost_value,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == "stacked_bar_chart") {
            layout.barmode = 'stack';
            plotDataBarY.push({
                x: getYearlyExpenditureData.product_name,
                y: getYearlyExpenditureData.cost_value,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == 'scatter_chart') {
            var type = 'scatter',
                mode = 'markers';
                plotDataBarY.push({
                x: getYearlyExpenditureData.product_name,
                y: getYearlyExpenditureData.cost_value,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else {
            if (chartType == 'horizontal_bar_chart') {
                var type = 'bar';
                plotDataBarY.push({
                    y: getYearlyExpenditureData.product_name,
                    x: getYearlyExpenditureData.cost_value,
                    name: "Year wise",
                    type: type,
                    orientation: 'h',
                    marker : {
                    color: customd3Colors
                    }
                })
            }
            if (chartType == "pie_chart") {
                var plotDataBarY = [{
                    values: getYearlyExpenditureData.cost_value,
                    labels: getYearlyExpenditureData.product_name,
                    type: 'pie',
                    textinfo: 'none'
                }];
                var layout = {
                    showlegend: true, legend: {
                        x: 1,
                        y: 1
                    }
                };
            }
            
        }
        Plotly.newPlot(analyticId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        

    }

    $scope.changeOverallCostAnalyticsGraph = function (event,chartType, getOverallCostAnalyticsData) {
        var analyticId = $(event.target).closest(".chart-container").find(".chart-data-analytics").attr("id");
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        var type = 'bar';
        var fill = '';
        var mode = "";
        var plotDataBarY = [];
        var plotlyDefaultConfigurationBar = {
            responsive: true,
            displaylogo: false,
            showTips: true,
            pan2d: true,
            modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
        };
        var d3colors = Plotly.d3.scale.category10();
        if (chartType == "vertical_bar_chart") {
            var type = 'bar';
            plotDataBarY.push({
                x: getOverallCostAnalyticsData.products_list,
                y: getOverallCostAnalyticsData.cost_year_val,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                text: getOverallCostAnalyticsData.cost_year_percentage,
                textposition: 'auto',
                marker : {
                    color: customd3Colors
                }
            })
        }


        else if (chartType == "line_chart") {
            var type = "scatter";
            plotDataBarY.push({
                x: getOverallCostAnalyticsData.products_list,
                y: getOverallCostAnalyticsData.cost_year_val,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == "area_chart") {
            var type = 'scatter',
                fill = 'tozeroy';
                plotDataBarY.push({
                x: getOverallCostAnalyticsData.products_list,
                y: getOverallCostAnalyticsData.cost_year_val,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == "stacked_bar_chart") {
            layout.barmode = 'stack';
            plotDataBarY.push({
                x: getOverallCostAnalyticsData.products_list,
                y: getOverallCostAnalyticsData.cost_year_val,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else if (chartType == 'scatter_chart') {
            var type = 'scatter',
                mode = 'markers';
                plotDataBarY.push({
                x: getOverallCostAnalyticsData.products_list,
                y: getOverallCostAnalyticsData.cost_year_val,
                name: "Yearly Expenditure",
                type: type,
                fill: fill,
                mode: mode,
                marker : {
                    color: customd3Colors
                }
            })
        }
        else {
            if (chartType == 'horizontal_bar_chart') {
                var type = 'bar';
                plotDataBarY.push({
                    y: getOverallCostAnalyticsData.products_list,
                    x: getOverallCostAnalyticsData.cost_year_val,
                    name: "Year wise",
                    type: type,
                    orientation: 'h',
                    marker : {
                    color: customd3Colors
                    }
                })
            }
            if (chartType == "pie_chart") {
                var plotDataBarY = [{
                    values: getOverallCostAnalyticsData.cost_year_val,
                    labels: getOverallCostAnalyticsData.products_list,
                    type: 'pie',
                    textinfo: 'none'
                }];
                var layout = {
                    showlegend: true, legend: {
                        x: 1,
                        y: 1
                    }
                };
            }
            
        }
        Plotly.newPlot(analyticId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        

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
            layout.title =  $scope.featureProd[i] + " Per feature Total utilization";
            
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
    
    $scope.overallFeauture= [];
    $scope.overallFeauture[0] = true ;
    $scope.overallFeauture[1] = true ;
    $scope.overallFeauture[2] = true ;
    $scope.overallFeauture[3] = true ;
    $scope.overallFeauture[4] = true ;

    $scope.changeYearlyFeatureBtn = function (selectedDropdown, selectedYear1, selectedMonth1, product_name, prod_id) {
        
        if(prod_id == 'cost-analytics-feature-chart-0') {
            $scope.overallFeauture[0]=false;
        }
        else if(prod_id == 'cost-analytics-feature-chart-1') {
            $scope.overallFeauture[1]=false;
        }
        else if(prod_id == 'cost-analytics-feature-chart-2') {
            $scope.overallFeauture[2]=false;
        }
        else if(prod_id == 'cost-analytics-feature-chart-3') {
            $scope.overallFeauture[3]=false;
        }
        else if(prod_id == 'cost-analytics-feature-chart-4') {
            $scope.overallFeauture[4]=false;
        }
        
        
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