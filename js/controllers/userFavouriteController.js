lupaApp.controller('userFavouriteController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaUserDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
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
            $scope.response = $scope.response.favourites_list[0].data;
            $scope.response = JSON.parse($scope.response);
            for (i = 0; i < $scope.response.length; i++) {
                plotDataBarY = [];
                console.log("favourite item", $scope.response[i]);
                if ($scope.response[i].report_type == 'weekly') {
                    layout.title = 'LSDYNA ' + $scope.response[i].report_type + ' / report'
                    var xAxisVal = ['1st week', '2nd week', '3rd week', '4th week', '5th week'];
                    for (j = 0; j < $scope.response[i].license.length; j++) {
                        for (key in $scope.response[i].license[j]) {
                            plotDataBarY.push({
                                x: xAxisVal,
                                y: $scope.response[i].license[j][key],
                                name: key,
                                type: 'bar',
                                marker: {
                                    color: d3colors(j)
                                }
                            })

                        }

                    }
                }
                else if($scope.response[i].report_type == "yearly" || $scope.response[i].report_type == "monthly") {
                    layout.title = 'LSDYNA ' + $scope.response[i].report_type + ' / report'
                    
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
                else  if($scope.response[i].report_type == "this_week"){
                     var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    var plotDataBarY = [];
                    layout.title = 'LSDYNA ' + $scope.response[i].report_type + ' / report';
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

                

                $(".chart-render-"+i).show();
                layout.title = 
                Plotly.newPlot('product-chart-yearly' + i, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                var gd1 = document.getElementById("product-chart-yearly"+i);
                Plotly.Plots.resize(gd1);


            }







        });
    }
    $scope.getfavourite();
}]);