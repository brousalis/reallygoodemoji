(function() {
  angular
    .module('app.storageService', [
      'LocalStorageModule'
    ])
    .provider('storageService', storageService)

  function storageService() {
    return ({
      $get: (localStorageService) => {
        let storage = localStorageService;
        return {
          get(key) { return storage.get(key); },
          set(key, value) { return storage.set(key, value); },
          remove(key) { return storage.remove(key); }
        };
      }
    })
  }
}());
