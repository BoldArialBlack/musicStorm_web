/*// Declare app level module which depends on filters, and services
  var musicStormApp = angular.module('musicStormApp', [
      'musicStormCtrls', 'musicStormDirectives',
      'musicStormFilters','musicStormServices']);

  musicStormApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {templateUrl: 'partials/welcome.html', controller: welcomeCtrl});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: welcomeCtrl});
    $routeProvider.otherwise({redirectTo: '/welcome'});
  }]);*/
var musicStormApp = angular.module('musicStormApp', [
    'ui.router', 'ngTouch', 'musicStormCtrls', 'musicStormFilters', 'musicStormServices',
    'musicStormDirectives'
]);
/*
app.config(function($routeProvider) {
    $routeProvider.when('/welcome', {
        template: 'index.html',
    }).when('/search', {
        templateUrl: 'search.html'
    })
});*/

musicStormApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: 'partials/welcome.html',
        controller: 'welcomeCtrl'
    }).state('search', {
        url: '/search/:searchText',
        templateUrl: 'partials/search.html',
        controller: 'searchResultCtrl'
    }).state('artist', {
        url: '/artist/:artistName',
        templateUrl: 'partials/artist.html',
        controller: 'artistCtrl'
    }).state('ranking', {
        url: '/ranking',
        templateUrl: 'partials/ranking.html',
    }).state('ranking-detail', {
        url: '/ranking/:rankName',
        templateUrl: 'partials/rankingDetail.html',
        controller: 'rankingCtrl'
    }).state('guessing', {
        url: '/guesing/:questionNum',
        templateUrl: 'partials/guessing.html',
        controller: 'guessingCtrl'
    })
    /*.state('index', {
            abstract: true,//注意
            url: "/index",
            templateUrl: "views/common/content.html"
        })
            .state('index.main', {
                url: "/main",
                templateUrl: "views/main.html",
                data: {pageTitle: '主页'}
            })*/
    /*state('/welcome', {
        template: 'index.html',
    }).state('/search', {
        templateUrl: 'search.html'
    }).otherwise('/welcome');*/

    /*    $stateProvider.state('welcome',{
            url: '/welcome',
            templateUrl: 'index.html',
            controller: 'welcomeCtrl'
        })
            .state('search', {
                url: '/search',
                templateUrl: 'search.html',
                controller: 'searchCtrl',
            })*/
})
