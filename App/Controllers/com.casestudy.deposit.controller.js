(function () {
    angular.module("WEP")

    .controller('depositController', depositController);

    depositController.$inject = ['accountService', '$location']

    function depositController(accountService, $location) {
        var vm = this;
        vm.depositObj = {};
        vm.result;
        vm.accountId;
        vm.userDetails;
        vm.notExist;

        //promise response for personal details to get accountID 
        var userPromise = accountService.getPersonalDetails();
        userPromise.then(function (data) {
                    vm.userDetails = data;
                    vm.accountId = vm.userDetails.data.accountId;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
                console.log('deposit Controller Personal details Then execution');
            });


        //promise respnse for displaying message on success or failure
        vm.depositAmount = function () {
            var promise = accountService.processDepositRequest(vm.depositObj);
            promise.then(function (data) {
                        vm.result = {};
                        vm.notExist = {};
                        vm.result = "Money is deposited in account successfully."
                        vm.depositObj = {};

                    },
                    function (data) {
                        vm.result = {};
                        vm.notExist = {};
                        vm.notExist = data;
                        vm.depositObj = {};
                        vm.result = {};
                    })
                .then(function () {
                    console.log('deposit Controller then execution');
                    $location.path('/deposit');
                });
        }
    }

})();