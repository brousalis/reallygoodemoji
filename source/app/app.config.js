(function() {
  angular
    .module('app')
    .config(routeConfig)
    .config(imageUrlConfig)
    .config(urlHashConfig)
    .run(authConfig)

  function routeConfig($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/app.html',
        controller: 'AppController'
      });
    $urlRouterProvider.otherwise('/');
  }

  function imageUrlConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(true)
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|emoji):|data:image\//);
  }

  function urlHashConfig($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false }).hashPrefix('!');
  }

  function authConfig($rootScope, storageService) {
    $rootScope.$on('$locationChangeStart', (event, next, current) => {
      let code = next.split(/code=([a-zA-Z0-9.]*)/)[1];
      if (code) {
        event.preventDefault()
        storageService.set('code', code)
      }
    });
  }
}());
