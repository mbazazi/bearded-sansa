'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'myAppointment', 
	function($scope, $stateParams, $location, Authentication, Articles, myAppointment, art) {
		$scope.authentication = Authentication;
	
	/*	$scope.articles = Articles.query();
			console.log($scope.articles);
*/
		$scope.find = function() {
		    Articles.query({}, function (response) {
		        // Will update scope, function will be called if http status === 200
		        $scope.articles = response;
		    }, function () {
		        // This is a error function will called if http status != 200
		    });
		};

		$scope.create = function() {
			console.log('From the Create(): '+$scope.articles);
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save().then(function(response) {
				console.log('From the Callback: '+$scope.articles);
				$location.path('articles');

				$scope.title = '';
				$scope.content = '';
				$scope.find();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.myAppointment = myAppointment;

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		
		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
			
		};
	}
]);