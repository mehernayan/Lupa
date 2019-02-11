lupaApp.controller('userFavouriteController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaUserDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.favouriteActive = true;
    $scope.dashboardActive = false;
    



    $scope.getfavourite = function () {
        $('#loadergif').show();
        lupaUserDashboardService.getFavouriteUrl().then(function (response) {
            $('#loadergif').hide();
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
            $scope.response = JSON.parse(response.data.status_response);
            $scope.favouritelength = $scope.response.favourites_list.length;
            
           
            //$scope.response = JSON.parse($scope.response);
            for (i = 0; i < $scope.response.favourites_list.length; i++) {
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
                 if ($scope.response.favourites_list[i].report_type == 'weekly') {
                     $scope.chartresponse = JSON.parse($scope.response.favourites_list[i].data);
                     //debugger;
                    layout.title = $scope.response.favourites_list[i].product_name + ' ' + $scope.response.favourites_list[i].report_type + ' / report'
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
                else if($scope.response.favourites_list[i].report_type == "yearly" || $scope.response.favourites_list[i].report_type == "monthly") {
                    $scope.chartresponse = JSON.parse($scope.response.favourites_list[i].data);
                    
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
                layout.title = $scope.response.favourites_list[i].product_name + ' ' + $scope.response.favourites_list[i].report_type + ' / report';
                Plotly.newPlot('product-chart-yearly'+chartFavouriteIndex, plotDataBarY, layout, plotlyDefaultConfigurationBar);
                var gd1 = document.getElementById("product-chart-yearly"+chartFavouriteIndex);
                Plotly.Plots.resize(gd1);
                
                }
                else  if($scope.response.favourites_list[i].report_type == "thisweek"){
                    var xAxisVal = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    var plotDataBarY = [];
                    layout.title = $scope.response.favourites_list[i].product_name+ ' ' + 'This Week' + ' / report';
                    $scope.chartresponse = JSON.parse($scope.response.favourites_list[i].data);
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
            







        });
    }
    $scope.getfavourite();
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
}]);