/* eslint new-cap:0 */

(function() {
  angular
    .module('app')
    .config(routeConfig)
    .controller('EmojiController', EmojiController)
    .directive('isolate', function() {
      return {scope: true};
    });

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
    $scope.size = 128;
    $scope.compact = false;

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
      $timeout(function () { $scope.copied = false }, 1000);
    };

    $scope.loadMore = () => {
      if ($scope.all.length === 0) { return; }
      let items = $scope.all.splice(0, 20)
      $scope.emoji = $scope.emoji.concat(items);
    };

    $scope.saveSize = () => {
      console.log($scope.size)
    };

    slackService.ExecuteApiMethod('emoji.list', params, (response) => {
      if (response.ok) {
        let res = response.emoji;
        let emoji = [];
        let aliases = {};

        for (let key of Object.keys(res)) {
          if (/^alias/.test(res[key])) {
            aliases[res[key].replace('alias:','')] = key;
            delete(res[key]);
          } else {
            emoji.push({alias: key, src: res[key]});
          }
        }

        $scope.count = {
          emoji: Object.keys(emoji).length,
          aliases: Object.keys(aliases).length
        }

        emoji.sort((a, b) => {
          a = a.alias;
          b = b.alias;
          if(a < b) return -1;
          if(a > b) return 1;
          return 0;
        });

        $scope.aliases = aliases;
        $scope.all = emoji;
        $scope.emoji = emoji.splice(0,20);
        $scope.loading = false;
      } else {
        $scope.loading = false;
        $scope.error = true;
      }
    });
  }
}());
