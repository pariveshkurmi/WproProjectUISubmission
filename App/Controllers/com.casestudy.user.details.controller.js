(function () {

    angular.module("WEP")
        .controller('userDetailsController', userDetailsController);
    userDetailsController.$inject = ['accountService', '$location']

    function userDetailsController(accountService, $location) {
        var vm = this;
        vm.userDetails;
        var promise = accountService.getPersonalDetails();
        promise.then(function (data) { //checking promise object if it is Resolved
                    vm.userDetails = data;
                },
                function (data) { //checking promise object if it is Error
                    vm.result = data;
                })
            .then(function () {
                console.log('User Details Controller Then execution');
                $location.path('/userDetails');
            });
    }

})();