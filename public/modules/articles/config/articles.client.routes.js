'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider', 
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html', 
			 controller: function($scope, art){
		          $scope.articles = art;
		      },
			resolve:{
	         art:  function(Articles){
	            return Articles.query();
         		}
	         } 
		}).
		state('listArticles.createArticle', {
			url: '/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html', 
			controller: 'ArticlesController'
		}).
		state('listArticles.viewArticle', {
			url: '/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'

		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);