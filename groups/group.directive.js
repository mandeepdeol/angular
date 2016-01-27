(function() {
	'use strict';
	/*global angular*/

	angular.module('example').directive('mdGroup', mdGroup);

	function mdGroup() {
		return {
			restrict: 'E',
			templateUrl: 'group.html',
			scope : {
				group : '='
			}
		};
	}

})();