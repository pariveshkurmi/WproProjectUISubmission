(function () {
    angular.module("WEP")

    .controller('benificiaryController', benificiaryController);

    benificiaryController.$inject = ['accountService', '$location']

    function benificiaryController(accountService, $location) {
        var vm = this;
        vm.result =[];
        vm.error;
        vm.benificiaryObj={};
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
        var promise = accountService.getAllBenificiaryByAccountId();
        promise.then(function (data) {
                    vm.result = data;
                },
                function (data) {
                    vm.result = data;
                })
            .then(function () {
            });
        vm.addNewPayeeForm = function () {
            $location.path('/addBenificiary');
        }
       vm.addBenificiary = function(){
           if(vm.benificiaryObj.benificiaryAccountNo == vm.benificiaryObj.reEnterBenificiaryAccountNo){
                 var promise = accountService.addBenificary(vm.benificiaryObj);
             promise.then(function (data) { //checking promise object if it is Resolved
                        vm.result = data;
                         if (data != null) {
                             $location.path('/benificiaryList');
                         }
                     },
                     function (data) { //checking promise object if it is Error
                         vm.result = data;
                        
                   })
                 .then(function () {
                 });
           }
        else{
            vm.error = 'The benificiary account number fields does not match.';
        }
            
       }
       vm.cancelAddPayee = function(){
           $location.path('/benificiaryList');
       }
    
       vm.removeRow = function(benificiaryAccountNo){

         var promise = accountService.removeBenificary(benificiaryAccountNo);
             promise.then(function (data) { //checking promise object if it is Resolved
                        vm.result = data;
                         if (data != null) {
                             $location.path('/benificiaryList');
                         }
                     },
                     function (data) { //checking promise object if it is Error
                         vm.result = data;
                        
                   })
                 .then(function () {
                 });
       }
    }
})();