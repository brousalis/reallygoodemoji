(function() {
  angular
    .module('app')
    .controller('LoginController', LoginController)
    .config (routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login.html',
        controller: 'LoginController'
      })
  }

  function LoginController($state, storage, ENV) {
    if (storage.get('code') && storage.get('token')) {
      $state.go('emoji');
    } else {
      storage.remove('code');
      window.location('/');
    }
  }
}());
