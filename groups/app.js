(function() {
	'use strict';
	/*global angular*/
	angular.module('example', []);

	angular.module('example').directive('mdMain', mdMain);

	function mdMain() {
		return {
			restrict: 'E',
			templateUrl: 'main.html',
			controllerAs: 'vm',
			controller: MainController
		};

		function MainController() {
			var vm = this;
			vm.title = "Mandeep";

			vm.query = '';

			vm.rootGroup = {
				name: 'root',
				show: true,
				children: [{
					name: 'child 1',
					show: true,
					searchObj: {
						key: 'key 1',
						value: 'value 1'
					}
				}, {
					name: 'child 2',
					searchObj: {
						key: 'key 2',
						value: 'value 2'
					},
					show: true
				}],
				searchObj: {
					key: 'root key',
					value: 'root value'
				}
			};

			function match(value) {
				return value.toLowerCase().indexOf(vm.query.toLowerCase()) > -1;
			}

			vm.search = function(group) {


				group.show = false;

				if (vm.query && vm.query !== "") {
					angular.forEach(group.searchObj, function(value, key) {
						group.show = group.show || match(value) || match(key);
					});
				} else {
					group.show = true;
				}


				var foundInChildren = false;
				angular.forEach(group.children, function(child) {
					foundInChildren = vm.search(child) || foundInChildren;
				});

				group.show = group.show || foundInChildren;

				return group.show;
			};



		}
	}

	angular.module('example').directive('mdHighLight', mdHighLight);

	function mdHighLight($sce, $timeout) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				scope.$watch('vm.query', function(newValue, oldValue) {
					if (oldValue !== newValue) {
						if (newValue) {
							$timeout(function() {
								var text = text.replace(new RegExp('(' + scope.vm.query + ')', 'gi'),
									'<span class="highlighted">$1</span>');
								element.html($sce.trustAsHtml(text));
							}, 0, true);
						}
					}
				});
			}
		};
	}



})();