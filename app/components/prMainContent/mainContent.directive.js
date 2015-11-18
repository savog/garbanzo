/* global: angular */

import mainController from './mainContent.controller';
import template from './mainContent.template.html!text';

function prMainContent() {
  let directive = {
    restrict: 'E',
    controller: mainController,
    controllerAs: 'mainController',
    template: template
  }

  return directive;
}

export default angular.module('prMainContentModule', [])
    .directive('prMainContent', prMainContent);
