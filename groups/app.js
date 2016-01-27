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
			vm.title = 'Mandeep';

			vm.query = '';

			vm.rootGroup = {
				name: 'root',
				show: true,

				searchObj: {
					key: 'root key',
					value: 'root value'
				},
				children: [{
						name: 'child 1',
						show: true,
						searchObj: {
							name: 'key 1',
							description: 'value 1',
							age: '20'
						},
						children: [{
								name: 'child 1 - 1',
								searchObj: {
									name: 'child 1 - 1',
									value: 'Hello World dfad'
								},
								show: true,
							}, {
								name: 'child 1 - 2',
								searchObj: {
									name: 'child 1 - 2',
									value: 'Hello World dfad'
								},
								show: true,
								children: [{
										name: 'child 1 - 2 -1',
										searchObj: {
											name: 'child 1 - 2 -1',
											value: 'Hello World dfad'
										},
										show: true,
									}, {
										name: 'child 1 - 2 -  2',
										searchObj: {
											name: 'child 1  - 2 - 2',
											value: 'Hello World dfad'
										},
										show: true
									}

								]
							}

						]
					}, {
						name: 'child 2',
						searchObj: {
							name: 'key 2',
							value: 'Hello World'
						},
						show: true
					}, {
						name: 'child 3',
						show: true,
						searchObj: {
							name: 'key 6',
							description: 'value 4',
							age: '20'
						},
						children: [{
								name: 'child 3 - 1',
								searchObj: {
									name: 'child 3 - 1',
									value: 'Hello World dfad'
								},
								show: true,
							}, {
								name: 'child 3 - 2',
								searchObj: {
									name: 'child 3 - 2',
									value: 'Hello World dfad'
								},
								show: true
							}

						]
					},

					{
						name: 'child 4',
						show: true,
						searchObj: {
							name: 'key 1',
							description: 'value 1',
							age: '20'
						}
					},

					{
						name: 'child 5',
						show: true,
						searchObj: {
							name: 'key 1',
							description: 'valfffue 1',
							age: '2440'
						}
					},

					{
						name: 'child 6',
						show: true,
						searchObj: {
							name: 'child 6',
							description: 'other data i am running out of ideas',
							age: '2440'
						}
					}

				]
			};

			function match(value) {
				return value.toLowerCase().indexOf(vm.query.toLowerCase()) > -1;
			}

			vm.search = function(group) {


				group.show = false;

				if (vm.query && vm.query !== '') {
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