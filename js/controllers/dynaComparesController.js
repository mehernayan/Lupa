lupaApp.controller('dynaComparesController', ['$scope', '$location', 'lupaManagerService', 'dynaCompData', 'dynaFeatureData', 'localStorageService',
  function ($scope, $location, lupaManagerService, dynaCompData, dynaFeatureData, localStorageService) {
    var userId = localStorageService.get("user");
    if (typeof userId === "undefined" || userId == null) {
      $location.path('/');
    }

    $scope.error = "";
    $scope.successMsg = "";
    $scope.errorProductsList = "";
    $scope.prodFeatures = [];

    // chart detail
    $scope.reportSidebar = true;
    $scope.dashboardActive = false;
    $scope.favouriteActive = false;

    //layout 
    var layout = {
      title: '',
      showlegend: false,
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
        tickangle: 0,
      },
      yaxis: {
        showgrid: true,
        title: "",
        showline: true
      },
      barmode: 'group',
      bargroupgap: 0.5

    };

    var d3colors = Plotly.d3.scale.category10();
    var customd3Colors = [];


    //debugger;



    var plotlyDefaultConfigurationBar = {
      responsive: true,
      displaylogo: false,
      showTips: true,
      pan2d: true,
      modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
    };


    /** 
       * Fetch Dyna Product list
       */
    $scope.getDynaProductList = function () {
      $('#loadergif').show();
      lupaManagerService.fetchDynaProductList().then(function (response) {
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if (typeof $scope.response !== "undefined") {
          if ($scope.response.success) {
            $scope.errorProductsList = "";
            $scope.productsList = $scope.response.products_list;
          } else {
            $scope.errorProductsList = $scope.response.message;
          }
        }
      });
    };
    $scope.getDynaProductList();

    /** Dyna Compare Object */
    $scope.dynaObj = {
      product_name: ''
    };
    $scope.$watch('dynaObj', function (n, o) {
      if (n !== o) {
        dynaCompData.set(n.product_name);
        $scope.getFeaturesList();
      };
    }, true);

    /**
     * Get feature list
     */
    $scope.getFeaturesList = function () {
      $scope.error = "";
      $scope.successMsg = "";
      $('#loadergif').show();
      lupaManagerService.getFeaturesList().then(function (response) {
        $('#loadergif').hide();
        $scope.response = response.data;
        if (typeof $scope.response !== "undefined") {
          if ($scope.response.success) {
            $scope.error = "";
            $scope.prodFeatures = $scope.response.data;
          } else {
            $scope.error = $scope.response.message;
          }
        }
      });
    };

    /** Dyna Compare Object */
    $scope.features_lists = [];
    $scope.$watch('features_lists', function (n, o) {
      if (n !== o) {
        dynaFeatureData.set(n);
      };
    }, true);

    /**
     * Add features to list
     */
    $scope.addFeatures = function () {
      $scope.features_lists = [];
      if (typeof $scope.prodFeatures !== "undefined" && $scope.prodFeatures.length !== 0) {
        $scope.prodFeatures.forEach(element => {
          if (typeof element.status !== "undefined" && element.status) {
            $scope.features_lists.push(element.feature_name);
          }
        });
      }
    };

    /**
     * Get feature list
     */
    $scope.postFeaturesList = function () {
      $scope.error = "";
      $scope.successMsg = "";
      $('#loadergif').show();
      lupaManagerService.postFeaturesList().then(function (response) {
        $('#loadergif').hide();
        $scope.response = JSON.parse(response.data.status_response);
        //debugger;
        if (typeof $scope.response !== "undefined") {
          if ($scope.response.success) {
            //debugger;
            $scope.error = "";
            $scope.successMsg = $scope.response.message;
            $scope.showCompareChart = true;
            $scope.dynaCompareGraph();

          } else {
            $scope.successMsg = "";
            //debugger;
            $scope.error = $scope.response.message;
          }
        }
      });
    };


    $scope.dynaCompareGraph = function () {
      //debugger;
      var plotDataBarY = [];
      $("#loadergif").show();
      lupaManagerService.dynaCompareGraphUrl().then(function (response) {
        $scope.dynaCompareList = response.data;
        //debugger;
        var markerColor = ['rgb(49,130,189)', 'rgb(204,204,204)']

        setTimeout(function () {
          $("#loadergif").hide();
          for (i = 0; i < $scope.dynaCompareList.length; i++) {
            customd3Colors.push(d3colors(i));
            for (j = 0; j < 2; j++) {
              plotDataBarY.push({
                x: $scope.dynaCompareList[i].charts_data[j].product_list,
                y: $scope.dynaCompareList[i].charts_data[j].value,
                name: $scope.dynaCompareList[i].charts_data[j].name,
                type: 'bar',
                marker: {
                  color: markerColor[i],
                  opacity: 0.7
                }
              })
            }
           Plotly.newPlot('dyna-compare-chart-' + i, plotDataBarY, layout, plotlyDefaultConfigurationBar);
            
          }
        }, 1000)

      });
    }

  }]);
