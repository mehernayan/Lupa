lupaApp.controller('userReportController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', '$filter', function ($scope, userData, lupaUserDashboardService, $location, localStorageService, $filter) {
    var userId = localStorageService.get("user");
    
    
    var product_name = localStorageService.get("product_name");
    if(product_name == "" || product_name == "undefined" || product_name == null) {
        product_name = "LSDYNA";
        localStorageService.set("product_name","LSDYNA");
        $scope.currentProducts  = ['LSDYNA'];
        $scope.activeMenu = "LSDYNA";
    }
    else {
       
        $scope.currentProducts  = [product_name];
        $scope.activeMenu = product_name;
    }
    $scope.product_name = product_name;
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.adminFilterYearly = 'yearly_overall';
    $scope.adminFilterMonthly = 'monthly_overall';
    $scope.adminFilterWeekly = 'weekly_overall';
    $scope.adminFilterThisWeek = 'thisweek_overall';

    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.favouriteActive = false;
    $scope.monthList = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    $scope.daySession = ['Morning', 'Afternoon', 'Evening'];
    
    
    
    $scope.chartType = ['vertical_bar_chart', 'pie_chart', 'line_chart', 'area_chart', 'horizontal_bar_chart'];
    // Full screen view

    
    $scope.license_statistics = "license_statistics";
    $scope.chartId = 0;
    if($scope.report_type == undefined) {
        $scope.report_type = "yearly";
    }
    
    
    


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
            tickangle: -25,
        },
        yaxis: {
            showgrid: true,
            title: "Total number of license used",
            showline: true
        },
        barmode: 'group',
        bargroupgap: 0.5,
        autosize: true

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

    $scope.chartId = 0;
    $scope.loadReport = function (adminFilter, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        if(statisticsType == "license_statistics") {
        $("#loadergif").show();
        var report_dur = adminFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        

        if (report == 'yearly') {
            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.yearlyFlag = true;
            $('#' + $scope.product_name + ' .chart-render-0').show();
            setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000)
           


        } else if (report == 'monthly') {
            $scope.report_type = 'monthly';
            $scope.statisticsType = statisticsType;
            $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.monthlyFlag = true;
            $('#' + $scope.product_name + ' .chart-render-1').show();
            setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000)
            


        } else if (report == 'weekly') {
            $scope.report_type = 'weekly';
            $scope.statisticsType = statisticsType;
            $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
            $scope.weeklyFlag = true;
            $('#' + $scope.product_name + ' .chart-render-2').show();
            setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000)


        } else if (report == 'thisweek') {
            $scope.thisweekFlag = true;
            $scope.statisticsType = statisticsType;
            $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType)
            $('#' + $scope.product_name + ' .chart-render-3').show();
            setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000)
        }
        }
        else {
            $("#loadergif").show();
            var report_dur = adminFilter.split("_");
            var report = report_dur[0];
            $scope.report_type = report_dur[0];

            if (report == 'yearly') {
                $scope.report_type = 'yearly';
                $scope.statisticsType = statisticsType;
                $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
                $scope.yearlyFlag = true;
                $('#' + $scope.product_name + ' .chart-render-4').show();
                setTimeout(function () {
                    $(".full-screen-view").each(function () {
                        if ($(this).is(':visible')) {
                            var gd1 = $(this).find('.chart-graph').attr('id');
                            Plotly.Plots.resize(gd1);
                        }
                    });
                }, 3000);
            


            } else if (report == 'monthly') {
                $scope.report_type = 'monthly';
                $scope.statisticsType = statisticsType;
                $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
                $scope.monthlyFlag = true;
                $('#' + $scope.product_name + ' .chart-render-5').show();
                setTimeout(function () {
                    $(".full-screen-view").each(function () {
                        if ($(this).is(':visible')) {
                            var gd1 = $(this).find('.chart-graph').attr('id');
                            Plotly.Plots.resize(gd1);
                        }
                    });
                }, 3000);
                


            } else if (report == 'weekly') {
                $scope.report_type = 'weekly';
                $scope.statisticsType = statisticsType;
                $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType);
                $scope.weeklyFlag = true;
                $('#' + $scope.product_name + ' .chart-render-6').show();
                setTimeout(function () {
                    $(".full-screen-view").each(function () {
                        if ($(this).is(':visible')) {
                            var gd1 = $(this).find('.chart-graph').attr('id');
                            Plotly.Plots.resize(gd1);
                        }
                    });
                }, 3000);


            } else if (report == 'thisweek') {
                $scope.thisweekFlag = true;
                $scope.statisticsType = statisticsType;
                $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType)
                $('#' + $scope.product_name + ' .chart-render-7').show();
                setTimeout(function () {
                    $(".full-screen-view").each(function () {
                        if ($(this).is(':visible')) {
                            var gd1 = $(this).find('.chart-graph').attr('id');
                            Plotly.Plots.resize(gd1);
                        }
                    });
                }, 3000);
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
    $scope.$watch('product_name', function (n, o) {
        if (n !== o && typeof n !== "undefined") {
            $scope.chartId++;
        };
    }, true);
    

    // switch weekly chart year section in report 

    $scope.weeklyYearChange = function (event,reportyear, chartType, currentprod, statisticsType) {
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        localStorageService.set("weeklyReportYearOverall", reportyear);
        var weeklyresponse = localStorageService.get("userweekly"+statisticsType+currentprod);
        $scope.weeklyresponse = JSON.parse(weeklyresponse);
        if (statisticsType == 'license_statistics') {
            layout.yaxis.title = "Total number of license";
        }
        else if (statisticsType == 'time_statistics') {
            layout.yaxis.title = "Total number of hours used";
        }
        
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
        if(chartType == 'bubble_chart') {
            for (j = 0; j < $scope.weeklyresponse.length; j++) {
                if (reportyear == $scope.weeklyresponse[j].year) {
                    response.push($scope.weeklyresponse[j]);

                }

            }
            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
            layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
            for (i = 0; i < response[0].license.length; i++) {
                            for (key in response[0].license[i]) {
                                size = [];
                                size = $scope.bubbleSize(response[0].license[i][key]);
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: response[0].license[i][key],
                                    name: monthArray[i],
                                    mode: 'markers',
                                    marker: {
                                        size: size
                                    },
                                })

                            }

            }
            layout.legend= {x: 1, y:1};
            Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);


        }
        else if(chartType == 'polar_chart') {
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
                            type: "scatterpolar",
                            name: monthArray[i],
                            r: response[0].license[i][key].r,
                            theta: response[0].license[i][key].theta,
                            fill: "toself",
                            subplot: "polar2",
                            fillcolor: '#709BFF'
                })
                
                

            }

        }

        }
        else {
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
        }
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    };
    $scope.loadYearlyGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaUserDashboardService.changeGraphUrl(reportType, chartType, statisticsType,$scope.product_name).then(function (response) {
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
                    tickangle: -25,
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                		
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
                
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly0', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-0').show();
                }
                else {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly4', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-4').show();
                }
               
                $("#loadergif").hide();
            }

        });


    }
    $scope.loadMonthlyGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaUserDashboardService.changeGraphUrl(reportType, chartType, statisticsType,$scope.product_name).then(function (response) {
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
                    tickangle: -25,
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                		
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
                
                if(statisticsType == 'license_statistics') {
                    Plotly.newPlot($scope.product_name + '-product-chart-yearly1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-1').show();
                }
                else {
                   Plotly.newPlot($scope.product_name + '-product-chart-yearly5', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                   $('#' + $scope.product_name + ' .chart-render-5').show();
                }
                
                $("#loadergif").hide();
                
            }
        });
    }
    $scope.loadWeeklyGraph = function(reportType, chartType, statisticsType, currentprod) {
        var product_name = localStorageService.get("product_name");
        if (product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        if (currentprod != "" && currentprod != undefined) {
            $scope.product_name = currentprod;
            product_name = currentprod;
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaUserDashboardService.changeGraphUrl(reportType, chartType, statisticsType, $scope.product_name).then(function(response) {
            var layout = {
                title: product_name + ' / ' + $scope.report_type + ' Report',
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
                    tickangle: -20,
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
                		

            } else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                		
            }

            // Pie chart
            var layoutTitle = {
                title: product_name + ' / ' + $scope.report_type + ' Report'
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



            layout.title = product_name + ' / ' + $scope.report_type + ' Report';

            $scope.response = response.data;
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                $('#loadergif').hide();
                var plotDataBarY = [];
                layout.title = product_name + ' / ' + $scope.report_type + ' Report';
                $scope.weeklyresponse = $scope.response;
                localStorageService.set('userweekly' + statisticsType + $scope.product_name, JSON.stringify($scope.response));
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
                    localStorageService.set("weeklyReportYearOverall", $scope.response[0].year);

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
                if (statisticsType == 'license_statistics') {
                    Plotly.newPlot($scope.product_name + '-product-chart-yearly2', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    $('#' + $scope.product_name + ' .chart-render-2').show();
                } else {
                    Plotly.newPlot($scope.product_name + '-product-chart-yearly6', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    $('#' + $scope.product_name + ' .chart-render-6').show();
                }

                $("#loadergif").hide();
            }

        });
    }
    $scope.loadThisWeekGraph = function (reportType, chartType, statisticsType) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaUserDashboardService.changeGraphUrl(reportType, chartType, statisticsType,$scope.product_name).then(function (response) {
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
                    tickangle: -25,
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                		
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
                
                //$scope.thisWeekCommonChartType($scope.response[0]);
                layout.title = product_name +  ' / This Week Report';
                var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                var plotDataBarY = [];
                for (var i = 0; i < $scope.response[0].license.length; i++) {
                    

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
                
                if(statisticsType == 'license_statistics') {
                    Plotly.newPlot($scope.product_name + '-product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    $('#' + $scope.product_name + ' .chart-render-3').show();
                }
                else {
                    Plotly.newPlot($scope.product_name + '-product-chart-yearly7', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    $('#' + $scope.product_name + ' .chart-render-7').show();
                }
                
                $("#loadergif").hide();
            }
        });
    }


    $scope.changeGraph = function (userFilter,event,reportType, chartType, statisticsType, currentprod) {
        $scope.chartType = chartType;
        var report_dur = userFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        
        if($scope.report_type == 'thisweek') {
            $scope.report_type = 'this_week';
        }
        if($scope.report_type == 'weekly') {
            $(event.target).closest('.chart-container').find('.weekly-section input:radio:first').prop("checked", true);
        }
        $scope.statisticsType = statisticsType;
        $('#loadergif').show();
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        lupaUserDashboardService.changeGraphUrl($scope.report_type, chartType, statisticsType,currentprod).then(function (response) {
            
            product_name = currentprod;
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
                    tickangle: -25,
                },
                yaxis: {
                    showgrid: true,
                    title: "Total number of license used",
                    showline: true
                },
                barmode: 'group',
                bargroupgap: 0.5,
                autosize: true

            };
            if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                
            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                
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
            if(chartType != "polar_chart") {
                if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                    $scope.addedFav = $scope.response[0].favourite;
                }
            }
            

            if ($scope.response) {
                $('#loadergif').hide();
                if (chartType == "vertical_bar_chart") {
                    var plotDataBarY = [];
                    if ($scope.report_type == 'this_week') {
                        
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        var plotDataBarY = [];
                        for (var i = 0; i < $scope.response[0].license.length; i++) {
                            

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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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

                   Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                   

                }

                if (chartType == "pie_chart") {
                    if($scope.report_type == "weekly") {
                        var plotDataBarY = [];
                        $scope.pieChartTotalReponse = $scope.response;
                        localStorageService.set("userweeklypie" + currentprod + statisticsType, $scope.pieChartTotalReponse);
                        $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
                        $scope.defaultWeekDataSet = $scope.response[$scope.response.length - 1].license[0];
                        $scope.defaultWeekData = $scope.response[0].license[0].january;
                        var sum = $scope.defaultWeekData.reduce(function(a, b) { return a + b; }, 0);
                        if(sum == 0) {
                            $scope.noPieChartDataMessage = true;
                        }
                        
                        //$scope.defaultWeekData = [10,30,40,50,60]
                        var plotDataBarY = [{
                            values: $scope.defaultWeekData,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'label+text+value'
                        }];
                        

                        
                    }
                    else if($scope.report_type == "thisweek" || $scope.report_type == "this_week") {
                         var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        $scope.thisWeekPieRespData =  $scope.response[0].license;
                        var plotDataBarY = [{
                            values: $scope.response[0].license[0]["morning"],
                            labels: xAxisVal,
                            type: 'pie',
                            textinfo: 'label+text+value'
                        }];
                        
                    }
                    else {
                        var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie',
                        textinfo: 'label+text+value'
                    }];
                    }
                    

                    var layout = {};
                    if ($scope.report_type == "yearly") {
                        layout.title = product_name + ' / Yearly Report';
                    } else if ($scope.report_type == "monthly") {
                        layout.title = product_name + ' / Monthly Report';
                    } else if ($scope.report_type == "weekly") {
                        layout.title = product_name + ' / Weekly Report';
                    } else {
                        layout.title = product_name + ' / This week Report';
                    }
                    
                    
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout);


                }
                if (chartType == 'line_chart') {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        if($scope.report_type == 'this_week') {
                            layout.title = product_name +  ' / This week Report';
                        
                        }
                        else if($scope.report_type == 'weekly'){
                            layout.title = product_name +  ' / weekly Report';
                        }
                        else if($scope.report_type == "monthly") {
                            layout.title = product_name +  ' / Monthly Report';
                        }
                        else {
                            layout.title = product_name +  ' / Yearly Report';
                        }
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        localStorageService.set("weeklyReportYearOverall", $scope.response[0].year);


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
                    if($scope.report_type == 'this_week') {
                        layout.title = product_name +  ' / This week Report';
                       
                    }
                    else if($scope.report_type == 'weekly'){
                        layout.title = product_name +  ' / weekly Report';
                    }
                    else if($scope.report_type == "monthly") {
                        layout.title = product_name +  ' / Monthly Report';
                    }
                    else {
                        layout.title = product_name +  ' / Yearly Report';
                    }
                    if ($scope.report_type == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        //layout.title = product_name +  ' / This Week Report';
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        if($scope.report_type == 'this_week') {
                        layout.title = product_name +  ' / This week Report';
                       
                        }
                        else if($scope.report_type == 'weekly'){
                            layout.title = product_name +  ' / weekly Report';
                        }
                        else if($scope.report_type == "monthly") {
                            layout.title = product_name +  ' / Monthly Report';
                        }
                        else {
                            layout.title = product_name +  ' / Yearly Report';
                        }
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
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    

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
                            tickangle: -25,
                        },
                        xaxis: {
                            showgrid: true,
                            title: "Total number of license used",
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };

                    if ($scope.statisticsType == 'license_statistics') {
                        layout.yaxis.title = "Total number of license";
                        
                    }
                    else if ($scope.statisticsType == 'time_statistics') {
                        layout.yaxis.title = "Total number of hours used";
                        
                    }
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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

                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "stacked_bar_chart") {
                    console.log(layout);
                    
                    layout.barmode = 'stack';
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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




                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }

                if (chartType == "box_plot_styling_outliers_chart") {

                    layout.barmode = 'stack';
                    var plotDataBarY = [];
                    if ($scope.report_type == "weekly") {
                        var plotDataBarY = [];
                        layout.title = product_name + ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                                    y: $scope.response[0].license[i][key],
                                    x: xAxisVal,
                                    type: 'box',
                                    name: monthArray[i]

                                });


                            }

                        }

                    } else if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name + ' / This Week Report';
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
                    } else {
                        
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                y: $scope.response[i].license,
                                type: 'box',
                                name: $scope.response[i].year
                            })
                        }
                    }




                    //$('.chart-render-' + $scope.chartId).show();
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, {}, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name + ' / Yearly Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name + ' / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            size = [];
                            
                            for (key in $scope.response[0].license[i]) {
                                size = $scope.bubbleSize($scope.response[0].license[i][key]);
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    mode: 'markers',
                                    marker: {
                                        size: size
                                    },
                                    name: key
                                })
                            }
                        }
                    }
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name + ' / ' + 'Weekly Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                                size = [];
                                size = $scope.bubbleSize($scope.response[0].license[i][key]);
                                plotDataBarY.push({
                                    x: xAxisVal,
                                    y: $scope.response[0].license[i][key],
                                    name: monthArray[i],
                                    mode: 'markers',
                                    marker: {
                                        size: size
                                    },
                                })

                            }

                        }
                    } else {
                        for (i = 0; i < $scope.response.length; i++) {
                            size = [];
                            size = $scope.bubbleSize($scope.response[i].license);
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
                    if ($scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                if(chartType == 'polar_chart') {
                    $scope.drawReportPolarChart($scope.response,$scope.chartRenderId, $scope.report_type, currentprod);
                    $scope.weeklyresponse = $scope.response;
                    localStorageService.set('userweekly' + statisticsType + currentprod, JSON.stringify($scope.response));

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



    //$scope.changeGraph('yearly', 'vertical_bar_chart', 'license_statistics');
    //$scope.loadReport("yearly_overall", "license_statistics");
    $scope.addedFav = false;
    $scope.addToFavourite = function (reportType, chartType, statisticsType, currentprod) {
        $scope.addedFav = true;
        //$scope.userLogged = localStorageService.get("user");
        //console.log($scope.chartType, $scope.statisticsType);
        $scope.userLogged = localStorageService.get('user');

        var user_id = $scope.userLogged[0].id;
        console.log(user_id);
        //var product_name = product_name;
        //var statisticsType = "license_statistics";
        var report_type = "yearly";
        var favourite = 1;
        var role = "user";
        var api = "";
        lupaUserDashboardService.addFavouriteUrl(reportType, chartType, statisticsType, currentprod).then(function (response) {
            if(JSON.parse(response.data.status_response).success == 1) {
                $scope.addedSuccess = true;
                setTimeout(function() {
                    $(".animationIf").hide()
                }, 5000);
            }
            else {
                $scope.alreadyAddedSuccess = true;
                setTimeout(function() {
                    $(".animationIf").hide()
                }, 5000);
            }
            
        });
    }
    /*$scope.$watch('shiftstarttime', function (n, o) {
        $scope.shiftstarttime = new Date();
        $scope.val = $filter('date')($scope.shiftstarttime, 'HH:mm:ss');
        console.log($scope.val);
        if (n !== o && typeof n !== "undefined") {
           console.log($scope.val); 
        };
    }, true);*/

    $scope.changeStartTime = function() {
        alert("yes");
        $scope.shiftstarttime = new Date();
        $scope.val =   $filter('date')($scope.shiftstarttime, 'HH:mm:ss');
        

    }
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        if($scope.currentProducts.indexOf(item) == -1) {
                $scope.currentProducts.push(item);
            }
        $scope.activeMenu = item;

        //$("#reports, #duration").slideDown();
    }
    $scope.drawReportPolarChart = function(polarChartData,chartRenderPolarId, reportType, currentprod) {
        
        var polarData = [];
        if (reportType == "yearly") {
            for (key in polarChartData) {
                polarChartRenderData = polarChartData[key];
                polarData.push({
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
        else if(reportType == "monthly") {
            polarData.push({
                    type: "scatterpolar",
                    name: "license used in this year",
                    r: polarChartData.r,
                    theta: polarChartData.theta,
                    fill: "toself",
                    subplot: "polar2",
                    fillcolor: '#709BFF'
                })
            
            
        }
        else if(reportType == "weekly") { 
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
                        polarData.push({
                            type: "scatterpolar",
                            name: monthArray[i],
                            r: $scope.response[0].license[i][key].r,
                            theta: $scope.response[0].license[i][key].theta,
                            fill: "toself",
                            subplot: "polar2",
                            fillcolor: '#709BFF'
                        })
                        

                    }
                    

                }
                
        }
        else if(reportType == "this_week" || reportType == "thisweek") {
            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                polarData.push({
                                type: "scatterpolar",
                                name: "This week chart",
                                r: polarChartData.r,
                                theta: polarChartData.theta,
                                fill: "toself",
                                subplot: "polar2",
                                fillcolor: '#709BFF'
                            })        
                                
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
    if($scope.report_type == "this_week") {
        layout.title = product_name + " / License used in this week";
        
    }
    if($scope.report_type == "yearly") {
        layout.title = product_name + " / License used in this Year";
        
    }
    if($scope.report_type == "weekly") {
        layout.title = product_name + " / License used weekly";
        
    }
    if($scope.report_type == "monthly") {
        layout.title = product_name + " / License used in this month";
        
    }
    

    Plotly.newPlot(chartRenderPolarId, polarData, layout);
    
    }
    if($scope.report_type == 'yearly') {
        $scope.loadReport("yearly_overall", "license_statistics");
    }
    else if($scope.report_type == 'weekly') {
        $scope.loadReport("weekly_overall", "license_statistics");
    }
    else if($scope.report_type == 'this_week') {
        $scope.loadReport("thisweek_overall", "license_statistics");
    }
    else {
        $scope.loadReport("monthly_overall", "license_statistics");
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
    $scope.changeMonthData = function(event, monthNamePieChart, product_name, statisticsType) {
        $scope.pieChartTotalReponse = localStorageService.get("userweeklypie"+product_name+statisticsType);
        $scope.reportPieChartYear = $(event.target).closest('.weekly-section').find("input:checked").attr('data-attr');
        $scope.monthNamePieChart = monthNamePieChart;
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        layout.title = product_name + " / Weekly report";
        $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
        if($scope.reportPieChartYear == "" || $scope.reportPieChartYear == undefined) {
            $scope.defaultPieLicenseData = $scope.response[0].license;
            
            
        }
        else {
            for(k = 0; k < $scope.pieChartTotalReponse.length; k++) {
                if($scope.pieChartTotalReponse[k].year == $scope.reportPieChartYear) {
                    $scope.defaultPieLicenseData = $scope.pieChartTotalReponse[k].license;
                    
                   
                }
            }
        }
        
        
        
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
        
        layout.legend = {x:1, y:1};
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    }
    $scope.changeThisWeekPieData = function(event, thiweeksNamePieChart, product_name) {
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.thisWeekPieData = $scope.thisWeekPieRespData;
        layout.title = product_name + " / Monthly report";
        $scope.thisweekFilterPieData = [];
        for(k=0; k < $scope.thisWeekPieData.length; k++) {
            if(Object.keys($scope.thisWeekPieData[k])[0] == thiweeksNamePieChart.toLowerCase()) {
                $scope.thisweekFilterPieData.push($scope.thisWeekPieData[k]);

            }
        }
        var plotDataBarY = [{
                            values: Object.values($scope.thisweekFilterPieData[0])[0],
                            labels: xAxisVal,
                            type: 'pie',
                            textinfo: 'label+text+value'
        }];
        layout.legend = {x: 1, y: 1};
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
    }

}]);