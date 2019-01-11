lupaApp.controller('adminDashboardController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = true;
    $scope.productlist = localStorageService.get('productlist');

    $scope.selected = {};
    $scope.loadDashboardLiveChart = function(){
        $scope.productlistresponse = $.grep($scope.productlistresponse, function( item ) {
        return $scope.selected[ item.product_name ];
      });
        
    };
    
    $scope.getLiveChart = function () {
        $('#loadergif').show();
        lupaAdminDashboardService.getLiveChartUrl().then(function (response) {
            $scope.response = response.data;
            $scope.productlistresponse = response.data;
            var seriesOptions = [],
                seriesCounter = 0;
            
            function createChart() {

                Highcharts.stockChart('chart', {

                    rangeSelector: {
                        selected: 4
                    },

                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? ' + ' : '') + this.value + '%';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },

                    plotOptions: {
                        series: {
                            compare: 'percent',
                            showInNavigator: true
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
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
        lupaAdminDashboardService.getRecentReportUrl().then(function (response) {
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
        lupaAdminDashboardService.getLastFiveMinutesReportUrl(product_name).then(function (response) {
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
        lupaAdminDashboardService.getTodayReportUrl(product_name).then(function (response) {
            $('#loadergif').hide();
            $scope.todayDataJobs = response.data.jobs
            //debugger;
        });
     }
     $scope.getTodayReport("LSDYNA");
    $scope.getRecentReport();


    //debugger;

}]);