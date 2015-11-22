import angular from 'angular';
import headerMenuModule from './components/prHeaderMenu/header.directive';
import mainContentModule from './components/prMainContent/main-content.directive';

import 'assets/css/styles.css!';
import 'bootstrap/css/bootstrap.css!';

angular.module('app', [
      headerMenuModule.name,
      mainContentModule.name
    ]);
