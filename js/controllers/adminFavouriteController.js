lupaApp.controller('adminFavouriteController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.favouriteActive = true;
    $scope.dashboardActive = false;

    var d3colors = Plotly.d3.scale.category10();
    var weeklyArr = [];
    $scope.monthList = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
    $scope.getfavourite = function () {
        $('#loadergif').show();
        $("#loadergiflast").show();
        lupaAdminDashboardService.getFavouriteUrl().then(function (response) {
            
            
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
                        favouriteStatisticType = "percentage";
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
                    layout.title = $scope.response[i].product_name +  ' Yearly / report';
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
                        favouriteStatisticType = "percentage";
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
                        
                            
                                polarChartRenderData = $scope.chartresponse;
                                plotDataBarY.push({
                                    type: "scatterpolar",
                                    name: "This month",
                                    r: polarChartRenderData.r,
                                    theta: polarChartRenderData.theta,
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
                if($scope.response[i].report_type == "weekly") {
                    var favouriteStatisticType = "";
                    if($scope.response[i].type == "license_statistics") {
                        favouriteStatisticType = "license";
                    }
                    else {
                        favouriteStatisticType = "percentage";
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
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.chartresponse[0].license[k][key],
                                    name: monthArray[k],
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
                                    name: monthArray[k],
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
                        localStorageService.set("adminfavouriteweeklypie" + $scope.response[i].filter_department + $scope.response[i].product_name + $scope.response[i].type, $scope.pieChartFavouriteData);
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
                        favouriteStatisticType = "percentage";
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
                         localStorageService.set("adminfavouriteweeklypie" + $scope.response[i].filter_department + $scope.response[i].product_name + $scope.response[i].type, $scope.pieChartFavouriteData);
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
            console.log("weekly array", weeklyArr);
            $('#loadergif').hide();
            
            
            },2000);
            
            setTimeout(function() {
                $("#loadergiflast").hide();
            }, 7000)
            





        });
    
    }
    $scope.changeDeptMonthData = function(event, deptNamePieChart, product_name) {
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-fav-id").attr('id');
        $scope.pieMonthlyFavouriteData = $scope.pieMonthlyFavouriteRespData;
        for(k =0; k<$scope.pieMonthlyFavouriteData.length; k++) {
            if($scope.pieMonthlyFavouriteData[k].department == deptNamePieChart) {
                var val = $scope.pieMonthlyFavouriteData[k].license;
                var plotDataBarY = [{
                            values: val,
                            labels: $scope.monthList,
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
        layout.title = product_name + ' monthly / ' + $scope.favouriteStatisticType +' report';
        //layout.title = product_name + ' weekl / ' + $scope.favouriteStatisticType +' report';
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    }
    $scope.changeMonthData = function(event, monthNamePieChart, product_name, statisticsType, cat) {
        $scope.pieChartFavouriteData = localStorageService.get("adminfavouriteweeklypie"+cat+product_name+statisticsType);
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
        layout.title = product_name + ' monthly / ' + $scope.favouriteStatisticType +' report';
        //layout.title = product_name + ' weekl / ' + $scope.favouriteStatisticType +' report';
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, {}, plotlyDefaultConfigurationBar);
    }
    $scope.getLiveChartByProduct = function(item, e) {
        localStorageService.set("product_name", item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
    $scope.getfavourite();
    $scope.deleteFavourite = function(e) {
        $('#loadergif').show();
        var id = parseInt($(e.target).closest("a").attr('data-attr'));
        lupaAdminDashboardService.deleteFavouriteUrl(id).then(function (response) {
            $('#loadergif').hide();
        });
        $scope.removeReport(e);
    }

}]);