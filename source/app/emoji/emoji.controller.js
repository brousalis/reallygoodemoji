(function() {
  angular
    .module('app')
    .config (routeConfig)
    .controller('EmojiController', EmojiController);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('emoji', {
        url: '/emoji',
        templateUrl: 'app/emoji.html',
        controller: 'EmojiController'
      })
  }

  function EmojiController($scope, slackSvc, storage) {
    let params = {
      token: storage.get('token')
    }

    slackSvc.ExecuteApiMethod("emoji.list", params, (response) => {
      if (response) {
        $scope.emoji = response.emoji
      } else {
        $scope.error = true
      }
    });
  }
}());
