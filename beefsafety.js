    var app = angular.module('solrapp', []);
    angular.module('solrapp')
      .directive('searchResults', function () {
        return {
            scope: {
                solrUrl: '@',
                name: '@',
                query: '@',
                displayfield: '@',
                results: '&'
            },
            restrict: 'E',
            controller: function ($scope, $http) {
                $scope.$watch('query', function () {
                    $http({
                        method: 'JSONP',
                        url: $scope.solrUrl,
                        params: {
                            'json.wrf': 'JSON_CALLBACK',
                                'q': $scope.query,
                                'fl': $scope.name
                        }
                    })
                        .success(function (data) {
                        var docs = data.response.docs;
                        $scope.results.docs = docs;
                        $scope.content = results.docs[$index]["content"]

                    }).error(function () {});
                });
            },
            template: 
								'<input ng-model="query" name="Search"></input>' +
                '<div class="container">' +
                '<h3>Search Results for "{{query}}"</h3>' +
                '<span ng-repeat="doc in results.docs">' +
                '<div class="panel panel-info">' +
                ' <div class="panel panel-heading">' +
                '  <h4>ID: {{results.docs[$index]["id"]}}</h4>' +
                ' </div>' +
                ' <div class="panel panel-body">' +
                '  <p><strong>Name:</strong> {{results.docs[$index]["name"].join(", ")}}</p>' +
                '  <p><strong>Content:</strong> </p>' +
                	'<p> {{results.docs[$index]["content"].join(", ")}}</p>' +
                  '' +
                '  <p><strong>Path:</strong> {{results.docs[$index]["path"].join(", ")}}</p>' +
                '  <p><strong>Source:</strong> {{results.docs[$index]["source"].join(", ")}}</p>'+
                '  <p><strong>Type:</strong> {{results.docs[$index]["type"].join(", ")}}</p>' +
                ' </div>' +
                '</span>' +
                ' </div>'
        };
    });