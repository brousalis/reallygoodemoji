(function() {
  angular
    .module('app')
    .controller('LoginController', LoginController)
    .config (routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login?code',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      })
  }

  function LoginController($state, $stateParams, slackService, storageService, ENV) {
   let config = {
      client: ENV.CLIENT_ID,
      secret: ENV.CLIENT_SECRET
    }

    if($stateParams.code) {
      storageService.set('code', $stateParams.code);

      if (storageService.get('code')) {
        slackService.oauth.access(config.client, config.secret, storageService.get('code'), (response) => {
          if(response.ok) {
            storageService.set('token', response.access_token);
            slackService.InitToken(response.access_token);
            $state.go('emoji');
          }
        });
      }
    } else {
      storageService.remove('code');
      storageService.remove('token');
      $state.go('main');
    }
  }
}());
