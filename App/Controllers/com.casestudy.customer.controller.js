(function () {

    angular.module("WEP")

        .controller('customerController', customerController);

    customerController.$inject = ['accountService', '$location']

    function customerController(accountService, $location) {
        var vm = this;
        vm.customerObj = {};
        vm.result;

        vm.cancelCustomerCreation = function(){
            $location.path("/loginPage");
        }

        vm.createCustomer = function(){
        var promise = accountService.addCustomer(vm.customerObj);
        promise.then(function (data) { //checking promise object if it is Resolved
                        vm.result = data;
                        if (data != null) {
                            $location.path('/loginPage');
                        }
                    },
                    function (data) { //checking promise object if it is Error
                        vm.result = data;
                        $location.path('/loginPage');
                    })
                .then(function () {
                });
            
        }

    }
})();
