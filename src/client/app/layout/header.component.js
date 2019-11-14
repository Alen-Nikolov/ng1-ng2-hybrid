(function() {
  'use strict';

  angular
    .module('angularSeed.layout')
    .component('angularSeedHeader', {
      controller: HeaderController,
      controllerAs: 'vm',
      templateUrl: 'app/layout/header.component.html'
    });

  HeaderController.$inject = [
    '$mdSidenav',
    '$rootScope'
  ];

  function HeaderController($mdSidenav, $rootScope) {
    var vm = this;

    vm.pageTitle = 'Dynamic Page Title';

    vm.closeSidenav = closeSidenav;
    vm.showHello = showHello;

    function closeSidenav() {
      $mdSidenav('main-sidenav').close();
    }

    function showHello() {
      console.log($rootScope.hello);
    }
  }

})();
