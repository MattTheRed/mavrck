var app = angular.module('mavrck', ['ngRoute']); //'ngMockE2E'

app.config(['$routeProvider', '$provide',
  function($routeProvider, $provide) {
    // $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

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

// app.run(function($httpBackend) {
//     console.log("hello");
//   // // returns the current list of phones
//   // $httpBackend.whenGET('/phones').respond(phones);

//   // // adds a new phone to the phones array
//   // $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
//   //   var phone = angular.fromJson(data);
//   //   phones.push(phone);
//   //   return [200, phone, {}];
//   // });

//     $httpBackend.whenGET(/^\/templates\//).passThrough();
// });

app.controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.go= function (hash) {
        $location.path(hash);
    };

    $scope.stars = 3.2;
}]);

app.controller('ProductCtrl', ['$scope', function($scope) {
    // TODO: move this to a service
    $scope.products = [
        {
            id: 1,
            title: 'Original Penguin Mens Long-Sleeve Oxford Shirt',
            image: 'http://ecx.images-amazon.com/images/I/41J42jA4jXL._AA160_.jpg',
            description: '60% Cotton/40% Polyester. Imported. Machine Wash. Button-front shirt featuring point collar, logo embroidery at chest, and long sleeves.Shirttail hem',
            price: '89.99',
            stars: 4.5,
            category: 'mens'
        },
        {
            id: 2,
            title: 'Calvin Klein Mens Non-Iron Slim-Fit Dress Shirt',
            image: 'http://ecx.images-amazon.com/images/I/51Lt3WDD5JL._AA160_.jpg',
            description: '60% Cotton/40% Polyester. Imported. Machine Wash. Button-front shirt featuring point collar, logo embroidery at chest, and long sleeves.Shirttail hem',
            price: '56.99',
            stars: 3.2,
            category: 'mens'
        },
        {
            id: 3,
            title: 'Sheinside Womens Striped Three Quarter Length Sleeve Stripe Dress',
            image: 'http://ecx.images-amazon.com/images/I/41geH8IsrBL._SL246_SX190_CR0,0,190,246_.jpg',
            description: 'Shoulder(cm) :S:37cm M:37.5cm L:38cm XL:38.5cm Bust(cm) :S:84cm M:88cm L:92cm XL:96cm Length (cm) :S:80cm M:81cm L:82cm XL:83cm Sleeve Length(cm) :S:49cm M:50cm L:51cm XL:52cm Size Available :S,M,L,XL',
            price: '79.99',
            stars: 3.4,
            category: 'women'
        },
        {
            id: 4,
            title: 'Lovaru Womens Dark Blue Garment Casual Polka Dot Print Chiffon Vestidos Dress',
            image: 'http://ecx.images-amazon.com/images/I/413%2BbGpV6UL._SL246_SX190_CR0,0,190,246_.jpg',
            description: 'Material:Cotton,Polyester',
            price: '39.99',
            stars: 2.8,
            category: 'women'
        }
    ];

    $scope.search;

}]);

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

        scope.select = function (option) {
            trackEvent("Filtered Results", {
                "filter": "Glassdoor",
                "value": option
            });
            scope.selection = option;
            scope.showDropdown = false;
            scope.change(true);
        };

        scope.changeSort = function(field) {
            scope.sortFunction(field);
            scope.showDropdown = false;
        };
      }
    };
});
