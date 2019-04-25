lupaApp.controller('userFavouriteController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', function($scope, userData, lupaUserDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.favouriteActive = true;
    $scope.dashboardActive = false;
    var weeklyArr = [];
    $scope.monthList = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
    $scope.getfavourite = function () {
        $('#loadergif').show();
        $("#loadergiflast").show();
        lupaUserDashboardService.getFavouriteUrl().then(function (response) {
            
            
            var plotDataBarY = [];


            var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


            var plotlyDefaultConfigurationBar = {
                responsive: true,
                displaylogo: false,
                showTips: true,
                pan2d: true,
                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
            };
            //$scope.reportyearlist = [{"year": 2016, "checked": false}, {"year": 2017, "checked": true}];
            var d3colors = Plotly.d3.scale.category10();
            $scope.response = JSON.parse(response.data.status_response).favourites_list;
            if($scope.response != undefined) {
                $scope.favouritelength = $scope.response.length;
                
            }
            else {
                $("#loadergif").hide();
                $("#loadergiflast").hide();
            }
            
            
            /*if ($scope.response.status_response) {
                var emptyResponseCheck = JSON.parse($scope.response.status_response);
                if (!emptyResponseCheck.success) {
                    $scope.showNoRecentSection = true;
                }
            }*/
            //$scope.recentReportLength = $scope.response.length;


            //$scope.response = JSON.parse($scope.response);
            setTimeout(function() {
                
                
                for (i = 0; i < $scope.response.length; i++) {
                var plotDataBarY = [];
                var layout = {
                    showlegend: true,
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
                        tickangle: -45,
                    },
                    yaxis: {
                        showgrid: true,
                        title: 'Total number of license',
                        showline: true
                    },
                    barmode: 'group',
                    bargroupgap: 0.5

                };
                var chartFavouriteIndex = i;
                
                
                if($scope.response[i].report_type == "yearly") {
                    var favouriteStatisticType = "";
                    if($scope.response[i].type == "license_statistics") {
                        favouriteStatisticType = "license";
                    }
                    else {
                        favouriteStatisticType = "time";
                    }
                    var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    if($scope.response[i].chart_type== "vertical_bar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "pie_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        //layout.title = $scope.chartresponse[0].productname + " / Yearly report";
                        var plotDataBarY = [{
                        values: $scope.chartresponse[0].value,
                        labels: $scope.chartresponse[0].label,
                        type: 'pie'
                        }];
                        layout.legend = {x:1, y:1};
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type== "line_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "area_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name : name,
                                    fill: 'tozeroy',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "horizontal_bar_chart") {
                        var layout = {
                        showlegend: true,
                        legend: {
                            "orientation": "h",
                            x: 0.58,
                            y: 1.1
                        },
                        yaxis: {
                            type: 'category',
                            showgrid: false,
                            gridcolor: '#bdbdbd',
                            tickangle: -45,
                        },
                        xaxis: {
                            showgrid: true,
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: yVal,
                                    y: xAxisVal,
                                    name : name,
                                    type: 'bar',
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "stacked_bar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "box_plot_styling_outliers_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'box',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "bubble_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    mode: 'markers',
                                    marker: {
                                        size: [5,10,15,20,25,30,35,40,45,50]
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "scatter_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            if($scope.chartresponse[0].hasOwnProperty("label")) {
                                xAxisVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            }
                            else {
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    mode: 'markers',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                            
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "polar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        var layout = {


                            polar2: {

                                radialaxis: {
                                    angle: 0,
                                    visible: true,
                                    tickfont: {
                                        size: 10,
                                        color: '#000'
                                    }
                                },
                                angularaxis: {
                                    visible: true,
                                    direction: "clockwise",
                                    tickfont: {
                                        size: 8,
                                        color: '#000'
                                    }
                                }
                            },
                            title: $scope.response[i].product_name + " / License used in Every Year"


                        }
                        
                            if($scope.chartresponse.hasOwnProperty("r")) {
                                    polarChartRenderData = $scope.chartresponse;
                                    key = $scope.response[i].filter_year; 
                                    plotDataBarY.push({
                                            type: "scatterpolar",
                                            name: "license used in " + key,
                                            r: polarChartRenderData.r,
                                            theta: polarChartRenderData.theta,
                                            fill: "toself",
                                            subplot: "polar2",
                                            fillcolor: '#709BFF'
                                    }) 
                                }
                                else {
                                    
                                    for (key in $scope.chartresponse) {
                                    polarChartRenderData = $scope.chartresponse[key];    
                                    plotDataBarY.push({
                                            type: "scatterpolar",
                                            name: "license used in " + key,
                                            r: polarChartRenderData.r,
                                            theta: polarChartRenderData.theta,
                                            fill: "toself",
                                            subplot: "polar2",
                                            fillcolor: '#709BFF'
                                        })
                                    }
                                }
                            
                            
                            
                            
                         
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    
                    

                    

                }
                if($scope.response[i].report_type == "monthly") {
                    var favouriteStatisticType = "";
                    if($scope.response[i].type == "license_statistics") {
                        favouriteStatisticType = "license";
                    }
                    else {
                        favouriteStatisticType = "time";
                    }
                    var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    if($scope.response[i].chart_type== "vertical_bar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "pie_chart") {
                        $scope.departmentList = [];
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        $scope.pieMonthlyFavouriteRespData = $scope.chartresponse;
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            $scope.departmentList.push($scope.chartresponse[j].department);
                        }
                        $scope.deptNamePieChart = $scope.departmentList[0];
                        name = $scope.monthList;
                        if($scope.chartresponse[0].hasOwnProperty("label")) {
                            val = $scope.chartresponse[0].value;
                        }
                        else {
                            val = $scope.chartresponse[0].license;
                        }
                        var plotDataBarY = [{
                                values: val,
                                labels: name,
                                type: 'pie'
                        }]
                        
                        
                        layout.legend = {x:1, y:1};
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type== "line_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "area_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name : name,
                                    fill: 'tozeroy',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "horizontal_bar_chart") {
                        var layout = {
                        showlegend: true,
                        legend: {
                            "orientation": "h",
                            x: 0.58,
                            y: 1.1
                        },
                        yaxis: {
                            type: 'category',
                            showgrid: false,
                            gridcolor: '#bdbdbd',
                            tickangle: -45,
                        },
                        xaxis: {
                            showgrid: true,
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: yVal,
                                    y: xAxisVal,
                                    name : name,
                                    type: 'bar',
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    
                    }
                    if($scope.response[i].chart_type== "stacked_bar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "box_plot_styling_outliers_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    type: 'box',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "bubble_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        layout.barmode = "stack";
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            if($scope.chartresponse[j].hasOwnProperty("department")) {
                                var name = $scope.chartresponse[j].department;
                            }
                            else if($scope.chartresponse[j].hasOwnProperty("username")) {
                                var name = $scope.chartresponse[j].username;
                            }
                            else {
                                var name = $scope.chartresponse[j].year;
                            }
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    mode: 'markers',
                                    marker: {
                                        size: [5,10,15,20,25,30,35,40,45,50]
                                    }
                            })
                            }
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "scatter_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        for(j=0;j<$scope.chartresponse.length;j++) {
                            yVal = $scope.chartresponse[j].license;
                            var name = $scope.chartresponse[j].year;
                            plotDataBarY.push({
                                    x: xAxisVal,
                                    y: yVal,
                                    name: name,
                                    mode: 'markers',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(j)
                                    }
                            })
                            }
                            
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    if($scope.response[i].chart_type== "polar_chart") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        plotDataBarY = [];
                        var layout = {


                            polar2: {

                                radialaxis: {
                                    angle: 0,
                                    visible: true,
                                    tickfont: {
                                        size: 10,
                                        color: '#000'
                                    }
                                },
                                angularaxis: {
                                    visible: true,
                                    direction: "clockwise",
                                    tickfont: {
                                        size: 8,
                                        color: '#000'
                                    }
                                }
                            },
                            title: $scope.response[i].product_name + " / License used in Every Month"


                        }
                        
                            for (key in $scope.chartresponse) {
                                polarChartRenderData = $scope.chartresponse[key];
                                plotDataBarY.push({
                                    type: "scatterpolar",
                                    name: "license used in " + key,
                                    r: polarChartRenderData.r,
                                    theta: polarChartRenderData.theta,
                                    fill: "toself",
                                    subplot: "polar2",
                                    fillcolor: '#709BFF'
                                })
                            }
                            
                            
                            
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.legend = {x: 1, y: 1};
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                        
                    }
                    
                    

                    

                }
                if($scope.response[i].report_type == "weekly") {
                    var favouriteStatisticType = "";
                    if($scope.response[i].type == "license_statistics") {
                        favouriteStatisticType = "license";
                    }
                    else {
                        favouriteStatisticType = "time";
                    }
                    var layout = {
                    showlegend: true,
                    legend: {
                        "orientation": "h",
                        x: 1,
                        y: 1
                    },
                    xaxis: {
                        type: 'category',
                        showgrid: false,
                        gridcolor: '#bdbdbd',
                        gridwidth: 1,
                        tickangle: -45,
                    },
                    yaxis: {
                        showgrid: true,
                        title: 'Total number of license',
                        showline: true
                    },
                    barmode: 'group',
                    bargroupgap: 0.5

                };
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    
                    
                    $scope.report_type = $scope.response[i].report_type;
                    if($scope.response[i].data != "") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                    }
                    var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
                    if($scope.response[i].chart_type == "vertical_bar_chart" || $scope.response[i].chart_type == "line_chart" || $scope.response[i].chart_type == "area_chart" || 
                        $scope.response[i].chart_type == "stacked_bar_chart") {
                        var fill = '';
                        var type = 'bar';
                        layout.barmode = '';
                         if ($scope.response[i].chart_type == 'line_chart') {
                            var type = 'scatter'
                        }
                        if ($scope.response[i].chart_type == 'area_chart') {
                            var type = 'scatter',
                                fill = 'tozeroy';
                        }
                        if ($scope.response[i].chart_type == 'stacked_bar_chart') {
                            layout.barmode = 'stack';
                        }
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: monthArray[k],
                                    type: type,
                                    fill: fill,
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })

                            }

                        }
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                        

                    }
                    if($scope.response[i].chart_type == "horizontal_bar_chart") {
                        var layout = {
                        showlegend: true,
                        legend: {
                            "orientation": "h",
                            x: 0.58,
                            y: 1.1
                        },
                        yaxis: {
                            type: 'category',
                            showgrid: false,
                            gridcolor: '#bdbdbd',
                            tickangle: -45,
                        },
                        xaxis: {
                            showgrid: true,
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                    
                        type = "bar";
                        fill = "";
                     $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: $scope.chartresponse[0].license[k][key],
                                    y: xAxisVal,
                                    name: monthArray[k],
                                    type: type,
                                    fill: fill,
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })

                            }

                        }
                        
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);

                    }
                    if($scope.response[i].chart_type == "box_plot_styling_outliers_chart") {
                        layout.barmode = "stack";
                        type = "box";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: monthArray[k],
                                    type: type,
                                    fill: fill,
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })

                            }

                        }
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "bubble_chart") {
                        layout.barmode = "group";
                        type = "";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                size = [];
                                size = $scope.bubbleSize($scope.chartresponse[0].license[k][key]);
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: monthArray[k],
                                    mode: 'markers',
                                    marker: {
                                        size: size
                                    }                                    
                                })

                            }

                        }
                        
                    layout.legend= {x: 1, y:1}
                        
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "scatter_chart") {
                        layout.barmode = "group";
                        type = "scatter";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: monthArray[k],
                                    type: type,
                                    mode: 'markers',
                                    marker: {
                                        color: d3colors(j)
                                    }
                                                                        
                                })

                            }

                        }
                        


                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    
                    if($scope.response[i].chart_type == "pie_chart") {
                        $scope.favouriteStatisticType = favouriteStatisticType;
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        $scope.pieChartFavouriteData = $scope.chartresponse[0].license;
                        localStorageService.set("userfavouriteweeklypie"  + $scope.response[i].product_name + $scope.response[i].type, $scope.pieChartFavouriteData);
                        $scope.chartresponse = $scope.chartresponse[0].license[0];
                        $scope.pieVal = $scope.chartresponse['january']; 
                        var plotDataBarY = [{
                            values: $scope.pieVal,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'label+text+value'
                        }];
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.legend = {x: 1, y: 1};
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "polar_chart") {
                        if($scope.response[i].data != ""){
                            $scope.chartresponse = JSON.parse($scope.response[i].data);
                            
                        }
                        else {
                            $scope.chartresponse = [{"license": [{"january":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"february":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"march":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,2]}},{"april":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"may":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"june":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"july":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"august":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"september":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"october":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"november":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"december":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}}]}]
                        }
                        
                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    type: "scatterpolar",
                                    name: monthArray[k],
                                    r: $scope.chartresponse[0].license[k][key].r,
                                    theta: $scope.chartresponse[0].license[k][key].theta,
                                    fill: "toself",
                                    subplot: "polar2",
                                    fillcolor: '#709BFF'
                                })


                            }


                        }
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.legend = {x: 1, y: 1};
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }
                    


                    
                }
                if($scope.response[i].report_type == "thisweek" || $scope.response[i].report_type == "this_week") {
                    $scope.chartresponse = JSON.parse($scope.response[i].data);
                     var favouriteStatisticType = "";
                    if($scope.response[i].type == "license_statistics") {
                        favouriteStatisticType = "license";
                    }
                    else {
                        favouriteStatisticType = "time";
                    }
                    var layout = {
                    showlegend: true,
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
                        tickangle: -45,
                    },
                    yaxis: {
                        showgrid: true,
                        title: 'Total number of license',
                        showline: true
                    },
                    barmode: 'group',
                    bargroupgap: 0.5

                };
                    if ($scope.response[i].type == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                                

                    } else if ($scope.response[i].type == 'time_statistics') {
                        layout.yaxis.title = "Total percentage utilized";
                                
                    }
                    
                    
                    $scope.report_type = $scope.response[i].report_type;
                    if($scope.response[i].data != "") {
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                    }
                    var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    if($scope.response[i].chart_type == "vertical_bar_chart" || $scope.response[i].chart_type == "line_chart" || $scope.response[i].chart_type == "area_chart" || 
                        $scope.response[i].chart_type == "stacked_bar_chart") {

                        var fill = '';
                        var type = 'bar';
                        layout.barmode = '';
                         if ($scope.response[i].chart_type == 'line_chart') {
                            var type = 'scatter'
                        }
                        if ($scope.response[i].chart_type == 'area_chart') {
                            var type = 'scatter',
                                fill = 'tozeroy';
                        }
                        if ($scope.response[i].chart_type == 'stacked_bar_chart') {
                            layout.barmode = 'stack';
                        }
                        $scope.chartresponse = JSON.parse($scope.response[i].data);

                        for (var k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: key,
                                    type: type,
                                    fill: fill,
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })
                            }
                        }
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.title = $scope.response[i].product_name + ' This Week / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);

                        
                    }
                    if($scope.response[i].chart_type == "horizontal_bar_chart") {
                        var layout = {
                        showlegend: true,
                        legend: {
                            "orientation": "h",
                            x: 0.58,
                            y: 1.1
                        },
                        yaxis: {
                            type: 'category',
                            showgrid: false,
                            gridcolor: '#bdbdbd',
                            tickangle: -45,
                        },
                        xaxis: {
                            showgrid: true,
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                    
                        type = "bar";
                        fill = "";
                     $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: $scope.chartresponse[0].license[k][key],
                                    y: xAxisVal,
                                    name: key,
                                    type: type,
                                    fill: fill,
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })

                            }

                        }
                        
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);

                    }
                    
                    if($scope.response[i].chart_type == "box_plot_styling_outliers_chart") {
                        layout.barmode = "stack";
                        type = "box";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: key,
                                    type: type,
                                    fill: fill,
                                    marker: {
                                        color: d3colors(k)
                                    }
                                })

                            }

                        }
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "bubble_chart") {
                        layout.barmode = "group";
                        type = "";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: key,
                                    mode: 'markers',
                                    marker: {
                                        size: [10, 20, 30, 40, 50]
                                    }                                    
                                })

                            }

                        }
                        
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "scatter_chart") {
                        layout.barmode = "group";
                        type = "scatter";
                        fill = "";
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        for (k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: key,
                                    type: type,
                                    mode: 'markers',
                                    marker: {
                                        color: d3colors(k)
                                    }
                                                                        
                                })

                            }

                        }


                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                    }
                    
                    if($scope.response[i].chart_type == "pie_chart") {
                        $scope.favouriteStatisticType = favouriteStatisticType;
                        $scope.chartresponse = JSON.parse($scope.response[i].data);
                        $scope.pieChartFavouriteData = $scope.chartresponse[0].license;
                        localStorageService.set("userfavouriteweeklypie"  + $scope.response[i].product_name + $scope.response[i].type, $scope.pieChartFavouriteData);
                        $scope.chartresponse = $scope.chartresponse[0].license[0];
                        $scope.pieVal = $scope.chartresponse['morning']; 
                        var plotDataBarY = [{
                            values: $scope.pieVal,
                            labels: xAxisVal,
                            type: 'pie',
                            textinfo: 'label+text+value'
                        }];
                        
                        
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.legend = {x: 1, y: 1};
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }
                    if($scope.response[i].chart_type == "polar_chart") {
                        if($scope.response[i].data != ""){
                            $scope.chartresponse = JSON.parse($scope.response[i].data);
                            
                        }
                        else {
                            $scope.chartresponse = [{"license": [{"january":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"february":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"march":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,2]}},{"april":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"may":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"june":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"july":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"august":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"september":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"october":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"november":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}},{"december":{"r":[0,0,0,0,0],"theta":["1st week","2nd week","3rd week","4th week","5th week"],"range":[0,0]}}]}]
                        }
                        
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        console.log($scope.chartresponse);
                        plotDataBarY.push({
                                    type: "scatterpolar",
                                    name: "This week",
                                    r: $scope.chartresponse.r,
                                    theta: xAxisVal,
                                    fill: "toself",
                                    subplot: "polar2",
                                    fillcolor: '#709BFF'
                                })
                                


                            
                        $(".chart-render-" + chartFavouriteIndex).show();
                        layout.legend = {x: 1, y: 1};
                        layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type +  ' / ' + favouriteStatisticType +' report';
                        Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                        var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                        Plotly.Plots.resize(gd1);
                    }


                }
                
               


            }
            //console.log("weekly array", weeklyArr);
            $('#loadergif').hide();
            
            
            },2000);
            
            setTimeout(function() {
                $("#loadergiflast").hide();
                $('#loadergif').hide();
            }, 4000)
            





        });
    
    }
    

    /*$scope.getfavourite = function() {
        $('#loadergif').show();
        lupaUserDashboardService.getFavouriteUrl().then(function(response) {

            var plotDataBarY = [];


            var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


            var plotlyDefaultConfigurationBar = {
                responsive: true,
                displaylogo: false,
                showTips: true,
                pan2d: true,
                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
            };
            var d3colors = Plotly.d3.scale.category10();
            //$scope.response = response.data;
            $scope.response = JSON.parse(response.data.status_response);
            if ($scope.response.success) {
                $scope.response = $scope.response.favourites_list;
                $scope.favouritelength = $scope.response.length;
                if ($scope.response.status_response) {
                    var emptyResponseCheck = JSON.parse($scope.response.status_response);
                    if (!emptyResponseCheck.success) {
                        $scope.showNoRecentSection = true;
                    }
                }
                
                setTimeout(function() {
                    for (i = 0; i < $scope.response.length; i++) {
                        var layout = {
                            showlegend: true,
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
                                tickangle: -45,
                            },
                            yaxis: {
                                showgrid: true,
                                title: 'Total number of license',
                                showline: true
                            },
                            barmode: 'group',
                            bargroupgap: 0.5

                        };
                        var chartFavouriteIndex = i;
                        plotDataBarY = [];
                        if ($scope.response[i].report_type == 'weekly') {
                            $scope.chartresponse = JSON.parse($scope.response[i].data);
                            layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type + ' / report'
                            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
                            for (j = 0; j < $scope.chartresponse[0].license.length; j++) {
                                for (key in $scope.chartresponse[0].license[j]) {
                                    plotDataBarY.push({
                                        x: xAxisVal,
                                        y: $scope.chartresponse[0].license[j][key],
                                        name: key,
                                        type: 'bar',
                                        marker: {
                                            color: d3colors(j)
                                        }
                                    })

                                }

                            }
                            $(".chart-render-" + chartFavouriteIndex).show();
                            Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                            var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                            Plotly.Plots.resize(gd1);
                        } else if ($scope.response[i].report_type == "yearly" || $scope.response[i].report_type == "monthly") {
                            var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            var type = 'bar';
                            var fill = '';
                            var mode = "";
                            $scope.chartresponse = JSON.parse($scope.response[i].data);

                            if ($scope.response[i].chart_type == "vertical_bar_chart") {
                                var type = 'bar'
                            } else if ($scope.response[i].chart_type == "line_chart") {
                                var type = "scatter";
                            } else if ($scope.response[i].chart_type == "area_chart") {
                                var type = 'scatter',
                                    fill = 'tozeroy';
                            } else if ($scope.response[i].chart_type == "stacked_bar_chart") {
                                layout.barmode = 'stack';
                            } else if ($scope.response[i].chart_type == 'scatter_chart') {
                                var type = 'scatter',
                                    mode = 'markers';
                            }
                            if ($scope.response[i].chart_type == 'polar_chart') {
                                polarChartData = $scope.chartresponse;
                                for (key in polarChartData) {
                                    polarChartRenderData = polarChartData[key];
                                    plotDataBarY.push({
                                        type: "scatterpolar",
                                        name: "license used in " + key,
                                        r: polarChartRenderData.r,
                                        theta: polarChartRenderData.theta,
                                        fill: "toself",
                                        subplot: "polar2",
                                        fillcolor: '#709BFF'
                                    })
                                }

                            }



                            

                            if ($scope.response[i].chart_type == "box_plot_styling_outliers_chart") {
                                layout.barmode = 'stack';
                                var plotDataBarY = [];
                                for (j = 0; j < $scope.chartresponse.length; j++) {
                                    plotDataBarY.push({
                                        y: $scope.chartresponse[j].license,
                                        type: 'box',
                                        name: $scope.chartresponse[j].year
                                    })
                                }

                            }
                            if ($scope.response[i].chart_type == "bubble_chart") {
                                var plotDataBarY = [];
                                var size = [];
                                var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                                for (j = 0; j < $scope.chartresponse.length; j++) {
                                    for (k = 0; k < $scope.chartresponse[j].license.length; k++) {
                                        console.log($scope.chartresponse[j].license[k]);
                                        if ($scope.chartresponse[j].license[j] > 10) {
                                            size.push($scope.chartresponse[j].license[k] / 7)
                                        } else {
                                            size.push($scope.chartresponse[j].license[k]);

                                        }
                                    }

                                    plotDataBarY.push({
                                        x: xAxisVal,
                                        y: $scope.chartresponse[j].license,
                                        mode: 'markers',
                                        marker: {
                                            size: size
                                        },
                                        name: $scope.chartresponse[j].year
                                    });

                                }

                            }
                            if ($scope.response[i].chart_type == "pie_chart") {
                                var plotDataBarY = [{
                                    values: $scope.chartresponse[0].value,
                                    labels: $scope.chartresponse[0].label,
                                    type: 'pie',
                                    textinfo: 'label+text+value'
                                }];
                                var layout = {
                                    showlegend: true,
                                    legend: {
                                        x: 1,
                                        y: 1
                                    }
                                };
                            }
                            if ($scope.response[i].chart_type == "horizontal_bar_chart") {
                                var type = 'bar';
                                plotDataBarY = [];
                                for (j = 0; j < $scope.chartresponse.length; j++) {
                                    plotDataBarY.push({
                                        x: $scope.chartresponse[j].license,
                                        y: xAxisVal,
                                        name: $scope.chartresponse[j].year,
                                        type: 'bar',
                                        orientation: 'h',
                                        marker: {
                                            color: d3colors(j)
                                        }
                                    })


                                }
                                
                            } else {
                                for (j = 0; j < $scope.chartresponse.length; j++) {
                                    plotDataBarY.push({
                                        x: xAxisVal,
                                        y: $scope.chartresponse[j].license,
                                        name: $scope.chartresponse[j].year,
                                        type: type,
                                        fill: fill,
                                        mode: mode,
                                        marker: {
                                            color: d3colors(j)
                                        }
                                    })
                                }
                            }



                            $(".chart-render-" + chartFavouriteIndex).show();
                            layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type + ' / report';
                            Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                            var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                            Plotly.Plots.resize(gd1);

                        }
                        if ($scope.response[i].report_type == "this_week") {
                            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                            var plotDataBarY = [];
                            layout.title = $scope.response[i].product_name + ' ' + 'This Week' + ' / report';
                            var type = 'bar';
                            var fill = '';
                            var mode = "";
                            $scope.chartresponse = JSON.parse($scope.response[i].data);

                            if ($scope.response[i].chart_type == "vertical_bar_chart") {
                                var type = 'bar'
                            } else if ($scope.response[i].chart_type == "line_chart") {
                                var type = "scatter";
                            } else if ($scope.response[i].chart_type == "area_chart") {
                                var type = 'scatter',
                                    fill = 'tozeroy';
                            } else if ($scope.response[i].chart_type == "stacked_bar_chart") {
                                layout.barmode = 'stack';
                            } else if ($scope.response[i].chart_type == 'scatter_chart') {
                                var type = 'scatter',
                                    mode = 'markers';
                            }
                            if ($scope.response[i].chart_type == 'polar_chart') {
                                polarChartData = $scope.chartresponse;
                                for (key in polarChartData) {
                                    polarChartRenderData = polarChartData[key];
                                    plotDataBarY.push({
                                        type: "scatterpolar",
                                        name: "license used in " + key,
                                        r: polarChartRenderData.r,
                                        theta: polarChartRenderData.theta,
                                        fill: "toself",
                                        subplot: "polar2",
                                        fillcolor: '#709BFF'
                                    })
                                }

                            }




                            if ($scope.response[i].chart_type == "pie_chart") {
                                var plotDataBarY = [{
                                    values: $scope.chartresponse[0].value,
                                    labels: $scope.chartresponse[0].label,
                                    type: 'pie',
                                    textinfo: 'label+text+value'
                                }];
                                var layout = {
                                    showlegend: true,
                                    legend: {
                                        x: 1,
                                        y: 1
                                    }
                                };
                            }
                            if($scope.response[i].chart_type == "horizontal_bar_chart") {
                            var type = 'bar';
                            for (var j = 0; j < $scope.chartresponse[0].license.length; j++) {
                                    for (key in $scope.chartresponse[0].license[j]) {
                                        plotDataBarY.push({
                                            x: xAxisVal,
                                            y: $scope.chartresponse[0].license[j][key],
                                            name: key,
                                            type: 'bar',
                                            marker: {
                                                color: d3colors(j)
                                            }
                                        })
                                    }
                                }
                            //layout.xaxis.title = "Total number of license used";
                            //layout.yAxis.title = "";
                            } else {
                                for (var j = 0; j < $scope.chartresponse[0].license.length; j++) {
                                    for (key in $scope.chartresponse[0].license[j]) {
                                        plotDataBarY.push({
                                            x: xAxisVal,
                                            y: $scope.chartresponse[0].license[j][key],
                                            name: key,
                                            type: 'bar',
                                            marker: {
                                                color: d3colors(j)
                                            }
                                        })
                                    }
                                }
                            }


                            
                            $(".chart-render-" + chartFavouriteIndex).show();
                            Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                            var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                            Plotly.Plots.resize(gd1);
                        }




                    }

                }, 2000)
            } else {
                $('#loadergif').hide();
            }



            $('#loadergif').hide();




        });
    }*/
    $scope.getfavourite();
    $scope.changeMonthData = function(event, monthNamePieChart, product_name, statisticsType) {
        $scope.pieChartFavouriteData = localStorageService.get("userfavouriteweeklypie"+product_name+statisticsType);
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-fav-id").attr('id');
        $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
        $scope.defaultPieLicenseData = $scope.pieChartFavouriteData;
        for(i = 0; i<$scope.defaultPieLicenseData.length; i++) {
            if(Object.keys($scope.defaultPieLicenseData[i])[0] == monthNamePieChart) {
                var val = $scope.defaultPieLicenseData[i][monthNamePieChart];
                var plotDataBarY = [{
                            values: val,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'label+text+value'
                }];
                
                
                
            }
        }
         
         var plotlyDefaultConfigurationBar = {
                responsive: true,
                displaylogo: false,
                showTips: true,
                pan2d: true,
                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
        };
        layout = {};
        layout.title = product_name + ' weekly / ' + $scope.favouriteStatisticType +' report';
        //layout.title = product_name + ' weekl / ' + $scope.favouriteStatisticType +' report';
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
    }
    $scope.getLiveChartByProduct = function(item, e) {
        localStorageService.set("product_name", item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
    $scope.bubbleSize = function(bubbleData) {
        size = [];
        for(k=0; k < bubbleData.length; k++) {
            if(bubbleData[k] < 10) {
                size.push(bubbleData[k]*5)
            }
            else if(bubbleData[k] >= 10 && bubbleData[k] < 50) {
                size.push(bubbleData[k])
            }
            else if(bubbleData[k] >= 50 && bubbleData[k] < 100) {
                size.push(bubbleData[k] / 2)
            }
            else if(bubbleData[k] >= 100 && bubbleData[k] < 200) {
                size.push(bubbleData[k]/3)
            }
            else if(bubbleData[k] >= 200 && bubbleData[k] < 500) {
                size.push(bubbleData[k]/5)
            }
            else if(bubbleData[k] >= 500 && bubbleData[k] < 1000) {
                size.push(bubbleData[k]/10)
            }
            else if(bubbleData[k] >= 1000 && bubbleData[k] < 3000) {
                size.push(bubbleData[k]/50)
            }
            else {
                size.push(bubbleData[k]/100)
            }
            
        }
        return size;
    }
    $scope.deleteFavourite = function(e) {
        $('#loadergif').show();
        var id = parseInt($(e.target).closest("a").attr('data-attr'));
        lupaUserDashboardService.deleteFavouriteUrl(id).then(function (response) {
            $('#loadergif').hide();
        });
        $scope.removeReport(e);
    }
}]);