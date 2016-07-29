angular.module('app', [
  'ngSanitize',
  'ui.router',
  'angular-clipboard',
  'angular.filter',
  'infinite-scroll',

  'bendy.templates',
  'bendy.env',

  'app.slackService',
  'app.storageService'
]);
