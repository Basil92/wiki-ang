/**
 * Created by Basil on 02.04.2017.
 */
// 'use strict'
var wikiApp = angular.module('wikiApp', ['ngAnimate','ngSanitize']);
wikiApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://en.wikipedia.org/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**'
    ]);
});
wikiApp.controller('MainCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce){
    $scope.items = true;
    $scope.searching = function (keyword) {
        $scope.items = "";
        var urlStart = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var target = urlStart + keyword;
        $http.jsonp(target, {jsonpCallbackParam: 'callback'}).then(function successCB(response) {
            // console.log(response.data.query.pages);
            $scope.items = [];
            for(var page in response.data.query.pages){
                $scope.items.push({
                    pageid: response.data.query.pages[page].pageid,
                    title: response.data.query.pages[page].title,
                    extract: response.data.query.pages[page].extract
                });
                // console.log(page, response.data.query.pages[page]);
            }
        }, function errorCB(response){
            console.log('error ',target, '  -   ', response);
        })

    }
}]);