(function () {

    angular.module("WEP")

    .factory('accountService', accountService);
    accountService.$injector = ['$http']

    function accountService($http) {
        var vm = this;
        var object = {};
        vm.result;
        vm.accountDetailLink;
        vm.userName;
        vm.password;
        
        
        //check whether account exist
        object.isValid = function (userAuthData) {
            vm.userName = userAuthData.userName;
            vm.password = userAuthData.password;
            return $http({
                'url': "http://localhost:8080/UserAccountAPI/webapi/users/"+userAuthData.userName+"/"+userAuthData.password,
                'method': 'GET'
            }).then(function (data) {
                vm.result = data;
                return data;
            });
        }


        //Get Personal Details
        object.getPersonalDetails = function () {
            return $http({
                'url': "http://localhost:8080/UserAccountAPI/webapi/users/"+vm.userName+"/"+vm.password,
                'method': 'GET'
            }).then(function (data) {
                vm.result = data;
                console.log(vm.result);
                return data;
            });
        }

        //deposit Money
        object.processDepositRequest = function (depositObj) {
            if(depositObj.selectedPaymentMode == 'Cash'){
                depositObj.commonSelectedValue = 'NA';
            }
            return $http({
                'url': "http://localhost:8080/UserAccountAPI/webapi/users/accounts/"+depositObj.accountId+"/deposits/"+depositObj.amount+"/"+depositObj.selectedPaymentMode+"/"+depositObj.commonSelectedValue,
                'method': 'POST'
            }).then(function (data) {
                vm.result = data;
                return data;
            });
        }
       
        //account details
        object.getUserAccountDetails = function () {
            vm.accountDetailLink = vm.result.data.accountDetailsUri;
            return $http({
                'url': vm.accountDetailLink,
                'method': 'GET'
            }).then(function (data) {
                vm.result = data;
                return data;
            });
        }
        return object;

    }

})();