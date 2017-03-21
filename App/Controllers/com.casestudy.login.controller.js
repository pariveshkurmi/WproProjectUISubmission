(function () {

    angular.module("WEP")

    .controller('loginController', loginController);

    loginController.$inject = ['accountService', '$location']

    function loginController(accountService, $location) {
        var vm = this;
        vm.userCred = {};
        vm.result = '';
        vm.isValidUser = function () {
            var promise = accountService.isValid(vm.userCred);
            promise.then(function (data) { //checking promise object if it is Resolved
                        vm.result = data;
                    },
                    function (data) { //checking promise object if it is Error
                        vm.result = data;
                        if (vm.result.data.errorDesc != null) {
                            $location.path('/loginPage');
                        }
                    })
                .then(function () {
                    console.log('Login controller Then execution');
                    if (vm.result.data.name != null) {
                        $location.path('/userDetails');
                    }
                });
        }

    }


})();