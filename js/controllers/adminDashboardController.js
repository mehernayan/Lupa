lupaApp.controller('adminDashboardController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    var product_name = localStorageService.get("product_name");
    if(product_name == "" || product_name == "undefined" || product_name == null) {
        product_name = "LSDYNA"
    }
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    //debugger;
    $scope.reportSidebar = true;
    $scope.dashboardActive = true;
    $scope.favouriteActive = false;
    $scope.polarChartFlag = false;
    
    $scope.getLiveChart = function () {
        $('#loadergif').show();
        lupaAdminDashboardService.getLiveChartUrl().then(function (response) {
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
                    credits: {
                        enabled: false
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
        lupaAdminDashboardService.getRecentReportUrl().then(function (response) {
            
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
            if($scope.response.status_response) {
                var emptyResponseCheck = JSON.parse($scope.response.status_response);
                if(!emptyResponseCheck.success) {
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
                    $(".chart-render-"+chartFavouriteIndex).show();
                    Plotly.newPlot('product-chart-yearly'+chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly"+chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                }
                else if($scope.response[i].report_type == "yearly" || $scope.response[i].report_type == "monthly") {
                    $scope.chartresponse = JSON.parse($scope.response[i].data);
                    
                    for (j = 0; j < $scope.chartresponse.length; j++) {
                    plotDataBarY.push({
                        x: xAxisVal,
                        y: $scope.chartresponse[j].license,
                        name: $scope.chartresponse[j].year,
                        type: 'bar',
                        marker: {
                            color: d3colors(j)
                        }
                    })
                }
                $(".chart-render-"+chartFavouriteIndex).show();
                layout.title = $scope.response[i].product_name + ' ' + $scope.response[i].report_type + ' / report';
                Plotly.newPlot('product-chart-yearly'+chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                var gd1 = document.getElementById("product-chart-yearly"+chartFavouriteIndex);
                Plotly.Plots.resize(gd1);
                
                }
                else  if($scope.response[i].report_type == "this_week"){
                    var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    var plotDataBarY = [];
                    layout.title = $scope.response[i].product_name+ ' ' + 'This Week' + ' / report';
                    $scope.chartresponse = JSON.parse($scope.response[i].data);
                    for (var j = 0; j < $scope.chartresponse[0].license.length; j++) {
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
                    }
                    $(".chart-render-"+chartFavouriteIndex).show();
                    Plotly.newPlot('product-chart-yearly'+chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    var gd1 = document.getElementById("product-chart-yearly"+chartFavouriteIndex);
                    Plotly.Plots.resize(gd1);
                }
                

                

                


            }
            




            $('#loadergif').hide();


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
        lupaAdminDashboardService.getSaturationReportUrl(product).then(function (response) {
        $scope.drawPolarChart(response.data, product);
        $("#loadergif").hide();
        $scope.polarChartFlag = true;
        $(".saturation-cont").show();
        
        });

    }
    $scope.getLiveChartByProduct = function(item,e) {
        //$("#product").removeClass("in").prev("li").addClass("collapsed");
        $(".prod-nav").toggleClass('reportToggleFlag');
        $("#reports, #duration").slideDown();
        //$(e.target).closest(".navigation-links").find(".product-header").toggleClass("collapsed");
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        $scope.reportSidebar = true;
        lupaAdminDashboardService.getLiveChartByProductUrl(item).then(function (response) {
            $scope.response  = response.data;
            $scope.individualProductChart = true;
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
                        selected: 1,
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
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },
                    legend: {
                        enabled: false
                    },
                    
                    

                    series: seriesOptions
                });
            }
        });
    }


    //debugger;

}]);