(function() {
  angular
    .module('app')
    .controller('AppController', AppController);

  function AppController($scope, $state, slackService, storageService, ENV) {
    let config = {
      client: ENV.CLIENT_ID,
      secret: ENV.CLIENT_SECRET,
      authParams: {
        redirect_uri: ENV.REDIRECT_URI,
        scope: 'emoji:read'
      }
    }

    if (storageService.get('token')) {
      $state.go('emoji');
    } else {
      slackService.authorize(config.client, config.authParams);
    }
  }
}());
