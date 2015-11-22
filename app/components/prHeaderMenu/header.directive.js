import angular from 'angular';

import template from './header.html!text';

function prHeader() {
  let directive = {
    restrict: 'E',
    template: template
  };
  return directive;
}

prHeader.$inject = ['$location', '$anchorScroll'];

export default angular.module('prHeaderModule', [])
    .directive('prHeader', prHeader);
