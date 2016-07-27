(function() {
  angular
    .module('app.storage', [
      'LocalStorageModule'
    ])
    .provider('storage', storageService)

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
