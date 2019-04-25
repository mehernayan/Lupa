lupaApp.controller('deptReportController', ['$scope', 'userData', 'lupaDeptDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaDeptDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    localStorageService.set("weeklyReportIndividualFilter", "");
    var product_name = localStorageService.get("product_name");
    $scope.reportyearlist =[];
    $scope.reportyearlists = [];
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
    $scope.daySession = ['Morning', 'Afternoon', 'Evening'];
    $scope.monthList = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.deptFilterYearly = 'yearly_overall';
    $scope.deptFilterYearlyLicense = 'yearly_overall';
    $scope.deptFilterYearlyTime = 'yearly_overall';
    $scope.deptFilterMonthly = 'monthly_overall';
    $scope.deptFilterMonthlyLicense = 'monthly_overall';
    $scope.deptFilterMonthlyTime = 'monthly_overall';
    $scope.deptFilterWeekly = 'weekly_overall';
    $scope.deptFilterWeeklyLicense = 'weekly_overall';
    $scope.deptFilterWeeklyTime = 'weekly_overall';
    $scope.deptFilterThisWeek = 'thisweek_overall';
    $scope.deptFilterThisWeekLicense = 'thisweek_overall';
    $scope.deptFilterThisWeekTime = 'thisweek_overall';
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
            tickangle: -20,
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
            }, 2000)
            
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
            }, 2000);
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
            }, 2000);
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
            }, 2000);
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
                }, 2000);

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
             }, 2000);

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
             }, 2000);
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
             }, 2000);

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

    $scope.weeklyYearChange = function(event, reportyear, chartType, currentprod, statisticsType) {
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
                tickangle: -20,
            },
            yaxis: {
                showgrid: true,
                title: 'Total number of license',
                showline: true
            },
            barmode: 'group',
            bargroupgap: 0.5

        };
        
        var mode = '';
        var fill = '';
        var type = 'bar';
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $scope.reportPieChartYear = reportyear;
        localStorageService.set("weeklyReportYearOverall", reportyear);
        var weeklyresponse = localStorageService.get("deptweekly"+statisticsType+currentprod);
        $scope.weeklyresponse = JSON.parse(weeklyresponse);
        
        if (statisticsType == 'license_statistics') {
            layout.yaxis.title = "Total number of license";
        }
        else if (statisticsType == 'time_statistics') {
            layout.yaxis.title = "Total percentage utilized";
        }
        if(chartType == "pie_chart") {
            $scope.piechartWeeklyData = [];
            for(i=0;i<$scope.weeklyresponse.length;i++) {
                if($scope.weeklyresponse[i].year == reportyear) {
                    $scope.piechartWeeklyData.push($scope.weeklyresponse[i])
                }
            }
            
            for(i=0;i<$scope.piechartWeeklyData[0].license.length;i++) {
                if($scope.piechartWeeklyData[0].license[i].hasOwnProperty($scope.monthNamePieChart)) {
                    $scope.piechartWeeklyDataLicense = [];
                    $scope.piechartWeeklyDataLicense = $scope.piechartWeeklyData[0].license[i][$scope.monthNamePieChart];
                }
            }
            
            
            $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
            var plotDataBarY = [{
                            values: $scope.piechartWeeklyDataLicense,
                            labels: $scope.pieLabel,
                            type: 'pie',
                            textinfo: 'label+text+value'
            }];
            /*if(chartType == "weekly") {
                plotly.newPlot($scope.chartRenderId, plotDataBarY, {}, plotlyDefaultConfigurationBar);
                
            }*/
            
            
            
            
        }
        
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
        if(chartType == 'scatter_chart') {
            var type = 'scatter';
            var mode = 'markers';
        }
        var plotDataBarY = [];
        var response = [];
        var reportyear = reportyear;
        if(chartType == "horizontal_bar_chart") {
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
           
           for (j = 0; j < $scope.weeklyresponse.length; j++) {
                if (reportyear == $scope.weeklyresponse[j].year) {
                    response.push($scope.weeklyresponse[j]);

                }

            }
            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
            layout.title = product_name + ' / ' + $scope.report_type + ' Report';
            if(response[0] != undefined) {
                for (var i = 0; i < response[0].license.length; i++) {
                for (key in response[0].license[i]) {
                    plotDataBarY.push({
                        x: response[0].license[i][key],
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
            
            
            Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        }

        if (chartType == 'polar_chart') {
            for (j = 0; j < $scope.weeklyresponse.length; j++) {
                if (reportyear == $scope.weeklyresponse[j].year) {
                    response.push($scope.weeklyresponse[j]);

                }

            }
            //$scope.response = response;
            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
            layout.title = product_name + ' / ' + $scope.report_type + ' Report';
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
        else if(chartType == 'bubble_chart') {
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
        else if (chartType == "box_plot_styling_outliers_chart") {
            $scope.response = [];
            for (j = 0; j < $scope.weeklyresponse.length; j++) {
                if (reportyear == $scope.weeklyresponse[j].year) {
                    $scope.response.push($scope.weeklyresponse[j]);

                }
            }


            layout.barmode = 'stack';
            var plotDataBarY = [];

            var plotDataBarY = [];
            layout.title = product_name + ' / ' + $scope.report_type + ' Report';
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
            Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);




        } else if(chartType != "pie_chart" && chartType != "horizontal_bar_chart"){
            
            for (j = 0; j < $scope.weeklyresponse.length; j++) {
                if (reportyear == $scope.weeklyresponse[j].year) {
                    response.push($scope.weeklyresponse[j]);

                }

            }
            
            //$scope.response = response;
            var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
            layout.title = product_name + ' / ' + $scope.report_type + ' Report';
            if(response[0] != undefined) {
                for (var i = 0; i < response[0].license.length; i++) {
                for (key in response[0].license[i]) {
                    plotDataBarY.push({
                        x: xAxisVal,
                        y: response[0].license[i][key],
                        name: monthArray[i],
                        type: type,
                        fill: fill,
                        mode: mode,
                        marker: {
                            color: d3colors(i)
                        }
                    })

             }

            }
            }
           Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        }
         

        //$('.chart-render-' + $scope.chartId).show();
        
        

    };
   
    
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total percentage utilized";
                		
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
            if (!$scope.response.length) {

                $("#loadergif").hide();
            
                if ($scope.statisticsType == 'license_statistics') {
            
                    $('#' + $scope.product_name + ' .chart-render-0').hide();
            
                }
            
                else {
            
                    $('#' + $scope.product_name + ' .chart-render-4').hide();
            
                }
            
                return;
            
            }
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                //$('#loadergif').hide();
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
                    });
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total percentage utilized";
                		
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
            if (!$scope.response.length) {

                $("#loadergif").hide();
            
                if ($scope.statisticsType == 'license_statistics') {
            
                    $('#' + $scope.product_name + ' .chart-render-1').hide();
            
                }
            
                else {
            
                    $('#' + $scope.product_name + ' .chart-render-5').hide();
            
                }
            
                return;
            
            }
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total percentage utilized";
                		
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
            if (!$scope.response.length) {

                $("#loadergif").hide();
            
                if ($scope.statisticsType == 'license_statistics') {
            
                    $('#' + $scope.product_name + ' .chart-render-2').hide();
            
                }
            
                else {
            
                    $('#' + $scope.product_name + ' .chart-render-6').hide();
            
                }
            
                return;
            
            }
            if ($scope.response[0] != "" || $scope.response[0] != undefined) {
                $scope.addedFav = $scope.response[0].favourite;
            }
            if ($scope.response) {
                $('#loadergif').hide();
                var plotDataBarY = [];
                layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                $scope.weeklyresponse = $scope.response;
                localStorageService.set('deptweekly' + statisticsType + $scope.product_name, JSON.stringify($scope.response));
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
                $scope.reportyearlists[$scope.product_name] = $scope.reportyearlist;

                
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total percentage utilized";
                		
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
            if (!$scope.response.length) {

                $("#loadergif").hide();
            
                if ($scope.statisticsType == 'license_statistics') {
            
                    $('#' + $scope.product_name + ' .chart-render-3').hide();
            
                }
            
                else {
            
                    $('#' + $scope.product_name + ' .chart-render-7').hide();
            
                }
            
                return;
            
            }
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
                		

            }
            else if ($scope.statisticsType == 'time_statistics') {
                layout.yaxis.title = "Total percentage utilized";
                		
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
        if($scope.report_type == 'weekly') {
            $(event.target).closest('.chart-container').find('.weekly-section input:radio:first').prop("checked", true);
            $(event.target).closest('.chart-render').find('.pie-dropdown').removeClass('show');
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
                    tickangle: -20,
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
                layout.yaxis.title = "Total percentage utilized";
                		
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
            /*if($scope.individualSet) {
                $scope.response = $scope.individualResponse;
            }
            else {
                $scope.response = response.data;
            }*/
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;
                        

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
                    $scope.pieChartTotalReponse = $scope.response;
                    localStorageService.set("deptweeklypie" + currentprod + statisticsType, $scope.pieChartTotalReponse);
                    $scope.thisWeekPieRespData =  $scope.response[0].license;
                    var plotDataBarY = [{
                        values: $scope.response[0].value,
                        labels: $scope.response[0].label,
                        type: 'pie',
                        textinfo: 'label+text+value'
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
                                $(event.target).closest('.chart-render').find('.pie-dropdown').addClass('show');
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
                                $scope.reportyearlists[currentprod] = $scope.reportyearlist;
                        }
                        else {
                                layout.title = product_name +  ' / This week Report';
                        }
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout);


                }
                if (chartType == 'line_chart') {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        
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
                                fill: 'tozeroy',
                                type: 'scatter'

                            })
                        }
                    }

                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "horizontal_bar_chart") {
                     var layout = {
                        title: product_name + ' / Yearly Report',
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
                    if ($scope.statisticsType == 'license_statistics') {
                        layout.xaxis.title = "Total number of license";
                                

                    }
                    else if ($scope.statisticsType == 'time_statistics') {
                        layout.xaxis.title = "Total percentage utilized";
                                
                    }
                    
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        //debugger;
                    }
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                                x: yVal,
                                y: xVal,
                                name: name,
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    if($scope.report_type == "weekly") {
                        var plotDataBarY = [];
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        
                    }
                    else if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        title: product_name +  ' / '+ $scope.report_type +' Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                size = [];
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    }
                    else {
                        plotDataBarY = [];
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






                    
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, {
                        showSendToCloud: true
                    });
                    

                }

                if (chartType == 'scatter_chart') {

                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    $scope.drawReportPolarChart($scope.response,$scope.chartRenderId, reportType, product_name);
                    $scope.weeklyresponse = $scope.response;
                    localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));

                }

            } else {
                $scope.error = $scope.response.message;
                $scope.user.password = "";
            }
        });



    }
    $scope.changeGraphIndividual = function (deptFilter, event,reportType, chartType, statisticsType, currentprod) {
        $scope.thiweeksNamePieChart = "morning";
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
        if($scope.report_type == 'weekly') {
            $(event.target).closest('.chart-container').find('.weekly-section input:radio:first').prop("checked", true);
            $(event.target).closest('.chart-render').find('.pie-dropdown').removeClass('show');
            $scope.filter_user =  $(event.target).closest('.chart-container').find(".usertype-filter-weekly select:visible option:selected").text();
        }
        else if($scope.report_type == "this_week" || $scope.report_type == "thisweek") {
            $scope.filter_user = $scope.defaultFilterVal;
        }
        else {
            $scope.filter_user = ""; 
        }
        
        lupaDeptDashboardService.getDepartmentManagerReportFilterUrl($scope.userLogged, currentprod, statisticsType, $scope.chartType, "user", $scope.filter_user, $scope.report_type).then(function (response) {

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
                    tickangle: -20,
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
                layout.yaxis.title = "Total percentage utilized";
                		
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
            /*if($scope.individualSet) {
                $scope.response = $scope.individualResponse;
            }
            else {
                $scope.response = response.data;
            }*/
            $scope.response = response.data;
            if(statisticsType == 'license_statistics') {
                $scope.pieDeptIndMonthlyLicense =  $scope.response;
                
            }
            else {
                $scope.pieDeptIndMonthlyTime =  $scope.response;
            }
            $scope.pieDeptIndMonthly = $scope.response;
                    $scope.deptIndPieUserList = [];
                    for(i=0;i<$scope.pieDeptIndMonthly.length;i++) {
                        $scope.deptIndPieUserList.push($scope.pieDeptIndMonthly[i].username)
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                                var name = $scope.response[i].username
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
                        values: $scope.response[0].license,
                        labels: $scope.response[0].label,
                        type: 'pie',
                        textinfo: 'label+text+value'
                    }];
                    var layout = {};
                    if($scope.report_type == "yearly") {
                            layout.title = product_name +  ' / Yearly Report';
                        }
                        else if($scope.report_type == "monthly"){
                             layout.title = product_name +  ' / Monthly Report';
                              var plotDataBarY = [{
                                values: $scope.response[0].license,
                                labels: monthArray,
                                type: 'pie',
                                textinfo: 'label+text+value'
                            }];
                         }
                        else if($scope.report_type == "weekly"){
                                layout.title = product_name +  ' / Weekly Report';
                                var plotDataBarY = [];
                                $scope.pieChartTotalReponse = $scope.response;
                                localStorageService.set("deptweeklypie" + currentprod + statisticsType, $scope.pieChartTotalReponse);
                                $scope.pieLabel = ["1st week", "2nd week", "3rd week", "4th week", "5th week"];
                                $scope.defaultWeekDataSet = $scope.response[$scope.response.length - 1].license[0];
                                $scope.defaultWeekData = $scope.response[$scope.response.length - 1].license[0].january;
                                $(event.target).closest('.chart-render').find('.pie-dropdown').addClass('show');
                                var sum = $scope.defaultWeekData.reduce(function(a, b) { return a + b; }, 0);
                                if(sum == 0) {
                                    $scope.noPieChartDataMessage = true;
                                }
                                
                                
                                var plotDataBarY = [{
                                    values: $scope.defaultWeekData,
                                    labels: $scope.pieLabel,
                                    type: 'pie',
                                    textinfo: 'label+text+value'
                                }];
                        }
                        else {
                                layout.title = product_name +  ' / This week Report';
                        }
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout);
                    //debugger;


                }
                if (chartType == 'line_chart') {

                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                                var name = $scope.response[i].year;
                                if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    xVal = xAxisVal;
                                }
                                
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        
                        for (i = 0; i < $scope.response.length; i++) {
                            if($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                var xVal = $scope.response[i].label;
                                var yVal = $scope.response[i].value;
                                var name = "yearly";
                            }
                            else {
                                xVal = xAxisVal;
                                yVal = $scope.response[i].license;
                                var name = $scope.response[i].year;
                                if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    xVal = xAxisVal;
                                }
                                
                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
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
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                    if ($scope.statisticsType == 'license_statistics') {
                        layout.xaxis.title = "Total number of license";
                                

                    }
                    else if ($scope.statisticsType == 'time_statistics') {
                        layout.xaxis.title = "Total percentage utilized";
                                
                    }
                    
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
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
                                if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    xVal = xAxisVal;
                                }
                            plotDataBarY.push({
                                x: yVal,
                                y: xVal,
                                name: name,
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                            if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    xVal = xAxisVal;
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
                    if($scope.report_type == "weekly") {
                        var plotDataBarY = [];
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        
                    }
                    else if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    xVal = xAxisVal;
                        }
                        else {
                            name = $scope.response[i].year;
                        }
                        for (i = 0; i < $scope.response.length; i++) {
                            plotDataBarY.push({
                                y: $scope.response[i].license,
                                type: 'box',
                                name: name
                            })
                        }
                        
                    }
                    




                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name +  ' / '+ $scope.report_type +' Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                size = [];
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    }
                    else {
                        for (i = 0; i < $scope.response.length; i++) {
                            size = [];
                            size = $scope.bubbleSize($scope.response[i].license);
                            if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    
                            }
                            else {
                                    name = $scope.response[i].year;
                            }
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license,
                                mode: 'markers',
                                marker: {
                                    size: size
                                },
                                name: name
                            });
                        }
                    }






                    
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, {
                        showSendToCloud: true
                    });

                }

                if (chartType == 'scatter_chart') {

                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;

                        
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
                            if($scope.report_type == "monthly") {
                                    name = $scope.response[i].username;
                                    
                            }
                            else {
                                    name = $scope.response[i].year;
                            }
                            
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: name,
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
                    $scope.drawReportPolarChartIndividual($scope.response,$scope.chartRenderId, reportType);
                    $scope.weeklyresponse = $scope.response;
                    localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));

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



   
    
    
    $scope.addedFav = false;
    $scope.individualSet = false;
    $scope.addToFavourite = function (event,reportType, chartType, statisticsType, currentprod) {
        if(reportType == 'weekly' && chartType == 'pie_chart') {
            defaultVal = $(event.target).closest('.chart-render').find('.weekly-section input:checked').attr('data-attr');
            localStorageService.set("weeklyReportYearOverall", defaultVal);
        }
        
        $scope.addedFav = true;
        //$scope.userLogged = localStorageService.get("user");
        //console.log($scope.chartType, $scope.statisticsType);
        $scope.userLogged = localStorageService.get('user');

        var user_id = $scope.userLogged[0].id;
        console.log(user_id);
        var product_name = "LSDYNA";
        //var statisticsType = "license_statistics";
        var report_type = "yearly";
        var favourite = 1;
        var role = "user";
        var api = "";
        lupaDeptDashboardService.addFavouriteUrl(reportType, chartType, statisticsType, currentprod).then(function (response) {
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
    $scope.getDeptReportFilter = function (userFilterType, defaultFilterVal,currentProduct, statisticsIndType) {
        defaultFilterVal = defaultFilterVal.toString();
        
        $scope.userLogged = localStorageService.get('user')[0].name;
        lupaDeptDashboardService.getDepartmentManagerReportFilterUrl($scope.userLogged, currentProduct, statisticsIndType, "vertical_bar_chart", userFilterType, defaultFilterVal, $scope.report_type).then(function (response) {
            $scope.departmentUserMonthlyData = response.data;
            
            $scope.defaultFilterVal = defaultFilterVal;
            
            if($scope.report_type == "monthly") {
                $scope.drawGraph($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal, statisticsIndType);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
                
                
            }
            else if($scope.report_type == "weekly"){
                $scope.reportyearlist = [];
                for (i = 0; i < $scope.departmentUserMonthlyData.length; i++) {
                    if (i == 0) {
                        $scope.reportyearlist.push({
                            "year": $scope.departmentUserMonthlyData[i].year,
                            "checked": true
                        });
                    } else {
                        $scope.reportyearlist.push({
                            "year": $scope.departmentUserMonthlyData[i].year,
                            "checked": false
                        });
                    }

                };
                $scope.reportyearlists[currentProduct] = $scope.reportyearlist;
                
                $scope.drawGraph($scope.departmentUserMonthlyData[0],currentProduct, defaultFilterVal, statisticsIndType);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
                
                
            }
            else {
                $scope.drawGraph($scope.departmentUserMonthlyData[0],currentProduct, defaultFilterVal, statisticsIndType);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
            }
                
            
        });

    }
    $scope.changeGraphDeptReportFilter = function (e, report_type, defaultFilterVal, indChartType, statisticsType, currentProduct) {
        $("#loadergif").show();
        defaultFilterVal = defaultFilterVal.toString();
        if($scope.report_type == 'yearly' || $scope.report_type == 'monthly') {
            defaultFilterVal = $(event.target).closest('.chart-render').find('.admin-year-label input:checked').attr('data-attr');
        }
        $scope.statisticsType = statisticsType;
        $scope.indChartType = indChartType;
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $(".chart-container .chart").removeClass("active-chart");
        $(e.target).closest(".chart").addClass("active-chart");
        $scope.userLogged = localStorageService.get('user')[0].name;
        lupaDeptDashboardService.getDepartmentManagerReportFilterUrl($scope.userLogged, currentProduct, statisticsType, indChartType, 'user', defaultFilterVal, report_type).then(function (response) {
            $scope.departmentUserMonthlyData = response.data;
            $("#loadergif").hide();
            //$scope.defaultFilterVal = defaultFilterVal;
            
            if($scope.report_type == "monthly") {
                $scope.drawGraphIndividual($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal, statisticsType);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
                
                
            }
            else {
                $scope.drawGraphIndividual($scope.departmentUserMonthlyData,currentProduct, defaultFilterVal, statisticsType);
                $scope.individualSet = true;
                $scope.individualResponse = $scope.departmentUserMonthlyData;
            }
                
            
        });

    }
    $scope.drawGraphIndividual = function(chartData, currentProduct, defaultFilterVal, statisticsType) {
        
        chartType = $scope.indChartType;
        product_name = currentProduct;
        currentprod = currentProduct;
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
                    tickangle: -20,
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
                layout.yaxis.title = "Total percentage utilized";
                		
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        
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
                        $scope.weeklyresponse = $scope.departmentUserMonthlyData;
                        $scope.response = $scope.departmentUserMonthlyData;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                            if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                
                                

                            }
                            
                            
                            
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: defaultFilterVal,
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
                    var plotDataBarY = [];
                    for (i = 0; i < $scope.response.length; i++) {

                    if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                
                                

                            }
                            plotDataBarY.push({
                                labels: xVal,
                                values: yVal,
                                name: name,
                                type: 'pie',
                                textinfo: 'label+text+value',
                                marker: {
                                    color: d3colors(i)
                                }
                            });
                            

                    
                }
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                            if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: defaultFilterVal,
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                    else if ($scope.report_type == 'weekly') {
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        
                        for (i = 0; i < $scope.response.length; i++) {
                            if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: defaultFilterVal,
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
                            title: 'Total number of license used',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5,
                        autosize: true

                    };
                    if ($scope.statisticsType == 'license_statistics') {
                        layout.xaxis.title = "Total number of license";
                                

                    }
                    else if ($scope.statisticsType == 'time_statistics') {
                        layout.xaxis.title = "Total percentage utilized";
                                
                    }
                    //var marker = ["#"]
                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        for (i = 0; i < $scope.response.length; i++) {
                             if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                x: yVal,
                                y: xVal,
                                name: defaultFilterVal,
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        for (i = 0; i < $scope.response.length; i++) {
                             if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: defaultFilterVal,
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
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                            if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                y: yVal,
                                type: 'box',
                                name: defaultFilterVal
                            })
                        }
                    }




                    //Plotly.newPlot('product-chart-yearly', plotDataBarY, plotlyDefaultConfigurationBar);
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
                if (chartType == "bubble_chart") {
                    var layout = {
                        title: product_name +  ' / '+ $scope.report_type +' Report',
                        showlegend: true,

                    };
                    var plotDataBarY = [];
                    var size = [];

                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
                        //$scope.thisWeekCommonChartType($scope.response[0]);
                        layout.title = product_name +  ' / This Week Report';
                        var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        for (i = 0; i < $scope.response[0].license.length; i++) {
                            for (key in $scope.response[0].license[i]) {
                                size = [];
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
                        layout.title = product_name +  ' / ' + $scope.report_type + ' Report';
                        $scope.weeklyresponse = $scope.response;
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    }
                    else {
                        console.log($scope.response);
                        for (i = 0; i < $scope.response.length; i++) {
                            
                            if($scope.response[0].hasOwnProperty("label")) {
                                $scope.labelVal = $scope.response[0]['value'];
                                size = [];
                                size = $scope.bubbleSize($scope.labelVal);

                                //size.push()
                            }
                            else {
                                size = [];
                                size = $scope.bubbleSize($scope.response[i].license);
                                 
                            }
                            
                            if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                mode: 'markers',
                                marker: {
                                    size: size
                                },
                                name: defaultFilterVal
                            });
                        }
                    }






                    
                    Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, {
                        showSendToCloud: true
                    });

                }

                if (chartType == 'scatter_chart') {

                    var plotDataBarY = [];
                    if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
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
                        localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
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
                        $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                             if($scope.report_type == "yearly") {
                                if ($scope.response[i].label != null || $scope.response[i].label != undefined) {
                                    var xVal = $scope.response[i].label;
                                    var yVal = $scope.response[i].value;
                                    var name = "yearly";
                                }
                                
                            }
                            else {
                                //$scope.response = $scope.response[0];
                                if ($scope.response[i].hasOwnProperty('department')) {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].department;
                                }
                                else {
                                    var xVal = xAxisVal;
                                    var yVal = $scope.response[i].license;
                                    var name = $scope.response[i].username;
                                }
                                

                            }
                            plotDataBarY.push({
                                x: xVal,
                                y: yVal,
                                name: defaultFilterVal,
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
                    $scope.drawReportPolarChartIndividual($scope.response,$scope.chartRenderId, $scope.report_type);
                    $scope.weeklyresponse = $scope.response;
                    localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
                    

                }

            }
        



    
    }
    $scope.drawGraph = function (chartData,currentProduct, defaultFilterVal, statisticsType) {
        if (chartData != "" || chartData != undefined) {
                $scope.addedFav = chartData.favourite;
        }
        product_name = currentProduct;
        currentprod = currentProduct;
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
                tickangle: -20,
            },
            yaxis: {
                showgrid: true,
                title: 'Total number of license',
                showline: true
            },
            barmode: 'group',
            bargroupgap: 0.5

        };
        if ($scope.statisticsType == 'license_statistics') {
                layout.yaxis.title = "Total number of license";
                		

        }
        else if ($scope.statisticsType == 'time_statistics') {
            layout.yaxis.title = "Total percentage utilized";
                    
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
        } else if ($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
            
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
            $scope.weeklyresponse = $scope.departmentUserMonthlyData;
            $scope.response = $scope.departmentUserMonthlyData;
            
            localStorageService.set('deptweekly' + statisticsType + currentprod, JSON.stringify($scope.response));
            


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
    $scope.reportDeptFilter = function (e, deptFilter, userFilterType, defaultFilterVal,currentProduct, statisticsIndType) {
        var report_dur = deptFilter.split("_");
        var report = report_dur[0];
        $scope.report_type = report_dur[0];
        

        $scope.defaultFilterVal = defaultFilterVal;
        localStorageService.set("yearlyReportIndividual", defaultFilterVal);
        if($scope.report_type == "weekly") {
            localStorageService.set("weeklyReportIndividualFilter", defaultFilterVal);
        }
        if($scope.report_type == "this_week" || $scope.report_type == "thisweek") {
            localStorageService.set("thisWeekReportIndividualFilter", defaultFilterVal);
        }
        $scope.chartType = 'vertical_bar_chart';
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        $(e.target).closest(".chart-render").find(".individual-report .chart").removeClass("active-chart");
        $(e.target).closest(".chart-render").find(".individual-report .vbar-chart").addClass("active-chart");
        
        $("#loadergif").show();
        if (userFilterType == 'dept') {
            $scope.userFilterType = 'dept';
        }
       
        if ($scope.report_type == "yearly" && $(event.target).hasClass('individual-filter')) {
            $scope.getDeptReportYearList(userFilterType, defaultFilterVal,currentProduct, statisticsIndType);
            
            
        }
        else if($scope.report_type == "monthly") {
            //$scope.defaultFilterVal = $scope.defaultFilterUserVal;
            $scope.getDeptReportFilter(userFilterType, defaultFilterVal,currentProduct, statisticsIndType);
            
           
        }
        else {

            $scope.getDeptReportFilter(userFilterType, defaultFilterVal,currentProduct, statisticsIndType);
            
            
        }


        
    };
    $scope.getDeptReportYearList = function (userFilterType, defaultFilterVal, currentProduct, statisticsIndType) {
        $scope.userLogged = localStorageService.get("user")[0].name;
        lupaDeptDashboardService.getDeptReportYearListUrl($scope.userLogged, currentProduct, statisticsIndType).then(function (response) {
        //lupaDeptDashboardService.getDeptReportYearListUrl("Harish", "LSDYNA").then(function (response) {
            if (response.data != undefined || response.data != '') {
                $("#loadergif").hide();
                //$scope.deptReportYearList = response.data;
                $scope.deptReportYearList[currentProduct] = response.data;


                $scope.defaultFilterVal = $scope.deptReportYearList[currentProduct][0].year;
                $scope.getDeptReportFilter(userFilterType, $scope.defaultFilterVal,currentProduct, statisticsIndType);
                
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
                $scope.addedFav = polarChartRenderData.favourite;
                
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
                $scope.addedFav = polarChartData.favourite;

            
            
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
                $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                        });
                        $scope.addedFav = $scope.response[0].favourite;
                        
                        

                    }
                    

                }
                
        }
        else if(reportType == "this_week" || reportType == "thisweek") {
            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                polarData.push({
                                type: "scatterpolar",
                                name: "This week chart",
                                r: polarChartData.r,
                                theta: xAxisVal,
                                fill: "toself",
                                subplot: "polar2",
                                fillcolor: '#709BFF'
                            });
                            $scope.addedFav = polarChartData.favourite;        
                                
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
        title: product_name + " / License used " + reportType


    }
    if(reportType == "thisweek") {
        layout.title = product_name + " / License used in this week";
        
    }

    Plotly.newPlot(chartRenderPolarId, polarData, layout);
    
    }
    $scope.drawReportPolarChartIndividual = function(polarChartData,chartRenderPolarId, reportType) {
        var polarData = [];
        if (reportType == "yearly") {
                $scope.addedFav = polarChartData.favourite;
                polarData.push({
                    type: "scatterpolar",
                    name: "license used in ",
                    r: polarChartData.r,
                    theta: polarChartData.theta,
                    fill: "toself",
                    subplot: "polar2",
                    fillcolor: '#709BFF'
                })
           

        }
        else if(reportType == "monthly") {
           $scope.addedFav = polarChartData[0].favourite;
           for(i=0;i<polarChartData.length;i++) {
                polarData.push({
                    type: "scatterpolar",
                    name: polarChartData[i].username,
                    r: polarChartData[i].r,
                    theta: polarChartData[i].theta,
                    fill: "toself",
                    subplot: "polar2",
                    fillcolor: '#709BFF'
                })
           }
               
               
           
            
            
            
        }
        else if(reportType == "weekly") {
                $scope.addedFav = polarChartData[0].favourite; 
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
                $scope.reportyearlists[currentprod] = $scope.reportyearlist;


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
                    'time_statistics'
                    

                }
                
        }
        else if(reportType == "this_week" || reportType == "thisweek") {
            $scope.addedFav = polarChartData.favourite;
            var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                polarData.push({
                                type: "scatterpolar",
                                name: "This week chart",
                                r: polarChartData.r,
                                theta: xAxisVal,
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
        title: product_name + " / License used " + reportType


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
    else if($scope.report_type == 'thisweek' || $scope.report_type == 'this_week') {
        $scope.loadReport("thisweek_overall", "license_statistics");
    }
    else {
        $scope.loadReport("monthly_overall", "license_statistics");
    }

    $scope.changeUserPieData = function(event, userNamePieLicense, currentProduct, statisticsType) {
        if(statisticsType == 'license_statistics') {
            $scope.pieDeptIndMonthly = $scope.pieDeptIndMonthlyLicense;
        }
        else {
            $scope.pieDeptIndMonthly = $scope.pieDeptIndMonthlyTime;
        }
        $scope.chartRenderId = $(event.target).closest(".chart-render").find(".chart-graph").attr('id');
        layout.title = currentProduct + " / Monthly report";
        $scope.pieDeptIndMonthlySelected = [];
        for(i=0;i < $scope.pieDeptIndMonthly.length; i++) {
            if($scope.pieDeptIndMonthly[i].username == userNamePieLicense) {
                $scope.pieDeptIndMonthlySelected.push($scope.pieDeptIndMonthly[i]);
            }
        }
        layout.legend = {x: 1, y: 1};
        var plotDataBarY = [{
                            values: $scope.pieDeptIndMonthlySelected[0].license,
                            labels: monthArray,
                            type: 'pie',
                            textinfo: 'label+text+value'
        }];
        Plotly.newPlot($scope.chartRenderId, plotDataBarY, layout, plotlyDefaultConfigurationBar);
        
    }
    $scope.monthNamePieChart = "january";
    $scope.changeMonthData = function(event, monthNamePieChart, product_name, statisticsType) {
        $scope.pieChartTotalReponse = localStorageService.get("deptweeklypie"+product_name+statisticsType);
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
        layout.title = product_name + " / This Week report";
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
    

}]);