lupaApp.controller('userReportController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', function ($scope, userData, lupaUserDashboardService, $location) {
    $scope.reportSidebar = true;
    $scope.chartType = ['bar', 'pie']



    //changeGraph($scope.chartType[0]);


    var layout = {
        title: 'BETA/CAE / Yearly Report',
        grid: { rows: 1, columns: 1 },
        showlegend: false,
        annotations: [
            {
                font: {
                    size: 14
                },
                showarrow: false,
                x: 0.17,
                y: 0.5,
                text: ''
            }
        ]
    };
    //Bar chart Section goes here

    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var plotlyDefaultConfigurationBar = { responsive: true, displaylogo: false, showTips: true, pan2d: true, modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'] };


    $scope.changeGraph = function (chartType) {

        lupaUserDashboardService.changeGraphUrl().then(function (response) {
            $scope.response = response.data;
            if ($scope.response) {
                if (chartType == "bar") {
                    var layout = {
                        title: 'LSDYNA / Yearly Report',
                        showlegend: true,
                        legend: { "orientation": "h", x: 0.58, y: 1.1 },
                        xaxis: {
                            type: 'category',
                            showgrid: false,
                            gridcolor: '#bdbdbd',
                            gridwidth: 1,
                            tickangle: -45,
                        },
                        yaxis: {
                            showgrid: false,
                            title: 'Total number of license',
                            showline: true
                        },
                        barmode: 'group',
                        bargroupgap: 0.5

                    };
                    var plotDataBarY = [];
                    for (i = 0; i < $scope.response.length; i++) {
                        plotDataBarY.push({
                            x: monthArray,
                            y: $scope.response[i].license,
                            name: $scope.response[i].year,
                            type: 'bar',
                            marker: {
                                color: '#7E99C8'
                            }
                        })
                    }
                    Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);

                }
            } else {
                $scope.error = $scope.response.message;
                $scope.user.password = "";
            }
        });



    }





    $scope.changeGraph($scope.chartType[0]);




}]);