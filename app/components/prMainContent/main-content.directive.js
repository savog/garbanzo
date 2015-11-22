import angular from 'angular';
import MainController from './main-content.controller';
import template from './main-content.html!text';
import angularMaterial from 'angular-material';

function prMainContent() {
  let directive = {
    restrict: 'E',
    controller: MainController,
    controllerAs: 'mainController',
    template: template
  }

  return directive;
}

export default angular.module('prMainContentModule', ['ngMaterial'])
    .directive('prMainContent', prMainContent);
