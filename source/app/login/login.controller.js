(function() {
  angular
    .module('app')
    .controller('LoginController', LoginController)
    .config (routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      })
  }

  function LoginController($state, storageService, ENV) {
    if (storageService.get('code') && storageService.get('token')) {
      $state.go('emoji');
    } else {
      storageService.remove('code');
      window.location('/');
    }
  }
}());
