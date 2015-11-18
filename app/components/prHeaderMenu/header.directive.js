/* global: angular */

import template from './header.template.html!text';

function prHeader() {
  let directive = {
    restrict: 'E',
    template: template
  };
  return directive;
}
prHeader.$inject = ['$location', '$anchorScroll'];

export default angular.module('prHeader', [])
    .directive('prHeader', prHeader);
