(function () {
    angular.module("WEP")

    .controller('accountDetailsController', accountDetailsController);

    accountDetailsController.$inject = ['accountService', '$location']

    function accountDetailsController(accountService, $location) {
        var vm = this;
        vm.result;
        var promise = accountService.getUserAccountDetails();
        promise.then(function (data) {
                    vm.result = data;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
                console.log('Account details Then execution');
            });
    }
})();