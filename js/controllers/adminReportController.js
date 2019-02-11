lupaApp.controller('adminReportController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    var product_name = localStorageService.get("product_name");
    if(product_name == "" || product_name == "undefined" || product_name == null) {
        product_name = "LSDYNA"
    }
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.adminFilterYearly = 'yearly_overall';
    $scope.adminFilterMonthly = 'monthly_overall';
    $scope.adminFilterWeekly = 'weekly_overall';
    $scope.adminFilterThisWeek = 'thisweek_overall';
    $scope.adminReport = 'Department';
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.favouriteActive = false;
    $scope.chartType = ['vertical_bar_chart', 'pie_chart', 'line_chart', 'area_chart', 'horizontal_bar_chart'];
    $scope.license_statistics = "license_statistics";



    // default report type
    $scope.report_type = "yearly";
    $scope.chartId = 0;

    // default layout 
    var layout = {
        title: product_name +  ' / ' + $scope.report_type + ' Report',
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
            title: 'Total number of license used',
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
    $scope.yearlyFlag = true;
    $scope.monthlyFlag = false;
    $scope.weeklyFlag = false;
    $scope.thisweekflag = false;

    $scope.loadReport = function (adminFilter, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
         if(statisticsType == "license_statistics") {
              $("#loadergif").show();
        var report_dur = adminFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        


        //debugger;
        if (report == 'yearly') {

            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.yearlyFlag = true;
            $('.chart-render-0').show();

        } else if (report == 'monthly') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);
            $scope.report_type = 'monthly';
            $scope.statisticsType = statisticsType;
            $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.monthlyFlag = true;
            $('.chart-render-1').show();

        } else if (report == 'weekly') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);

            $scope.report_type = 'weekly';
            $scope.statisticsType = statisticsType;
            $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.getAdminReportUserList();
            $scope.getAdminReportDeptList();
            $scope.weeklyFlag = true;
            $('.chart-render-2').show();
        } else if (report == 'thisweek') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);
            $scope.thisweekFlag = true;
            $scope.report_type = 'thisweek';
            $scope.statisticsType = statisticsType;
            $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.getAdminReportUserList();
            $scope.getAdminReportDeptList();
            $scope.getThisWeekShifts();
            $('.chart-render-3').show();

        }
          }
          else {
               $("#loadergif").show();
        var report_dur = adminFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        


        //debugger;
        if (report == 'yearly') {

            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.yearlyFlag = true;
            $('.chart-render-4').show();

        } else if (report == 'monthly') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);
            $scope.report_type = 'monthly';
            $scope.statisticsType = statisticsType;
            $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.monthlyFlag = true;
            $('.chart-render-5').show();

        } else if (report == 'weekly') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);

            $scope.report_type = 'weekly';
            $scope.statisticsType = statisticsType;
            $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.getAdminReportUserList();
            $scope.getAdminReportDeptList();
            $scope.weeklyFlag = true;
            $('.chart-render-6').show();
        } else if (report == 'thisweek') {
            var gd1 = document.getElementById("product-chart-yearly0");
		    Plotly.Plots.resize(gd1);
            $scope.thisweekFlag = true;
            $scope.report_type = 'thisweek';
            $scope.statisticsType = statisticsType;
            $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.getAdminReportUserList();
            $scope.getAdminReportDeptList();
            $scope.getThisWeekShifts();
            $('.chart-render-7').show();

        }

          }

       
    }

    $scope.$watch('report_type', function (n, o) {
        if (n !== o && typeof n !== "undefined") {
            $scope.chartId++;
        };
    }, true);
    $scope.$watch('statisticsType', function (n, o) {
        if (n !== o && typeof n !== "undefined") {
            $scope.chartId++;
        };
    }, true);
    // switch weekly chart year section in report 

    $scope.weeklyYearChange = function (event,reportyear, chartType) {
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');

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
        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
        //$('.chart-render-' + $scope.chartId).show();
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    };

    $scope.loadYearlyGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaAdminDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {
            var layout = {
                title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                var plotDataBarY = [];
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot('product-chart-yearly0', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                else {
                     Plotly.newPlot('product-chart-yearly4', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                //Plotly.newPlot('product-chart-yearly0', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }

        });


    }
    $scope.loadMonthlyGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaAdminDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {
            var layout = {
                title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                $('#loadergif').hide();
                var plotDataBarY = [];
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot('product-chart-yearly1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                else {
                     Plotly.newPlot('product-chart-yearly5', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                //Plotly.newPlot('product-chart-yearly1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
                //debugger;
            }
        });
    }
    $scope.loadWeeklyGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaAdminDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {
            var layout = {
                title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                $('#loadergif').hide();
                var plotDataBarY = [];
                layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot('product-chart-yearly2', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                else {
                     Plotly.newPlot('product-chart-yearly6', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                //Plotly.newPlot('product-chart-yearly2', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }

        });
    }
    $scope.loadThisWeekGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        //debugger;
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaAdminDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {
            var layout = {
                title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                $('#loadergif').hide();
                var plotDataBarY = [];
                //debugger;
                //$scope.thisWeekCommonChartType($scope.response[0]);
                layout.title = product_name +  ' / This Week Report';
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot('product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                else {
                     Plotly.newPlot('product-chart-yearly7', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                //Plotly.newPlot('product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }
        });
    }
    $scope.loadThisWeekShiftGraph = function (report_type, statisticsType) {
        $("#loadergif").show();
        $scope.statisticsType = statisticsType;
        $scope.report_type = report_type;
        lupaAdminDashboardService.loadThisWeekShiftGraphUrl(report_type,'vertical_bar_chart', statisticsType).then(function (response) {
            var layout = {
                title: product_name +  ' / This Week Shift Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / This Week Shift Report'
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



            layout.title = product_name +  ' / This Week Shift Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                var plotDataBarY = [];
                //debugger;
                //$scope.thisWeekCommonChartType($scope.response[0]);
                layout.title = product_name +  ' / This Week Report';
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot('product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                else {
                     Plotly.newPlot('product-chart-yearly7', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                //Plotly.newPlot('product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }
        });
    }
    $scope.changeGraph = function (adminFilter,event,reportType, chartType, statisticsType) {
        $scope.chartType = chartType;
        var report_dur = adminFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        
        if($scope.report_type == 'thisweek') {
            $scope.report_type = 'this_week';
        }
        $scope.statisticsType = statisticsType;
        $('#loadergif').show();
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        lupaAdminDashboardService.changeGraphUrl(reportType, chartType, statisticsType).then(function (response) {

            // common to all graph

            var layout = {
                title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                    title: 'Total number of license used',
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                //debugger;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total license used on hourly basis";
                //debugger;		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name +  ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }

            if ($scope.response) {
                $('#loadergif').hide();
                if (chartType == "vertical_bar_chart") {
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //debugger;
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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

                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }

                if (chartType == "pie_chart") {
                    var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie'
                    }];

                     Plotly.newPlot($scope.chartRenderId, plotDataBarY, {});


                }
                if (chartType == 'line_chart') {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                if (chartType == "area_chart") {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, {}, plotlyDefaultConfigurationBar);

                }
                if (chartType == "horizontal_bar_chart") {
                    var layout = {
                        title: product_name +  ' / Yearly Report',
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
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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

                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "stacked_bar_chart") {
                    console.log(layout);
                    //debugger;
                    layout.barmode = 'stack';
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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




                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }

                if (chartType == "box_plot_styling_outliers_chart") {

                    layout.barmode = 'stack';
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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



                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name +  ' / Yearly Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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





                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, {
                        showSendToCloud: true
                    });

                }

                if (chartType == 'scatter_chart') {

                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
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
                    if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }

            } else {
                $scope.error = $scope.response.message;
                $scope.user.password = "";
            }
        });



    }

    /*$scope.thisWeekCommonChartType =  function(response) {
         var plotDataBarY = [];
         layout.title = product_name +  ' / This Week Report';
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



    //$scope.loadYearlyGraph('yearly_overall', 'vertical_bar_chart', 'license_statistics');
    $scope.loadReport("yearly_overall", "license_statistics");
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
        lupaAdminDashboardService.addFavouriteUrl(reportType, chartType, statisticsType).then(function (response) {
            console.log(response);
            //debugger;
        });
    }


    // Year filter for  Report to  get the year list 

    $scope.getAdminReportYearList = function (userFilterType, defaultFilterVal) {
        $scope.userLogged = localStorageService.get('user');
        var product_name = "LSDYNA";
        //lupaAdminDashboardService.getAdminReportYearListUrl($scope.userLogged, "LSDYNA").then(function (response) {
        lupaAdminDashboardService.getAdminReportYearListUrl("Admin", "LSDYNA").then(function (response) {
            console.log(response.data);
            $scope.adminReportYearList = response.data;
            $scope.getAdminYearlyReportDepartmentFilter(userFilterType, defaultFilterVal);


        });

    }
    //load data to get year value
    $scope.getAdminReportYearListLoad = function () {
        $scope.userLogged = localStorageService.get('user');
        var product_name = "LSDYNA";
        //lupaAdminDashboardService.getAdminReportYearListUrl($scope.userLogged, "LSDYNA").then(function (response) {
        lupaAdminDashboardService.getAdminReportYearListUrl("Admin", "LSDYNA").then(function (response) {
            console.log(response.data);
            $scope.adminReportYearList = response.data;

            $scope.defaultFilterVal = $scope.adminReportYearList[0].year;



        });

    }
    $scope.getAdminReportYearListLoad();
    $scope.getAdminYearlyReportDepartmentFilter = function (userFilterType, defaultFilterVal) {
        lupaAdminDashboardService.getAdminYearlyReportDepartmentFilterUrl("Admin", "LSDYNA", "license_statistics", "vertical_bar_chart", userFilterType, defaultFilterVal, $scope.report_type).then(function (response) {
            console.log(response.data);
            $scope.AdminYearlyReportDepartmentFilter = response.data;
            $("#loadergif").hide();
            //debugger;
            if ($scope.report_type == "monthly") {
                $scope.drawGraph($scope.AdminYearlyReportDepartmentFilter);
            }
            else {
                $scope.drawGraph($scope.AdminYearlyReportDepartmentFilter[0]);
            }

            // Graph starts here 

            // common to all graph







        });
    }
    $scope.drawGraph = function (chartData) {
        var layout = {
            title: product_name +  ' / ' + $scope.report_type + ' Report',
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





        var plotDataBarY = [];
        //layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
        if ($scope.report_type == "yearly") {
            plotDataBarY.push({
                x: chartData.label,
                y: chartData.value,
                name: $scope.defaultFilterVal,
                type: 'bar',
                marker: {
                    color: d3colors(0)
                }
            });
        }
        else if ($scope.report_type == "monthly" && $scope.userFilterType == "dept") {
            for (i = 0; i < chartData.length; i++) {
                plotDataBarY.push({
                    x: monthArray,
                    y: chartData[i].license,
                    name: chartData[i].department,
                    type: 'bar',
                    marker: {
                        color: d3colors(0)
                    }
                });
            }
        }
        else if ($scope.report_type == "monthly" && $scope.userFilterType == "user") {
            for (i = 0; i < chartData.length; i++) {
                plotDataBarY.push({
                    x: monthArray,
                    y: chartData[i].license,
                    name: chartData[i].username,
                    type: 'bar',
                    marker: {
                        color: d3colors(0)
                    }
                });
            }
        } else if ($scope.report_type == 'thisweek') {
            //debugger;
            //$scope.thisWeekCommonChartType($scope.response[0]);
            layout.title = product_name +  ' / This Week Report';
            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            var plotDataBarY = [];
            //chartData = {"license" : [{"morning":[0,0,0,0,0,0,0]},{"afternoon":[0,0,0,0,0,0,0]},{"evening":[0,0,0,0,0,0,0]}]}
            for (var i = 0; i < chartData.license.length; i++) {
                //debugger;

                for (key in chartData.license[i]) {
                    //debugger;

                    plotDataBarY.push({
                        x: xAxisVal,
                        y: chartData.license[i][key],
                        name: key,
                        type: 'bar',
                        marker: {
                            color: d3colors(i)
                        }
                    })


                }
            }
        }
        else if ($scope.report_type == 'weekly') {
            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
            $scope.weeklyresponse = $scope.response;



            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];

            for (i = 0; i < chartData.license.length; i++) {
                for (key in chartData.license[i]) {
                    plotDataBarY.push({
                        x: xAxisVal,
                        y: chartData.license[i][key],
                        name: monthArray[i],
                        type: 'bar',
                        marker: {
                            color: d3colors(i)
                        }
                    })

                }

            }
        }

        //debugger;
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        //debugger;




    }
    $scope.userFilterType = 'dept';
    $scope.reportAdminFilter = function (e, adminFilter, userFilterType, defaultFilterVal) {
        var report_dur = adminFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];

        $scope.defaultFilterVal = defaultFilterVal;
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $("#loadergif").show();
        if (userFilterType == 'dept') {
            $scope.userFilterType = 'dept';
        }
        else {
            $scope.userFilterType = 'user';
        }
        if ($scope.report_type == "yearly") {
            $scope.getAdminReportYearList(userFilterType, defaultFilterVal);
        }
        else {

            $scope.getAdminYearlyReportDepartmentFilter(userFilterType, defaultFilterVal);
        }


        //debugger;
    }

    $scope.getAdminReportUserList = function () {
        lupaAdminDashboardService.getAdminReportUserListUrl().then(function (response) {
            $scope.adminReportUserList = JSON.parse(response.data.status_response).data;

            //debugger;
        });
    }


    $scope.selectedItem = "";
    $scope.getAdminReportDeptList = function () {
        lupaAdminDashboardService.getAdminReportDeptListUrl().then(function (response) {
            $scope.adminReportDeptList = JSON.parse(response.data.status_response).data;
            //debugger;
            $scope.defaultFilterVal = $scope.adminReportDeptList[0];

        });

    }


    $scope.getfetchShiftList = function () {
        lupaAdminDashboardService.getfetchShiftListUrl().then(function (response) {
           $scope.getShiftData = response.data;

        });

    };
    $scope.shift_name = "";
    /*$scope.start_time = "";*/
    $scope.shift_start_time = "";
    $scope.shift_end_time = "";
    $scope.addShiftTime = function (shift_name, start_time, end_time) {
        lupaAdminDashboardService.addShiftTimeUrl().then(function (response) {
           //$scope.getShiftData = response.data;

        });
    }
    $scope.$watch('shift_end_time', function(n,o) {
        
    });
    $scope.validateShiftTime = function(shift_end_time) {
        alert("yes");
        console.log($scope.shift_start_time);
        console.log($scope.shift_end_time);
        debugger;


    };
    $scope.getThisWeekShifts = function() {
      $('#loadergif').show();
      lupaAdminDashboardService.getThisWeekShiftsUrl().then(function(response) {
          $('#loadergif').hide();
          $scope.response = JSON.parse(response.data.status_response);
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
                console.log( $scope.response.data);
                //debugger;
             
            }else{
              
            }
          }
      });      
    };
    $scope.getLiveChartByProduct = function(item) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        $("#reports, #duration").slideDown();
    } 
    $scope.getThisWeekShifts();








}]);