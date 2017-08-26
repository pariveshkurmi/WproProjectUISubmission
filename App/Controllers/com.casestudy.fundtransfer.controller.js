(function () {

    angular.module("WEP")

        .controller('fundTransferController', fundTransferController);

    fundTransferController.$inject = ['accountService', '$location']

    function fundTransferController(accountService, $location) {
        var vm = this;
        vm.fundTransferObj = {};
        vm.result;
        var promise = accountService.getAllBenificiaryByAccountId(vm.accountNumber);
        promise.then(function (data) {
                    vm.benificiaries = data;
                },
                function (data) {
                    vm.benificiaries = data;
                })
            .then(function () {
            });
            
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

        vm.getFundTransferForm = function(){
           $location.path('/fundTransfer');
       }
        vm.addNewPayeeForm = function () {
            $location.path('/addBenificiary');
        }
       vm.fundTransfer = function () {
            var promise = accountService.processFundTransferRequest(vm.fundTransferObj);
            promise.then(function (data) {
                        vm.result = {};
                        vm.notExist = {};
                        console.log()
                        if(data.errorDesc!=null){
                            vm.result = data.errorDesc;
                        }
                        else{
                            vm.result = "Money is Transferred to account successfully."
                        }
                        
                        vm.fundTransferObj = {};
                    },
                    function (data) {
                        vm.result = {};
                        vm.notExist = {};
                        vm.notExist = data;
                        vm.fundTransferObj = {};
                        vm.result = {};
                    })
                .then(function () {
                    $location.path('/fundTransfer');
                });
        }

    }
})();