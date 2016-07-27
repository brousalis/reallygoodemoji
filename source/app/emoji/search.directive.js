(function() {
  angular
    .module('app')
    .directive('search', searchDirective);

  function searchDirective($document) {
    return function (scope, elem, attr) {
      $document.bind('keypress', e => {
        scope.searching = true;
        elem[0].focus();
        scope.$apply();
      });

      elem.bind('keydown', event => {
        if (event.which === 27 || event.which === 13) {
          scope.searching = false;
          scope.search = '';
          scope.$apply();
        }
      });
    }
  };
}());
