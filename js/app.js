var app = angular.module('mavrck', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/product', {
        templateUrl: 'templates/products_list.html',
        controller: 'ProductCtrl'
      }).
      when('/product/:productId', {
        templateUrl: 'templates/product_detail.html',
        controller: 'ProductCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

app.controller('LoginCtrl', ['$scope', function($scope) {


}]);

app.controller('ProductCtrl', ['$scope', function($scope) {


}]);
