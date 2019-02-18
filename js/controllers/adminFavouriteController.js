lupaApp.controller('adminFavouriteController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.favouriteActive = true;
    $scope.dashboardActive = false;
   
    


$scope.getfavourite = function () {

        
        $('#loadergif').show();
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
            var d3colors = Plotly.d3.scale.category10();
            //$scope.response = response.data;
            $scope.response = JSON.parse(response.data.status_response);
            $scope.response = $scope.response.favourites_list;
            $scope.favouritelength = $scope.response.length;
            if ($scope.response.status_response) {
                var emptyResponseCheck = JSON.parse($scope.response.status_response);
                if (!emptyResponseCheck.success) {
                    $scope.showNoRecentSection = true;
                }
            }
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
                }
                else if ($scope.response[i].report_type == "yearly" || $scope.response[i].report_type == "monthly") {
                    var type = 'bar';
                    var fill = '';
                    var mode = "";
                    $scope.chartresponse = JSON.parse($scope.response[i].data);
                    
                    if ($scope.response[i].chart_type == "vertical_bar_chart") {
                        var type = 'bar'
                    }
                    
                    
                    else if ($scope.response[i].chart_type == "line_chart") {
                        var type = "scatter";
                    }
                    else if ($scope.response[i].chart_type == "area_chart") {
                        var type = 'scatter',
                            fill = 'tozeroy';
                    }
                    else if ($scope.response[i].chart_type == "stacked_bar_chart") {
                        layout.barmode = 'stack';
                    }
                    else if ($scope.response[i].chart_type == 'scatter_chart') {
                        var type = 'scatter',
                        mode= 'markers';
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
                    
                    
                    else {
                        if($scope.response[i].chart_type == "horizontal_bar_chart") {
                            var type = 'bar';
                            for (j = 0; j < $scope.chartresponse.length; j++) {
                            plotDataBarY.push({
                                x: $scope.chartresponse[j].license,
                                y: xAxisVal,
                                name: $scope.chartresponse[j].year,
                                type: type,
                                orientation: 'h',
                                marker: {
                                    color: d3colors(j)
                                }
                            })
                        }
                        //layout.xaxis.title = "Total number of license used";
                        //layout.yAxis.title = "";
                        }
                        if ($scope.response[i].chart_type == "pie_chart") {
                            var plotDataBarY = [{
                            values: $scope.chartresponse[0].value,
                            labels: $scope.chartresponse[0].label,
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
                        else {
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
                    }

                    
                    $(".chart-render-" + chartFavouriteIndex).show();
                    layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type + ' / report';
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);

                }
                else if ($scope.response[i].report_type == "this_week") {
                    var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    var plotDataBarY = [];
                    layout.title = $scope.response[i].product_name + ' ' + 'This Week' + ' / report';
                    var type = 'bar';
                    var fill = '';
                    var mode = "";
                    $scope.chartresponse = JSON.parse($scope.response[i].data);
                    
                    if ($scope.response[i].chart_type == "vertical_bar_chart") {
                        var type = 'bar'
                    }
                    
                    
                    else if ($scope.response[i].chart_type == "line_chart") {
                        var type = "scatter";
                    }
                    else if ($scope.response[i].chart_type == "area_chart") {
                        var type = 'scatter',
                            fill = 'tozeroy';
                    }
                    else if ($scope.response[i].chart_type == "stacked_bar_chart") {
                        layout.barmode = 'stack';
                    }
                    else if ($scope.response[i].chart_type == 'scatter_chart') {
                        var type = 'scatter',
                        mode= 'markers';
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
                    
                    
                    else {
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
                        }
                        if ($scope.response[i].chart_type == "pie_chart") {
                            var plotDataBarY = [{
                            values: $scope.chartresponse[0].value,
                            labels: $scope.chartresponse[0].label,
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
                        else {
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
                    }

                    /*for (var j = 0; j < $scope.chartresponse[0].license.length; j++) {
                        //debugger;

                        for (key in $scope.chartresponse[0].license[j]) {
                            //debugger;

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
                    }*/
                    $(".chart-render-" + chartFavouriteIndex).show();
                    Plotly.newPlot('product-chart-yearly' + chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly" + chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                }







            }

            $('#loadergif').hide();
            
            });
    
    
    }
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
    $scope.getfavourite();
}]);