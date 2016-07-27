(function() {
  angular
    .module('app')
    .config(routeConfig)
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

  function urlHashConfig($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, rewriteLinks: false }).hashPrefix('!');
  }

  function authConfig($rootScope, storage) {
    $rootScope.$on('$locationChangeStart', (event, next, current) => {
      let code = next.split(/code=([a-zA-Z0-9.]*)/)[1];
      if (code) {
        event.preventDefault()
        storage.set('code', code)
      }
    });
  }
}());
