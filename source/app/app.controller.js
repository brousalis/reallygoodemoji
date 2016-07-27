(function() {
  angular
    .module('app')
    .controller('AppController', AppController);

  function AppController($scope, slackService, storageService, ENV) {
    let config = {
      client: ENV.CLIENT_ID,
      secret: ENV.CLIENT_SECRET,
      authParams: {
        redirect_uri: ENV.REDIRECT_URI,
        scope: 'emoji:read'
      }
    }

    if (storageService.get('code') === null) {
      slackService.authorize(config.client, config.authParams);
    }

    if (storageService.get('code')) {
      slackService.oauth.access(config.client, config.secret, storageService.get('code'), (response) => {
        console.log(response);
        if(response.ok) {
          storageService.set('token', response.access_token)
          slackService.InitToken(response.access_token);
          window.location.replace('/login');
        }
      });
    }
  }
}());
