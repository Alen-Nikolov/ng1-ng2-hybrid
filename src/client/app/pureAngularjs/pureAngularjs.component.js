(function() {
  'use strict';

  angular
    .module('angularSeed.pureAngularjs')
    .component('pureAngularjs', {
      controller: PureAngularjsController,
      controllerAs: 'vm',
      templateUrl: '/app/pureAngularjs/pureAngularjs.component.html'
    });

  PureAngularjsController.$inject = [
    '$interval',
    'randomNumbers',
    'textTools',
    '$rootScope'
  ];

  function PureAngularjsController($interval, randomNumbers, textTools, $rootScope) {
    var vm = this;
    var _interval;

    // lifecyle
    vm.$onInit = $onInit;
    vm.$onDestroy = $onDestroy;


    // scope vars
    vm.angularjsTwoWay = 'This will be bound with two-way binding';
    vm.angularjsOneWay = 'This will be bound with one-way binding';

    // scope functions
    vm.ucEveryOther = textTools.ucEveryOther;

    function $onInit() {
      console.log('herere I am and I am great')

      $rootScope.hello = 'hello';

      console.log($rootScope.hello)
      _interval = $interval(function() {
        vm.angularjsTwoWay += String.fromCharCode(randomNumbers.randomInt('a'.charCodeAt(0), 'z'.charCodeAt(0)));
      }, 1000);
    }

    function $onDestroy() {
      $interval.cancel(_interval);
    }
  }

})();
