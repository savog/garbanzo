import angular from 'angular';
import headerMenuModule from './components/prHeaderMenu/header.directive';
import mainContentModule from './components/prMainContent/mainContent.directive';

import 'bootstrap/css/bootstrap.css!';
import 'assets/css/styles.css!';

angular.
    module('perun', [
      headerMenuModule.name,
      mainContentModule.name
    ]);


angular.element(document).ready(function() {
  angular.bootstrap(document.querySelector('[data-main-app]'), [
    'perun',
  ], {
    strictDi: true,
  });
});
