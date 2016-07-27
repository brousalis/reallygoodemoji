(function() {
  angular
    .module('app')
    .controller('AppController', AppController);

  function AppController($scope, slackSvc, storage, ENV) {
    let config = {
      client: ENV.CLIENT_ID,
      secret: ENV.CLIENT_SECRET,
      authParams: {
        redirect_uri: ENV.REDIRECT_URI,
        scope: 'emoji:read'
      }
    }

    if (storage.get('code') === null) {
      slackSvc.authorize(config.client, config.authParams);
    }

    if (storage.get('code')) {
      slackSvc.oauth.access(config.client, config.secret, storage.get('code'), (response) => {
        console.log(response);
        if(response.ok) {
          storage.set('token', response.access_token)
          slackSvc.InitToken(response.access_token);
          window.location.replace('/login');
        }
      });
    }
  }
}());
