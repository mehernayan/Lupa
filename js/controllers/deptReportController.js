lupaApp.controller('deptReportController', ['$scope', 'userData', 'lupaDeptDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaDeptDashboardService, $location, localStorageService) {
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
    var currentyearlyprod = "";
    var currentmonthlyprod = "";
    var currentweeklyprod = "";
    var currentthisweekprod = "";
    $scope.product_name = product_name;
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.deptFilterYearly = 'yearly_overall';
    $scope.deptFilterMonthly = 'monthly_overall';
    $scope.deptFilterWeekly = 'weekly_overall';
    $scope.deptFilterThisWeek = 'thisweek_overall';
    $scope.deptReport = 'Department';
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.favouriteActive = false;
    $scope.chartType = ['vertical_bar_chart', 'pie_chart', 'line_chart', 'area_chart', 'horizontal_bar_chart'];
    $scope.userFilterType = 'user';
    if($scope.report_type == undefined) { 
      $scope.report_type = "yearly";
    }

    // default report type
    //$scope.report_type = "yearly";
    $scope.chartId = 0;
    $scope.license_statistics = "license_statistics";

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

    $scope.yearlyFlag = true;
    $scope.monthlyFlag = false;
    $scope.weeklyFlag = false;
    $scope.thisweekflag = false;
    



    $scope.loadReport = function (deptFilter, statisticsType) {
        //debugger;
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
            
        }
        $scope.product_name = product_name;
        
        //$('#' + $scope.product_name + ' .chart-render-0').show();
        if(statisticsType == "license_statistics") {
            $("#loadergif").show();
        var report_dur = deptFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        


        
        if (report == 'yearly') {

            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentyearlyprod);
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
            
            /*var gd1 = document.getElementById("product-chart-yearly1");
		    Plotly.Plots.resize(gd1);
            var gd3 = document.getElementById("product-chart-yearly1");
		    Plotly.Plots.resize(gd3);
            var gd2 = document.getElementById("product-chart-yearly2");
		    Plotly.Plots.resize(gd2);*/

        } else if (report == 'monthly') {
            $scope.report_type = 'monthly';
            $scope.statisticsType = statisticsType;
            $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentmonthlyprod);
            $scope.monthlyFlag = true;
            $('#' + $scope.product_name + ' .chart-render-1').show();
            setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000);
            //var gd1 = document.getElementById("product-chart-yearly0");
		    //Plotly.Plots.resize(gd1);

        } else if (report == 'weekly') {
            $scope.report_type = 'weekly';
            $scope.statisticsType = statisticsType;
            $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentweeklyprod);
            $scope.weeklyFlag = true;
            $('#' + $scope.product_name + ' .chart-render-2').show();
             setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000);
            //var gd1 = document.getElementById("product-chart-yearly0");
		    //Plotly.Plots.resize(gd1);
        } else if (report == 'thisweek') {
            $scope.thisweekFlag = true;
            $scope.report_type = 'thisweek';
            $scope.statisticsType = statisticsType;
            $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentthisweekprod);
            $('#' + $scope.product_name + ' .chart-render-3').show();
             setTimeout(function() {
                $(".full-screen-view").each(function() {
                if($(this).is(':visible')) {
                    
                    var gd1 = $(this).find('.chart-graph').attr('id');
                    Plotly.Plots.resize(gd1);
                }
            });
            }, 3000);
            //var gd1 = document.getElementById("product-chart-yearly0");
		    //Plotly.Plots.resize(gd1);

        }
        }
        else {
            $("#loadergif").show();
        var report_dur = deptFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        


        
        if (report == 'yearly') {

            $scope.report_type = 'yearly';
            $scope.statisticsType = statisticsType;
            $scope.loadYearlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentyearlyprod);
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
            $scope.loadMonthlyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentmonthlyprod);
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
            $scope.loadWeeklyGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentweeklyprod);
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
            $scope.report_type = 'thisweek';
            $scope.statisticsType = statisticsType;
            $scope.loadThisWeekGraph($scope.report_type, 'vertical_bar_chart', $scope.statisticsType, currentthisweekprod);
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
        if(chartType == 'polar_chart') {
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
        
        //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
        //$('.chart-render-' + $scope.chartId).show();
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    };
   /* $scope.changeChangeInside = function (event, chartType) {
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
        

        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

    }*/
    
    $scope.loadYearlyGraph = function (reportType, chartType, statisticsType, currentprod) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        if(currentprod != "" && currentprod != undefined) {
            $scope.product_name = currentprod;
            product_name = currentprod;
        }
        

        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaDeptDashboardService.changeGraphUrl(reportType, chartType, statisticsType, $scope.product_name).then(function (response) {
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly0', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-0').show();
                }
                else {
                      Plotly.newPlot($scope.product_name + '-product-chart-yearly4', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                      $('#' + $scope.product_name + ' .chart-render-4').show();
                }
                //Plotly.newPlot('product-chart-yearly0', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }

        });


    }
    $scope.loadMonthlyGraph = function (reportType, chartType, statisticsType, currentprod) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        if(currentprod != "" && currentprod != undefined) {
            $scope.product_name = currentprod;
            product_name = currentprod;
        }
        

        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaDeptDashboardService.changeGraphUrl(reportType, chartType, statisticsType, $scope.product_name).then(function (response) {
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-1').show();
                }
                else {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly5', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-5').show();
                }
                //Plotly.newPlot('product-chart-yearly1', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
                
            }
        });
    }
    $scope.loadWeeklyGraph = function (reportType, chartType, statisticsType, currentprod) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        
        if(currentprod != "" && currentprod != undefined) {
            $scope.product_name = currentprod;
            product_name = currentprod;
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaDeptDashboardService.changeGraphUrl(reportType, chartType, statisticsType, $scope.product_name).then(function (response) {
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
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly2', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-2').show();
                }
                else {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly6', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-6').show();
                }
                //Plotly.newPlot('product-chart-yearly2', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }

        });
    }
    $scope.loadThisWeekGraph = function (reportType, chartType, statisticsType, currentprod) {
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        $scope.product_name = product_name;
        if(currentprod != "" && currentprod != undefined) {
            $scope.product_name = currentprod;
            product_name = currentprod;
        }
        $scope.chartType = chartType;
        $scope.report_type = reportType;
        $scope.statisticsType = statisticsType;
        lupaDeptDashboardService.changeGraphUrl(reportType, chartType, statisticsType, $scope.product_name).then(function (response) {
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-3').show();
                }
                else {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly7', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-7').show();
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
        lupaDeptDashboardService.loadThisWeekShiftGraphUrl(report_type,'vertical_bar_chart', statisticsType).then(function (response) {
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
                ;		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total number of hours used";
                		
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
                //$('.chart-render-' + $scope.chartId).show();
                if(statisticsType == 'license_statistics') {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-3').show();
                }
                else {
                     Plotly.newPlot($scope.product_name + '-product-chart-yearly7', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                     $('#' + $scope.product_name + ' .chart-render-7').show();
                }
                //Plotly.newPlot('product-chart-yearly3', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                $("#loadergif").hide();
            }
        });
    }

    $scope.changeGraph = function (deptFilter, event,reportType, chartType, statisticsType, currentprod) {
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $scope.chartType = chartType;
        var report_dur = deptFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        if($scope.report_type == 'thisweek') {
            $scope.report_type = 'this_week';
        }
        $scope.statisticsType = statisticsType;
        $('#loadergif').show();
        $(".chart-container .chart").removeClass("active-chart");
        $(event.target).closest(".chart").addClass("active-chart");
        lupaDeptDashboardService.changeGraphUrl($scope.report_type, chartType, statisticsType, currentprod).then(function (response) {

            // common to all graph
            product_name = currentprod;
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
                autosize : true

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
            if($scope.individualSet) {
                $scope.response = $scope.individualResponse;
            }
            else {
                $scope.response = response.data;
            }
            
            if(chartType != "polar_chart") {
                if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                    $scope.addedFav = $scope.response[0].favourite;
                }
            }

            if ($scope.response) {
                $('#loadergif').hide();
                if (chartType == "vertical_bar_chart") {
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        
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
                            if($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                var xVal = $scope.response[i].label;
                                var yVal = $scope.response[i].value;
                                var name = "yearly";
                            }
                            else {
                                xVal = xAxisVal;
                                yVal = $scope.response[i].license;
                                var name = $scope.response[i].year
                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
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
                    var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie',
                        textinfo: 'none'
                    }];
                    var layout = {};
                    if($scope.report_type == "yearly") {
                            layout.title = product_name +  ' / Yearly Report';
                        }
                        else if($scope.report_type == "monthly"){
                             layout.title = product_name +  ' / Monthly Report';
                         }
                        else if($scope.report_type == "weekly"){
                                layout.title = product_name +  ' / Weekly Report';
                        }
                        else {
                                layout.title = product_name +  ' / This week Report';
                        }
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout);


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
                            if($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                var xVal = $scope.response[i].label;
                                var yVal = $scope.response[i].value;
                                if($scope.report_type == "monthly") {
                                    name = $scope.response[i].label;
                                    xVal = xAxisVal;
                                }
                                else {
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                xVal = xAxisVal;
                                yVal = $scope.response[i].license;
                                var name = $scope.response[i].year
                            }
                            
                            
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
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
                            title: 'Total number of license',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5

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


                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "stacked_bar_chart") {
                    console.log(layout);
                    
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
                            if($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                var xVal = $scope.response[i].label;
                                var yVal = $scope.response[i].value;
                                if($scope.report_type == "monthly") {
                                    name = $scope.response[i].label;
                                    xVal = xAxisVal;
                                }
                                else {
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                xVal = xAxisVal;
                                yVal = $scope.response[i].license;
                                var name = $scope.response[i].year
                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
                                type: 'bar',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }





                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
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




                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                                    
                                    size.push($scope.response[i].license[j] / 7)
                                } else {
                                    size.push($scope.response[i].license[j]);
                                    
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

                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                if(chartType == 'polar_chart') {
                    $scope.drawReportPolarChart($scope.response,$scope.chartRenderId, reportType);
                    $scope.weeklyresponse = $scope.response;

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
    
    
    $scope.addedFav = false;
    $scope.individualSet = false;
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
    $scope.getDeptReportFilter = function (userFilterType, defaultFilterVal,currentProduct) {
        defaultFilterVal = defaultFilterVal.toString();
        $scope.userLogged = localStorageService.get('user')[0].name;
        lupaDeptDashboardService.getDepartmentManagerReportFilterUrl($scope.userLogged, currentProduct, "license_statistics", "vertical_bar_chart", userFilterType, defaultFilterVal, $scope.report_type).then(function (response) {
            $scope.departmentUserMonthlyData = response.data;
            $scope.defaultFilterVal = defaultFilterVal;
            
            if($scope.report_type == "monthly") {
                $scope.drawGraph($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
                
            }
            else {
                $scope.drawGraph($scope.departmentUserMonthlyData[0],currentProduct, defaultFilterVal);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
            }
                
            
        });

    }
    $scope.changeGraphDeptReportFilter = function (e, report_type, defaultFilterVal, indChartType, statisticsType, currentProduct) {
        defaultFilterVal = defaultFilterVal.toString();
        $scope.statisticsType = statisticsType;
        $scope.indChartType = indChartType;
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $(".chart-container .chart").removeClass("active-chart");
        $(e.target).closest(".chart").addClass("active-chart");
        $scope.userLogged = localStorageService.get('user')[0].name;
        lupaDeptDashboardService.getDepartmentManagerReportFilterUrl($scope.userLogged, currentProduct, statisticsType, indChartType, 'user', defaultFilterVal, report_type).then(function (response) {
            $scope.departmentUserMonthlyData = response.data;
            //$scope.defaultFilterVal = defaultFilterVal;
            
            if($scope.report_type == "monthly") {
                $scope.drawGraphIndividual($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
                
                
            }
            else {
                $scope.drawGraphIndividual($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
            }
                
            
        });

    }
    $scope.drawGraphIndividual = function(chartData, currentProduct, defaultFilterVal) {
        
        chartType = $scope.indChartType;
        product_name = currentProduct;
        $('#loadergif').show();
       
        

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
                autosize : true

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
            $scope.response = chartData;
            
            if(chartType != "polar_chart") {
                if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                    $scope.addedFav = $scope.response[0].favourite;
                }
            }

            if ($scope.response) {
                $('#loadergif').hide();
                if (chartType == "vertical_bar_chart") {
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek') {
                        
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
                        if(defaultFilterVal != undefined) {
                            $scope.defaultFilterVal = defaultFilterVal;
                        }
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                name: $scope.defaultFilterVal,
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
                    var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie',
                        textinfo: 'none'
                    }];
                    var layout = {};
                    if($scope.report_type == "yearly") {
                            layout.title = product_name +  ' / Yearly Report';
                        }
                        else {
                             layout.title = product_name +  ' / Monthly Report';
                    }
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout);


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
                            plotDataBarY.push({
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                name: $scope.defaultFilterVal,
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
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                name: $scope.defaultFilterVal,
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
                                x: $scope.response[i].value,
                                y: $scope.response[i].label,
                                name: $scope.defaultFilterVal,
                                type: 'bar',
                                orientation: 'h',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }


                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "stacked_bar_chart") {
                    console.log(layout);
                    
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
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                name: $scope.defaultFilterVal,
                                type: 'bar',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }





                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
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
                                y: $scope.response[i].value,
                                type: 'box',
                                name: $scope.defaultFilterVal
                            })
                        }
                    }




                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name +  ' / ' + $scope.report_type + ' Report',
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
                                    
                                    size.push($scope.response[i].license[j] / 7)
                                } else {
                                    size.push($scope.response[i].license[j]);
                                    
                                }
                            }
                            plotDataBarY.push({
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                mode: 'markers',
                                marker: {
                                    size: size
                                },
                                name: $scope.defaultFilterVal
                            });
                        }
                    }






                    
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
                                x: $scope.response[i].label,
                                y: $scope.response[i].value,
                                name: $scope.defaultFilterVal,
                                mode: 'markers',
                                type: 'scatter',
                                marker: {
                                    color: d3colors(i)
                                }
                            })
                        }
                    }

                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                }
                if(chartType == 'polar_chart') {
                    $scope.drawReportPolarChart($scope.response,$scope.chartRenderId, reportType);
                    $scope.weeklyresponse = $scope.response;

                }

            }
        



    
    }
    $scope.drawGraph = function (chartData,currentProduct, defaultFilterVal) {
        product_name = currentProduct;
        $("#loadergif").hide();
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
            if(defaultFilterVal != undefined) {
                $scope.defaultFilterVal = defaultFilterVal;
            }
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
        else if ($scope.report_type == "monthly" && $scope.userFilterType == "user") {
            for (i = 0; i < chartData.length; i++) {
                plotDataBarY.push({
                    x: monthArray,
                    y: chartData[i].license,
                    name: chartData[i].username,
                    type: 'bar',
                    marker: {
                        color: d3colors(i)
                    }
                });
            }
        } else if ($scope.report_type == 'thisweek') {
            
            //$scope.thisWeekCommonChartType($scope.response[0]);
            layout.title = product_name +  ' / This Week Report';
            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            var plotDataBarY = [];
            //chartData = {"license" : [{"morning":[0,0,0,0,0,0,0]},{"afternoon":[0,0,0,0,0,0,0]},{"evening":[0,0,0,0,0,0,0]}]}
            for (var i = 0; i < chartData.license.length; i++) {
                

                for (key in chartData.license[i]) {
                    

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

        
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        





    }
    $scope.userFilterType = 'user';
    $scope.reportDeptFilter = function (e, deptFilter, userFilterType, defaultFilterVal,currentProduct) {
        var report_dur = deptFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];

        $scope.defaultFilterVal = defaultFilterVal;
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $("#loadergif").show();
        if (userFilterType == 'dept') {
            $scope.userFilterType = 'dept';
        }
       
        if ($scope.report_type == "yearly") {
            $scope.getDeptReportYearList(userFilterType, defaultFilterVal,currentProduct);
            
            
        }
        else if($scope.report_type == "monthly") {
            //$scope.defaultFilterVal = $scope.defaultFilterUserVal;
            $scope.getDeptReportFilter(userFilterType, defaultFilterVal,currentProduct);
           
        }
        else {

            $scope.getDeptReportFilter(userFilterType, defaultFilterVal,currentProduct);
        }


        
    };
    $scope.getDeptReportYearList = function (userFilterType, defaultFilterVal, currentProduct) {
        $scope.userLogged = localStorageService.get("user")[0].name;
        lupaDeptDashboardService.getDeptReportYearListUrl($scope.userLogged, currentProduct).then(function (response) {
        //lupaDeptDashboardService.getDeptReportYearListUrl("Harish", "LSDYNA").then(function (response) {
            if (response.data != undefined || response.data != '') {
                $("#loadergif").hide();
                //$scope.deptReportYearList = response.data;
                $scope.deptReportYearList[currentProduct] = response.data;


                $scope.defaultFilterVal = $scope.deptReportYearList[currentProduct][0].year;
                $scope.getDeptReportFilter(userFilterType, defaultFilterVal,currentProduct);
                
            }



        });


        
    }

    //load data to get year value
    $scope.getDeptReportYearListLoad = function () {
        $scope.userLogged = localStorageService.get("user")[0].name;
        
        //var product_name = product_name;
        lupaDeptDashboardService.getDeptReportYearListUrl($scope.userLogged, product_name).then(function (response) {
            //lupaDeptDashboardService.getDeptReportYearListUrl("Harish", "LSDYNA").then(function (response) {
            if (response.data != undefined || response.data != '') {
                $scope.deptReportYearList = response.data;
                //$scope.deptReportYearList[currentProduct] = response.data;

                $scope.defaultFilterVal = $scope.deptReportYearList[0].year;
                
            }



        });

    }
    $scope.getDeptReportFilterUserListLoad = function () {
        $scope.userLogged = localStorageService.get("user")[0].name;
        $scope.userFilterId = localStorageService.get("user")[0].id;
        //var product_name = product_name;
        lupaDeptDashboardService.getDeptReportFilterUserListUrl($scope.userFilterId).then(function (response) {
        //lupaDeptDashboardService.getDeptReportYearListUrl("Harish", "LSDYNA").then(function (response) {
            if (response.data != undefined || response.data != '') {
                $scope.deptReportYearList = JSON.parse(response.data.status_response);
                $scope.deptReportYearList = $scope.deptReportYearList.data
                $scope.deptReportUserList = $scope.deptReportYearList;

                $scope.defaultFilterUserVal = $scope.deptReportYearList[0];
                
            }



        });

    }
     
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        if($scope.currentProducts.indexOf(item) == -1) {
                $scope.currentProducts.push(item);
            }
        $scope.activeMenu = item;

        //$("#reports, #duration").slideDown();
    }

    $scope.getDeptReportFilterUserListLoad();
    $scope.getDeptReportYearListLoad();
    $scope.drawReportPolarChart = function(polarChartData,chartRenderPolarId, reportType) {
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
    if(reportType == "thisweek") {
        layout.title = product_name + " / License used in this week";
        
    }

    Plotly.newPlot(chartRenderPolarId, polarData, layout);
    
    }

    if($scope.report_type == 'yearly') {
        $scope.loadReport("yearly_overall", "license_statistics");
        
    }
    else if($scope.report_type == 'weekly') {
        $scope.loadReport("weekly_overall", "license_statistics");
    }
    else if($scope.report_type == 'thisweek') {
        $scope.loadReport("thisweek_overall", "license_statistics");
    }
    else {
        $scope.loadReport("monthly_overall", "license_statistics");
    }



}]);