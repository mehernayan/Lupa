lupaApp.controller('userDashboardController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService','$timeout', function ($scope, userData, lupaUserDashboardService, $location, localStorageService,$timeout) {
    var userId = localStorageService.get("user");
    var product_name = localStorageService.get("product_name");
    if(product_name == "" || product_name == "undefined" || product_name == null) {
        product_name = "LSDYNA"
    }
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }

    $scope.productlist = localStorageService.get('productlist');
    //$scope.productlist = ["LSDYNA", "MSC", "ALTAIR"]

    $scope.reportSidebar = true;
    $scope.activeMenu = "LSDYNA";
    $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
    
    $scope.dashboardActive = true;
    $scope.favouriteActive = false;
    $scope.polarChartFlag = false;
    $scope.arrayItem = 0;
    $scope.noData = false;
    
    $scope.getLiveChart = function() {
        $scope.emptyChartMsg = "";
        $('#loadergif').show();
        lupaUserDashboardService.getLiveChartUrl().then(function(response) {
            /*$scope.response = [{"product_name":"LSDYNA","values":[[1553742001,600000],[1553743800,600000],[1553748060,20],[1553749201,1200000],[1553749201,1200000],[1553749202,1200000],[1553749261,1200000],[1553749321,1200000],[1553749321,1200000],[1553749381,1200000],[1553749441,20],[1553756401,20],[1553760001,20],[1553763601,20],[1553767201,20],[1553769608,20],[1553770801,20],[1553778001,1200000],[1553785201,1200000],[1553792401,20],[1553796001,20]]},{"product_name":"BETA_CAE","values":[[1553749321,300000],[1553749441,5],[1553749501,5],[1553757601,300000],[1553774401,300000]]},{"product_name":"MSC","values":[[1553749321,10],[1553749381,10],[1553763601,10],[1553767201,10],[1553769608,600000],[1553773208,600000],[1553776808,600000],[1553780408,600000],[1553784008,600000]]}];

            $scope.productlistresponse = [{"product_name":"LSDYNA","values":[[1553742001,600000],[1553743800,600000],[1553748060,20],[1553749201,1200000],[1553749201,1200000],[1553749202,1200000],[1553749261,1200000],[1553749321,1200000],[1553749321,1200000],[1553749381,1200000],[1553749441,20],[1553756401,20],[1553760001,20],[1553763601,20],[1553767201,20],[1553769608,20],[1553770801,20],[1553778001,1200000],[1553785201,1200000],[1553792401,20],[1553796001,20]]},{"product_name":"BETA_CAE","values":[[1553749321,300000],[1553749441,5],[1553749501,5],[1553757601,300000],[1553774401,300000]]},{"product_name":"MSC","values":[[1553749321,10],[1553749381,10],[1553763601,10],[1553767201,10],[1553769608,600000],[1553773208,600000],[1553776808,600000],[1553780408,600000],[1553784008,600000]]}];*/
            $scope.response = response.data;
            $scope.productlistresponse = response.data;
            $scope.productListDashboard = [];
            if (!$scope.productlistresponse.length) {
                $scope.noData = true;
                $("#chart").hide();

            } else {
                $scope.noData = false;
                $("#chart").show();
            }
            if (typeof $scope.productlistresponse !== "undefined" && $scope.productlistresponse.length) {
                $scope.emptyChartMsg = "";
                for (i = 0; i < $scope.response.length; i++) {
                    //
                    $scope.productListDashboard.push({
                        "product_name": $scope.response[i].product_name,
                        "value": true
                    })
                    

                }
                


                $scope.seriesOptions = [],
                    seriesCounter = 0;

                
                    $scope.seriesOptions = [];
                for (i = 0; i < $scope.response.length; i++) {

                    $scope.seriesOptions[i] = {
                        name: $scope.response[i].product_name,
                        data: $scope.response[i].values
                    };
                    seriesCounter += 1;

                    if (seriesCounter === $scope.response.length) {
                        $scope.createChart();
                    }
                }
            } else {
                $scope.emptyChartMsg = "No live chart available."
            }
        });
    }
    $scope.createChart = function() {

                    
                    Highcharts.stockChart('chart', {

                        rangeSelector: {
                            inputEnabled: false,
                            labelStyle: {
                                visibility: 'hidden'
                            },
                            buttons: [{
                                type: 'all',
                                text: 'All'
                            }]
                            
                        },
                        title: {
                            text: 'Real Time Utilization'
                        },

                        yAxis: {
                            labels: {
                                
                                

                            },
                            plotLines: [{
                                value: 0,
                                width: 2,
                                color: 'silver'
                            }]
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },

                        plotOptions: {
                            series: {
                                showInNavigator: false
                            }
                        },

                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                            valueDecimals: 2,
                            split: true
                        },

                        series: $scope.seriesOptions
                    });
                }
    
    $scope.getLiveChart();
    $scope.changeProductDashboard = function(item, productlist) {
                    $scope.seriesOptions = [],
                    seriesCounter = 0;
                    //
                    var filteredResponse = [];
                    for (i = 0; i < productlist.length; i++) {
                        if (productlist[i].value == true && productlist[i].product_name == $scope.productlistresponse[i].product_name) {
                            filteredResponse.push($scope.productlistresponse[i]);
                            //
                        }


                    }
                    $scope.response = filteredResponse;
                    
                    
                    if($scope.response.length == 0) {
                         $scope.seriesOptions = [];
                         $scope.createChart();

                    }
                    for (k = 0; k < $scope.response.length; k++) {
                        
                        $scope.seriesOptions[k] = {
                            name: $scope.response[k].product_name,
                            data: $scope.response[k].values
                        };
                        seriesCounter += 1;
                        
                        if (seriesCounter === $scope.response.length) {
                            
                        }
                    }
                    $scope.createChart();

        }
    
    
    $scope.getRecentReport = function () {
        $('#loadergif').show();
        $("#loadergiflast").show();
        lupaUserDashboardService.getRecentReportUrl().then(function (response) {
            
            
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
            $scope.response = response.data;
            
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
                    layout.title = $scope.chartresponse[0].productname +  ' Yearly / report';
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
                                        color: d3colors(i)
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
                        $scope.chartresponse = $scope.chartresponse[0].license[0];
                        $scope.pieVal = $scope.chartresponse['january']; 
                        var plotDataBarY = [{
                            values: $scope.pieVal,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'none'
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
                        
                            for (var k = 0; k < $scope.chartresponse[0].license.length; k++) {
                            for (key in $scope.chartresponse[0].license[k]) {
                                plotDataBarY.push({
                                    type: "scatterpolar",
                                    name: key,
                                    r: $scope.chartresponse[0].license[k][key].r,
                                    theta: xAxisVal,
                                    fill: "toself",
                                    subplot: "polar2",
                                    fillcolor: '#709BFF'
                                })


                            }


                        }
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
                            title: product_name + " / License used in Every Month"


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
                                        color: d3colors(i)
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
                        $scope.chartresponse = $scope.chartresponse[0].license[0];
                        $scope.pieVal = $scope.chartresponse['morning']; 
                        var plotDataBarY = [{
                            values: $scope.pieVal,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'none'
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
            }, 3000)
            





        });
    
    }

    // last 5 minutes
    $scope.getLastFiveMinutesReport = function (product_name) {
        // debugger;
        $('#loadergif').show();
        lupaUserDashboardService.getLastFiveMinutesReportUrl(product_name).then(function (response) {
            $scope.fiveMinuteDataJobs = response.data.jobs;
            $('#loadergif').hide();
            //debugger;
        });
    }
    $scope.getLastFiveMinutesReport("LSDYNA");
    // last 24 hours
    $scope.getTodayReport = function (product_name) {
        // debugger;
        $('#loadergif').show();
        lupaUserDashboardService.getTodayReportUrl(product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.todayDataJobs = response.data.jobs
            //debugger;
        });
    }
    $scope.getTodayReport("LSDYNA");
    $scope.getRecentReport();


$scope.drawPolarChart = function(polarChartData, product) {
        var data2 = [
        {
            type: "scatterpolar",
            name: "license used in Every 30 minutes",
            r: polarChartData.r,
            theta: polarChartData.theta,
            fill: "toself",
            subplot: "polar2",
            fillcolor: '#709BFF'
        }
    ];
    //debugger;
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
        title: product + " / License used in Every 30 minutes interval"


    }

    Plotly.newPlot('saturation', data2, layout);
    
    }
    
    $scope.getSaturationReport = function(product) {
        $("#loadergif").show();
        lupaUserDashboardService.getSaturationReportUrl(product).then(function (response) {
        $scope.drawPolarChart(response.data, product);
        $("#loadergif").hide();
        $scope.polarChartFlag = true;
        $(".saturation-cont").show();
        
        });

    }
    
    $scope.getLiveChartByProduct = function (item,e) {
        //$("#product").removeClass("in").prev("li").addClass("collapsed");
        $(".prod-nav").toggleClass('reportToggleFlag');
        $("#reports, #duration").slideDown();
        //$(e.target).closest(".navigation-links").find(".product-header").toggleClass("collapsed");
        $scope.activeMenu = item;
        localStorageService.set("product_name",item);
        lupaUserDashboardService.getLiveChartByProductUrl(item).then(function (response) {
            $scope.response = response.data;
            $scope.individualProductChart = true;
            if(!$scope.response.length) {
                $scope.noData = true;
                $("#chart").hide();

            }
            else {
                $scope.noData = false;
                $("#chart").show();
            }
            
           

            //$scope.getLiveChart();
            $('#loadergif').hide();
            //var seriesCounter = 0;
            var seriesOptions = [],
                seriesCounter = 0;
            for (i = 0; i < $scope.response.length; i++) {
                //debugger;
                seriesOptions[i] = {
                    name: $scope.response[i].product_name,
                    data: $scope.response[i].values
                };
                //debugger
                seriesCounter += 1;

                if (seriesCounter === $scope.response.length) {
                    createChart();
                }
            }
            function createChart() {

                Highcharts.stockChart('chart', {

                     rangeSelector: {
                        inputEnabled: false,
                        labelStyle: {
                            visibility: 'hidden'
                        },
                        buttons: [{
                            type: 'all',
                            text: 'All'
                        }]
                    },
                    title: {
                        text: 'Real Time Utilization'
                    },

                    yAxis: {
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },



                    series: seriesOptions
                });
            }
        });
    }

}]);