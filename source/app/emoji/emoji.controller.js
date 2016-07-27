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

  function EmojiController($scope, $state, $timeout, $q, slackService, storageService) {
    $scope.loading = true;
    $scope.copied = false;

    if (!storageService.get('token')) {
      $state.go('login');
    }

    let params = {
      token: storageService.get('token')
    }

    $scope.alias = (alias) => `:${alias}:`;

    $scope.didCopy = (text) => {
      $scope.copied = true;
      $scope.copiedText = text;
      $timeout(function () { $scope.copied = false; }, 1000);
    };

    slackService.ExecuteApiMethod("emoji.list", params, (response) => {
      if (response.ok) {
        let res = response.emoji;
        let emoji = [];
        let aliases = {};

        for (let key of Object.keys(res)) {
          if (/^alias/.test(res[key])) {
            aliases[res[key].replace('alias:','')] = key
            delete(res[key]);
          } else {
            emoji.push({alias: key, src: res[key]});
          }
        }

        $scope.aliases = aliases;
        $scope.emoji = emoji;
        $scope.count = Object.keys(emoji).length
        $scope.loading = false
      } else {
        $scope.loading = false
        $scope.error = true
      }
    });
  }
}());
