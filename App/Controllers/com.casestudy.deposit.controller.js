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
        vm.benificiaries=[];
        //promise response for personal details to get accountID 
        var userPromise = accountService.getPersonalDetails();
        userPromise.then(function (data) {
                    vm.userDetails = data;
                    vm.accountId = vm.userDetails.accountId;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
            });


        //promise respnse for displaying message on success or failure
        vm.depositAmount = function () {
            console.log(vm.depositObj.accountId)
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
                    $location.path('/deposit');
                });
        }
    }

})();