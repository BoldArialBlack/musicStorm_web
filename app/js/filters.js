var musicStormFilters = angular.module('musicStormFilters', []);
musicStormFilters.filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);