lupaApp.controller('adminDashboardController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    var product_name = localStorageService.get("product_name");
    if (product_name == "" || product_name == "undefined" || product_name == null) {
        product_name = "LSDYNA"
    }
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    //
    $scope.reportSidebar = true;
    $scope.dashboardActive = true;
    $scope.favouriteActive = false;
    $scope.polarChartFlag = false;
    $scope.activeMenu = "LSDYNA";

    $scope.getLiveChart = function() {
        $scope.emptyChartMsg = "";
        $('#loadergif').show();
        lupaAdminDashboardService.getLiveChartUrl().then(function(response) {
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
    $scope.getLiveChart();
    $scope.getRecentReport = function() {
        $('#loadergiflast').show();
        lupaAdminDashboardService.getRecentReportUrl().then(function(response) {

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
            $scope.response = response.data;
            if ($scope.response.status_response) {
                var emptyResponseCheck = JSON.parse($scope.response.status_response);
                if (!emptyResponseCheck.success) {
                    $scope.showNoRecentSection = true;
                }
            }
            $scope.recentReportLength = $scope.response.length;


            //$scope.response = JSON.parse($scope.response);
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
                if ($scope.response[i].type == 'license_statistics') {
                    layout.yaxis.title = "Total number of license";


                } else if ($scope.response[i].type == 'time_statistics') {
                    layout.yaxis.title = "Total license used on hourly basis";

                }
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
                        var plotDataBarY = [];
                        var plotDataBarY = [{
                            values: $scope.chartresponse[0].value,
                            labels: $scope.chartresponse[0].label,
                            type: 'pie',
                            textinfo: 'none'
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
                         var layout = {
                        title: product_name +  ' / ' + $scope.response[i].report_type +  'Report',
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
                    if ($scope.response[i].type == 'license_statistics') {
                        //layout.yaxis.title = "Total number of license";
                        //debugger;		

                    }
                    else if ($scope.response[i].type == 'time_statistics') {
                        //layout.yaxis.title = "Total number of hours used";
                        //debugger;		
                    }
                        var plotDataBarY = [];
                        if ($scope.response[i].report_type == "yearly" || $scope.response[i].report_type == "monthly") {
                            var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        }
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
                        

                        //layout.xaxis.title = "Total number of license used";
                        //layout.yAxis.title = "";
                    }
                     else {
                        var plotDataBarY = [];
                        for (j = 0; j < $scope.chartresponse.length; j++) {
                            if ($scope.response[i].filter_year != null) {
                                var xVal = $scope.chartresponse[j].label;
                                var yVal = $scope.chartresponse[j].value;
                                var name = $scope.response[i].filter_year;
                            } else {
                                xVal = xAxisVal;
                                yVal = $scope.chartresponse[j].license;
                                var name = $scope.chartresponse[j].year
                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
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
                    
                    

                } else if ($scope.response[i].report_type == "this_week") {
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

                    } else {
                        if ($scope.response[i].chart_type == "horizontal_bar_chart") {
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
                                showlegend: true,
                                legend: {
                                    x: 1,
                                    y: 1
                                }
                            };
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
                    }

                    /*for (var j = 0; j < $scope.chartresponse[0].license.length; j++) {
                        //

                        for (key in $scope.chartresponse[0].license[j]) {
                            //

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




            $('#loadergiflast').hide();


        });
    }
    /*$scope.fiveMinuteData =  [{"product_name": "LSDYNA", "jobs" : [{"success" : 20},{"Jobs Qued" : 30}, {"Warning" : 20},{"Warning" : 30}]}];
    $scope.fiveMinuteDataProd = $scope.fiveMinuteData[0].product_name;
    $scope.fiveMinuteDataJobs = $scope.fiveMinuteData[0].jobs;*/

    // last 5 minutes
    $scope.getLastFiveMinutesReport = function(product_name) {
        // 
        $('#loadergif').show();
        lupaAdminDashboardService.getLastFiveMinutesReportUrl(product_name).then(function(response) {
            $scope.fiveMinuteDataJobs = response.data.jobs;
            $('#loadergif').hide();

            //
        });
    }
    $scope.getLastFiveMinutesReport("LSDYNA");
    // last 24 hours
    $scope.getTodayReport = function(product_name) {
        // 
        $('#loadergif').show();
        lupaAdminDashboardService.getTodayReportUrl(product_name).then(function(response) {
            $scope.todayDataJobs = response.data.jobs;
            $('#loadergif').hide();

            //
        });
    }
    $scope.getTodayReport("LSDYNA");
    $scope.getRecentReport();
    $scope.drawPolarChart = function(polarChartData, product) {
        var data2 = [{
            type: "scatterpolar",
            r: polarChartData.r,
            theta: polarChartData.theta,
            fill: "toself",
            subplot: "polar2",
            fillcolor: '#709BFF'
        }];
        
        //
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
            title: product + " / License used in Every Month"


        }

        Plotly.newPlot('saturation', data2, layout);

    }

    $scope.getSaturationReport = function(product) {
        $("#loadergif").show();
        lupaAdminDashboardService.getSaturationReportUrl(product).then(function(response) {
            $scope.drawPolarChart(response.data, product);
            $("#loadergif").hide();
            $scope.polarChartFlag = true;
            $(".saturation-cont").show();

        });

    }
    $scope.getLiveChartByProduct = function(item, e) {
        //$("#product").removeClass("in").prev("li").addClass("collapsed");
        $(".prod-nav").toggleClass('reportToggleFlag');
        $("#reports, #duration").slideDown();
        //$(e.target).closest(".navigation-links").find(".product-header").toggleClass("collapsed");
        localStorageService.set("product_name", item);
        $scope.activeMenu = item;
        $scope.reportSidebar = true;
        lupaAdminDashboardService.getLiveChartByProductUrl(item).then(function(response) {
            $scope.response = response.data;
            $scope.individualProductChart = true;
            if (!$scope.response.length) {
                $scope.noData = true;
                $("#chart").hide();

            } else {
                $scope.noData = false;
                $("#chart").show();
            }
            //$scope.getLiveChart();
            $('#loadergif').hide();
            //var seriesCounter = 0;
            $scope.seriesOptions = [],
                seriesCounter = 0;
            for (i = 0; i < $scope.response.length; i++) {
                //
                $scope.seriesOptions[i] = {
                    name: $scope.response[i].product_name,
                    data: $scope.response[i].values
                };
                //debugger
                seriesCounter += 1;

                if (seriesCounter === $scope.response.length) {
                    $scope.createChart();
                }
            }

            
        });
    }


    //

}]);