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



   /*var plotlyDefaultConfigurationBar = {
      responsive: true,
      displaylogo: false,
      showTips: true,
      pan2d: true,
      modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
    };*/



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
    $scope.features_lists = [];
    $scope.addFeatures = function () {
      //$scope.features_lists = [];
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
      /*var plotlyDefaultConfigurationBar = {
        responsive: true,
        displaylogo: false,
        showTips: true,
        pan2d: true,
        modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
      };*/
      var plotDataBarY = [];
      $("#loadergif").show();
      lupaManagerService.dynaCompareGraphUrl().then(function (response) {
        
        $scope.dynaCompareList = response.data;
        $scope.dynaCompareList = [
    {
        "category": [
            "HyperWorks/dyna",
            "HWAIFPBS/dyna"
        ],
        "featureVal": [
            0,
            0
        ],
        "dynaVal": [
            12426,
            0
        ]
    },
    {
        "category": [
            "HWAWPF/dyna"
        ],
        "featureVal": [
            0
        ],
        "dynaVal": [
            0
        ]
    },
    {
        "category": [
            "HWAWPF/dyna"
        ],
        "featureVal": [
            0
        ],
        "dynaVal": [
            0
        ]
    },
    {
        "category": [
            "HWActivate/dyna"
        ],
        "featureVal": [
            0
        ],
        "dynaVal": [
            0
        ]
    }
];
        /*var plotlyDefaultConfigurationBar = {
          responsive: true,
          displaylogo: false,
          showTips: true,
          pan2d: true,
          modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestPie', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian']
        };*/
        
       
        var markerColor = ['rgb(49,130,189)', 'rgb(204,204,204)']
        
        for (i = 0; i < $scope.dynaCompareList.length; i++) {
              $scope.chartIndex = i;
              $('.chart-show-' + i).show();
              plotDataBarY = [];
              var trace1 = {
                x: $scope.dynaCompareList[i].category,
                y: $scope.dynaCompareList[i].featureVal,
                name: 'other software',
                type: 'bar'
              };

              var trace2 = {
                x: $scope.dynaCompareList[i].category,
                y: $scope.dynaCompareList[i].dynaVal,
                name: 'Dyna',
                type: 'bar'
              };
            plotDataBarY = [trace1, trace2];
            /*var layout = {
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
                title: "Total number of license used",
                showline: true
            },
            barmode: 'stack',
            bargroupgap: 0.5,
            autosize: true

        };*/
        var layout = {

        }
        layout.barmode = "stack";
            
         
            Plotly.newPlot('dyna-compare-chart-' + $scope.chartIndex, plotDataBarY, layout);
            
           
            
          }
         $("#loadergif").hide();

      });
    }
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
    //$scope.dynaCompareGraph();

  }]);
