var app = angular.module('mavrck', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
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

app.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.go= function (hash) {
        $location.path(hash);
    };


}]);

app.controller('ProductCtrl', ['$scope', function($scope) {


}]);
