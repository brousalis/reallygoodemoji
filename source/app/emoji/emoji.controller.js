(function() {
  angular
    .module('app')
    .config (routeConfig)
    .controller('EmojiController', EmojiController);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('emoji', {
        url: '/emoji',
        templateUrl: 'app/emoji/emoji.html',
        controller: 'EmojiController'
      })
  }

  function EmojiController($scope, $q, slackService, storageService) {
    $scope.loading = true;

    let params = {
      token: storageService.get('token')
    }

    slackService.ExecuteApiMethod("emoji.list", params, (response) => {
      $scope.loading = false

      if (response.ok) {
        let emoji = response.emoji;
        let aliases = {};
        for (let key of Object.keys(emoji)) {
          if (/^alias/.test(emoji[key])) {
            aliases[emoji[key].replace('alias:','')] = key
            delete(emoji[key]);
          }
        }
        $scope.aliases = aliases;
        $scope.emoji = emoji;
        $scope.count = Object.keys(emoji).length
      } else {
        $scope.error = true
      }
    });
  }
}());
