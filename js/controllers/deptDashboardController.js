lupaApp.controller('deptDashboardController', ['$scope', 'userData', 'lupaDeptDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaDeptDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = true;
    $scope.favouriteActive = false;
    $scope.polarChartFlag = false;
    $scope.productlist = localStorageService.get('productlist');
    $scope.selected = {};
    $scope.loadDashboardLiveChart = function(){
        $scope.productlistresponse = $.grep($scope.productlistresponse, function( item ) {
        return $scope.selected[ item.product_name ];
      });
        
    };
    
    $scope.getLiveChart = function () {
        $('#loadergif').show();
        lupaDeptDashboardService.getLiveChartUrl().then(function (response) {
            $scope.response = response.data;
            $scope.productlistresponse = response.data;
            $scope.productListDashboard = [];
            for (i = 0; i < $scope.response.length; i++) {
                //debugger;
                $scope.productListDashboard.push({
                    "product_name": $scope.response[i].product_name,
                    "value": true
                })
                //debugger;
            }
            $scope.changeProductDashboard = function (item, productlist) {
                console.log($scope.response);
                //debugger;
                var filteredResponse = [];
                for (i = 0; i < productlist.length; i++) {
                    if (productlist[i].value == true && productlist[i].product_name == $scope.productlistresponse[i].product_name) {
                        filteredResponse.push($scope.productlistresponse[i]);
                        //debugger;
                    }


                }
                $scope.response = filteredResponse;
                var seriesCounter = 0;
                for (i = 0; i < $scope.response.length; i++) {
                    //debugger;
                    seriesOptions[i] = {
                        name: $scope.response[i].product_name,
                        data: $scope.response[i].values
                    };
                    seriesCounter += 1;

                    if (seriesCounter === $scope.response.length) {
                        createChart();
                    }
                }

            }


            var seriesOptions = [],
                seriesCounter = 0;

            function createChart() {

                Highcharts.stockChart('chart', {

                    rangeSelector: {
                        selected: 4,
                        inputEnabled: false,
                        allButtonsEnabled: false,
                        labelStyle: {
                            visibility: 'hidden'
                        }

                    },
                    title: {
                        text: 'Real Time Utilization'
                    },

                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? '  ' : '') + this.value;
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },
                    legend: {
                        enabled: false
                    },

                    plotOptions: {
                        series: {
                            compare: 'value',
                            showInNavigator: true
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>:  ({point.change})<br/>',
                        valueDecimals: 2,
                        split: true
                    },

                    series: seriesOptions
                });
            }

            for (i = 0; i < $scope.response.length; i++) {

                seriesOptions[i] = {
                    name: $scope.response[i].product_name,
                    data: $scope.response[i].values
                };
                seriesCounter += 1;

                if (seriesCounter === $scope.response.length) {
                    createChart();
                }
            }

        });
    }
    $scope.getLiveChart();
    $scope.getRecentReport = function () {
        $('#loadergif').show();
        lupaDeptDashboardService.getRecentReportUrl().then(function (response) {
            $('#loadergif').hide();
            console.log(response);
            var plotDataBarY = [];
            var layout = {
                title: 'LSDYNA / Yearly Report',
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
            console.log("dashboard response", $scope.response);


            for (i = 0; i < $scope.response.length; i++) {
                var responseData = JSON.parse($scope.response[i].data);
                var plotDataBarY = [];
                for(j=0;j< responseData.length;j++) {
                    //debugger;
                    plotDataBarY.push({
                    x: xAxisVal,
                    y: responseData[j].license,
                    name: responseData[j].year,
                    type: 'bar',
                    marker: {
                        color: d3colors(j)
                    }
                })
                }
                Plotly.newPlot('product-chart-yearly'+i, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                
            }
            
        });
    }
     /*$scope.fiveMinuteData =  [{"product_name": "LSDYNA", "jobs" : [{"success" : 20},{"Jobs Qued" : 30}, {"Warning" : 20},{"Warning" : 30}]}];
     $scope.fiveMinuteDataProd = $scope.fiveMinuteData[0].product_name;
     $scope.fiveMinuteDataJobs = $scope.fiveMinuteData[0].jobs;*/
     
     // last 5 minutes
     $scope.getLastFiveMinutesReport = function (product_name) {
        // debugger;
        $('#loadergif').show();
        lupaDeptDashboardService.getLastFiveMinutesReportUrl(product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.fiveMinuteDataJobs = response.data.jobs
            //debugger;
        });
     }
     $scope.getLastFiveMinutesReport("LSDYNA");
     // last 24 hours
     $scope.getTodayReport = function (product_name) {
        // debugger;
        $('#loadergif').show();
        lupaDeptDashboardService.getTodayReportUrl(product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.todayDataJobs = response.data.jobs
            //debugger;
        });
     }
     $scope.getTodayReport("LSDYNA");
    $scope.getRecentReport();

    $scope.drawPolarChart = function(polarChartData) {
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
    debugger;
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
        title: "LSDYNA / License used in Every 30 minutes interval"


    }

    Plotly.newPlot('saturation', data2, layout);
    
    }
    
    $scope.getSaturationReport = function(product) {
        $("#loadergif").show();
        lupaDeptDashboardService.getSaturationReportUrl(product).then(function (response) {
        $scope.drawPolarChart(response.data);
        $("#loadergif").hide();
        $scope.polarChartFlag = true;
        
        });

    }


    //debugger;

}]);