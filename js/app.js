var app = angular.module('mavrck', ['ngRoute', 'ngResource', 'ngStorage']); //'ngMockE2E'

app.config(['$routeProvider', '$provide',
  function($routeProvider, $provide) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/products', {
        templateUrl: 'templates/products_list.html',
        controller: 'ProductCtrl'
      }).
      when('/products/:productId', {
        templateUrl: 'templates/product_detail.html',
        controller: 'ProductCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);

// This is the version of the service we could use with a real API
// app.factory("Product", function($resource) {
//   return $resource("/api/products/:id");
// });

app.factory('Product', function($http) {
  var json = $http.get('products.json').then(function(response) {
    return response.data;
  });

  var Product = function(data) {
    if (data) angular.copy(data, this);
  };

  Product.query = function() {
    return json.then(function(data) {
      return data.map(function(product) {
        return new Product(product);
      });
    });
  };

  Product.get = function(id) {
    return json.then(function(data) {
      var result = null;
      angular.forEach(data, function(product) {
        if (product.id == id) result = new Product(product);
      });
      return result;
    });
  };

  return Product;
});


app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$localStorage', function($scope, $rootScope, $location, $localStorage) {
    $rootScope.$storage = $localStorage;
    $scope.submitForm = function(isValid) {
        if (isValid) {
            $rootScope.$storage.user = $scope.user;
            $location.path('/products');
        }
    };
}]);

app.controller('SearchFormCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.doSearch = function (keywords) {
    console.log(keywords);
    $location.path('/products').search({'q': keywords});
  };
}]);

app.controller('ProductCtrl', ['$scope', '$rootScope', '$routeParams', 'Product', '$localStorage',
  function($scope, $rootScope, $routeParams, Product, $localStorage) {

    $rootScope.$storage = $localStorage;
    if (!$rootScope.$storage.itemCount) {
        $rootScope.$storage.itemCount = 0;
    }

    $scope.buy = function() {
      $rootScope.$storage.itemCount++;
    };


    if ($routeParams.productId) {
      Product.get($routeParams.productId).then(function(data){
        $scope.product = data;
      });
    } else {
      Product.query().then(function(data) {
          $scope.products = data;
      });
      if (!$scope.search) {
        $scope.search = {};
      }
      if ($routeParams.category) {
        $scope.search.category = $routeParams.category;
      } else if ($routeParams.q) {
        $scope.search.title = $routeParams.q;
      }
    }

    $scope.clearSearch = function() {
      $scope.search = {};
    };
}]);

app.directive('overwriteEmail', function() {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

app.directive('starReviews', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/star.html',
      scope : {
        ratingValue : '=',
      },
      link : function(scope, elem, attrs) {
        scope.stars = [];
        var rating = scope.ratingValue;
        for (var i = 0; i < 5; i++) {
            if (rating > 1) {
                scope.stars.push(100);
            } else {
                scope.stars.push(rating * 100);
            }
            rating -= 1;
        }
      }
    };
});


app.directive('starFilter', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/star-filter.html',
      scope : {
        selection : '=',
        change: '=',
        sort: '=',
        sortFunction: '='
      },
      link : function(scope, elem, attrs) {
        scope.options = [
            0,
             4, 3, 2, 1
        ];
        console.log(scope.selection);
        scope.select = function (option) {
          console.log("worked");
            scope.selection = option;
            scope.showDropdown = false;

        };

        scope.changeSort = function(field) {
            scope.sortFunction(field);
            scope.showDropdown = false;
        };
      }
    };
});
