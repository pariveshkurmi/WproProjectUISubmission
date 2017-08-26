(function(){

angular.module("WEP")

        .controller('transactionController', transactionController);

    transactionController.$inject = ['accountService', '$location']

    function transactionController(accountService, $location) {
        var vm = this;
        vm.transactionObj=[];
        vm.accountDetails;
        vm.userDetails;
        //promise response for personal details to get accountID 
        var promise = accountService.getUserAccountDetails();
        promise.then(function (data) {
                    vm.accountDetails = data;
                },
                function (data) {
                    vm.accountDetails = data;
                })
            .then(function () {
            });
        var userPromise = accountService.getPersonalDetails();
        userPromise.then(function (data) {
                    vm.userDetails = data;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
            });
        var promise = accountService.getTransactionsByAccountId();
        promise.then(function (data) { //checking promise object if it is Resolved
                    vm.transactionObj = data;
                },
                function (data) { //checking promise object if it is Error
                    vm.transactionObj = data;
                })
            .then(function () {
            });

    }

})();