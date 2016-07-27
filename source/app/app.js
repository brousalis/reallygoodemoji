angular.module('app', [
  'ngSanitize',
  'ui.router',
  'angular-clipboard',
  'angular.filter',

  'bendy.templates',
  'bendy.env',

  'app.slackService',
  'app.storageService'
]);
