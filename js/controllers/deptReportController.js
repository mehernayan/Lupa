lupaApp.controller('deptReportController', ['$scope', 'userData', 'lupaDeptDashboardService', '$location', 'localStorageService',  function ($scope, userData, lupaDeptDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.chartType = ['vertical_bar_chart', 'pie_chart', 'line_chart', 'area_chart', 'horizontal_bar_chart'];
    

    // default report type
    $scope.report_type = "yearly";

    // default layout 
    var layout = {
        title: 'LSDYNA / ' + $scope.reportType + ' Report',
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

    // default  month array
    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Random color for marker (Bar)
    var d3colors = Plotly.d3.scale.category10();

    // setting mode bar plotly
    var plotlyDefaultConfigurationBar = {
        responsive: true,
        displaylogo: false,
        showTips: true,
        pan2d: true,
        modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
    };


    //  left panel navigation links


    $scope.loadReport = function (report, statisticsType) {
        if (report == 'yearly') {
            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.changeGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);


        } else if (report == 'monthly') {
            $scope.report_type = 'monthly';
            $scope.statisticsType = statisticsType;
            $scope.changeGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);


        } else if (report == 'weekly') {
            $scope.report_type = 'weekly';
            $scope.statisticsType = statisticsType;
            $scope.changeGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);


        } else if (report == 'this_week') {
            $scope.report_type = 'this_week';
            $scope.statisticsType = statisticsType;
            $scope.changeGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);

        }
    }


    // switch weekly chart year section in report 

    $scope.weeklyYearChange = function (reportyear, chartType) {

        // default property 
        var fill = '';
        var type = 'bar';

        //change chart type
        if (chartType == 'line_chart') {
            var type = 'scatter'
        }
        if (chartType == 'area_chart') {
            var type = 'scatter',
                fill = 'tozeroy';
        }
        if (chartType == 'stacked_bar_chart') {
            layout.barmode = 'stack';
        }
        var plotDataBarY = [];
        var response = [];
        var reportyear = reportyear;
        for (j = 0; j < $scope.weeklyresponse.length; j++) {
            if (reportyear == $scope.weeklyresponse[j].year) {
                response.push($scope.weeklyresponse[j]);

            }

        }
        //$scope.response = response;
        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
        layout.title = 'LSDYNA / ' + $scope.report_type + ' Report';
        for (var i = 0; i < response[0].license.length; i++) {
            for (key in response[0].license[i]) {
                plotDataBarY.push({
                    x: xAxisVal,
                    y: response[0].license[i][key],
                    name: monthArray[i],
                    type: type,
                    fill: fill,
                    marker: {
                        color: d3colors(i)
                    }
                })

            }

        }
        Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);

    };


    $scope.changeGraph = function (reportType, chartType, statisticsType) {
        $scope.chartType = chartType;
        $scope.reportType = reportType;
        $scope.statisticsType = statisticsType;
        $('#loadergif').show();
        lupaDeptDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {

            // common to all graph

            var layout = {
                title: 'LSDYNA / ' + $scope.reportType + ' Report',
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

            // Pie chart
            var layoutTitle = {
                title: 'LSDYNA / ' + $scope.report_type + ' Report'
            }

            //Bar chart Section goes here

            var xAxisVal = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // setting mode bar plotly
            var plotlyDefaultConfigurationBar = {
                responsive: true,
                displaylogo: false,
                showTips: true,
                pan2d: true,
                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
            };


            // Random color for marker (Bar)
            var d3colors = Plotly.d3.scale.category10();



            layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
            
            $scope.response = response.data;

            if ($scope.response) {
                $('#loadergif').hide();
                if (chartType == "vertical_bar_chart") {
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //debugger;
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        var plotDataBarY = [];
                        for (var i = 0; i < $scope.response[0].license.length; i++) {
                            //debugger;

                            for (key in $scope.response[0].license[i]) {
                                //debugger;

                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })


                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    } else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                name: $scope.response[i].year,
                                type: 'bar',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }

                    //var marker = ["#"]


                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }

                if (chartType == "pie_chart") {
                    var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie'
                    }];

                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layoutTitle, plotlyDefaultConfigurationBar);


                }
                if (chartType == 'line_chart') {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    }
                    else {

                        for (i = 0; i < $scope.response.length; i++) {
                            console.log(xAxisVal);
                            //debugger;
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                name: $scope.response[i].year,
                                type: 'scatter',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }

                    }

                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                if (chartType == "area_chart") {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    fill: 'tozeroy',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    fill: 'tozeroy',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                name: $scope.response[i].year,
                                fill: 'tozeroy',
                                type: 'scatter'

                            })
                        }
                    }

                    Plotly.newPlot('product-chart-yearly', plotDataBarY, {}, plotlyDefaultConfigurationBar);

                }
                if (chartType == "horizontal_bar_chart") {
                    var layout = {
                        title: 'LSDYNA / Yearly Report',
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
                            title: 'Total number of license',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5

                    };
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: $scope.response[0].license[i][key],
                                    y: xAxisVal,
                                    name: key,
                                    type: 'bar',
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: $scope.response[0].license[i][key],
                                    y: xAxisVal,
                                    name: monthArray[i],
                                    type: 'bar',
                                    orientation: 'h',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: $scope.response[i].license,
                                y: xAxisVal,
                                name: $scope.response[i].year,
                                type: 'bar',
                                orientation: 'h',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }


                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "stacked_bar_chart") {
                    console.log(layout);
                    //debugger;
                    layout.barmode = 'stack';
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                name: $scope.response[i].year,
                                type: 'bar',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }





                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }

                if (chartType == "box_plot_styling_outliers_chart") {

                    layout.barmode = 'stack';
                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    type: 'box'
                                })
                            }
                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                y: $scope.response[i].license,
                                type: 'box',
                                name: $scope.response[i].year
                            })
                        }
                    }




                    Plotly.newPlot('product-chart-yearly', plotDataBarY, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: 'LSDYNA / Yearly Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    mode: 'markers',
                                    marker: {
                                        size: [20, 40, 60]
                                    },
                                    name: key
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    mode: 'markers',
                                    marker: {
                                        size: [10, 20, 30, 40, 50]
                                    },
                                })

                            }

                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            for (j = 0; j < $scope.response[i].license.length; j++) {
                                console.log($scope.response[i].license[j]);
                                if ($scope.response[i].license[j] > 10) {
                                    //debugger;
                                    size.push($scope.response[i].license[j] / 7)
                                } else {
                                    size.push($scope.response[i].license[j]);
                                    //debugger;
                                }
                            }
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                mode: 'markers',
                                marker: {
                                    size: size
                                },
                                name: $scope.response[i].year
                            });
                        }
                    }






                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, {
                        showSendToCloud: true
                    });

                }

                if (chartType == 'scatter_chart') {

                    var plotDataBarY = [];
                    if ($scope.reportType == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: key,
                                    mode: 'markers',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
                    }
                    if ($scope.reportType == 'weekly') {
                        layout.title = 'LSDYNA / ' + $scope.reportType + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        $scope.reportyearlist = [];
                        for (i = 0; i < $scope.response.length; i++) {
                            if (i == 0) {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": true
                                });
                            } else {
                                $scope.reportyearlist.push({
                                    "year": $scope.response[i].year,
                                    "checked": false
                                });
                            }

                        };


                        var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    mode: 'markers',
                                    type: 'scatter',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })

                            }

                        }
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                name: $scope.response[i].year,
                                mode: 'markers',
                                type: 'scatter',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }

                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }

            } else {
                $scope.error = $scope.response.message;
                $scope.user.password = "";
            }
        });



    }

    /*$scope.thisWeekCommonChartType =  function(response) {
         var plotDataBarY = [];
         layout.title = 'LSDYNA / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < response.license.length; i++) {
                            for (key in response.license[i]) {
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: response.license[i][key],
                                    name: key,
                                    type: 'bar',
                                    marker: {
                                        color: d3colors(i)
                                    }
                                })
                            }
                        }
    }*/



    $scope.changeGraph('yearly', 'vertical_bar_chart', 'license_statistics');
    $scope.addedFav = false;
    $scope.addToFavourite = function (reportType, chartType, statisticsType) {
        $scope.addedFav = true;
        //$scope.userLogged = localStorageService.get("user");
        //console.log($scope.chartType, $scope.statisticsType);
        $scope.userLogged = localStorageService.get('user');

        var user_id = $scope.userLogged[0].id;
        console.log(user_id);
        var product_name = "LSDYNA";
        var statisticsType = "license_statistics";
        var report_type = "yearly";
        var favourite = 1;
        var role = "user";
        var api = "";
        lupaDeptDashboardService.addFavouriteUrl(reportType, chartType, statisticsType).then(function (response) {
            console.log(response);
            //debugger;
        });
    }





}]);