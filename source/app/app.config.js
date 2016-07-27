(function() {
  angular
    .module('app')
    .config(routeConfig)
    .config(imageUrlConfig)
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
}());
