lupaApp.controller('userFavouriteController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaUserDashboardService, $location, localStorageService) {
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.favouriteActive = true;
    $scope.dashboardActive = false;
    $scope.reportSidebar = false;



    $scope.getfavourite = function () {
        $('#loadergif').show();
        lupaUserDashboardService.getFavouriteUrl().then(function (response) {
            $('#loadergif').hide();
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
            $scope.response = JSON.parse(response.data.status_response);
            $scope.response = JSON.parse($scope.response);
            
            
            
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
            Plotly.newPlot('product-chart-yearly', plotDataBarY, layout, plotlyDefaultConfigurationBar);
        });
    }
    $scope.getfavourite();
}]);