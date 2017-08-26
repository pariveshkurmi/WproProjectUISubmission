(function () {
    angular.module("WEP")
    
    .controller('accountDetailsController', accountDetailsController);

    accountDetailsController.$inject = ['accountService', '$location','$scope']

    function accountDetailsController(accountService, $location,$scope) {
        var vm = this;
    $scope.$on('$locationChangeStart', function( event ) {
        console.log("Hello windows onload")
    var answer = confirm("Are you sure you want to leave this page?")
    if (!answer) {
        event.preventDefault();
    }
});
        
        vm.result;
        var promise = accountService.getUserAccountDetails();
        promise.then(function (data) {
                    vm.result = data;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
            });
    }
})();