(function() {
  angular
    .module('app')
    .config(routeConfig)
    .config(imageUrlConfig)
    .config(urlHashConfig)
    .config(scrollConfig)

  function routeConfig($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'AppController'
      });
    $urlRouterProvider.otherwise('/');
  }

  function scrollConfig($uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
  }

  function imageUrlConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(true)
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|emoji):|data:image\//);
  }

  function urlHashConfig($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false }).hashPrefix('!');
  }
}());
