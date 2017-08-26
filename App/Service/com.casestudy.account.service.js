(function () {

    angular.module("WEP")

        .factory('accountService', accountService);
    accountService.$injector = ['$http']

    function accountService($http) {
        var vm = this;
        var object = {};
        vm.result;
        vm.accountId;
        vm.accountDetailLink;
        vm.userName;
        vm.password;


        //check whether account exist
        object.isValid = function (userAuthData) {
            
            vm.userName = userAuthData.userName;
            vm.password = userAuthData.password;
            var data = {
                username: vm.userName,
                password: vm.password
            };
            return $http.post('/validUser', JSON.stringify(data))
                .then(function (response) {
                    vm.result = response.data;
                    vm.accountId = vm.result.accountId;
                    return response.data;
                }
            );
        }
        //Get Personal Details
        object.getPersonalDetails = function () {
            var data = {
                username: vm.userName,
                password: vm.password
            };
            return $http.post("/userDetails",JSON.stringify(data))
                .then(function (response) {
                    vm.result = response.data;
                    return response.data;
                });
           
        }

        //deposit Money
        object.processDepositRequest = function (depositObj) {
            if (depositObj.selectedPaymentMode == 'Cash') {
                depositObj.commonSelectedValue = 'NA';
            }
            return $http({
                'url': "http://localhost:8080/UserAccountAPI/webapi/users/accounts/" + depositObj.accountId + "/deposits/" + depositObj.amount + "/" + depositObj.selectedPaymentMode + "/" + depositObj.commonSelectedValue,
                'method': 'POST'
            }).then(function (data) {
                vm.result = data;
                return data;
            });
        }

        //account details
        object.getUserAccountDetails = function () {
           vm.accountDetailLink = vm.result.accountDetailsUri;
           console.log(vm.accountDetailLink);
           var data = {
                accountDetailLnk: vm.accountDetailLink
            };
            return $http.post("/accountDetails",JSON.stringify(data))
                    .then(function (response) {   
                    return response.data;
                });
            
        }

        object.addBenificary = function (benificiarObj) {
            console.log("Account_IDDDDDDD in add benificiary"+vm.accountId);
           var data = {
                benificiaryObj: benificiarObj,
                accountId : vm.accountId
            };
            return $http.post("/addBenificiary",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                });
            
        }
        
        object.getAllBenificiaryByAccountId = function () {
           var data = {
                accountId : vm.accountId
            };
            return $http.post("/getAllBenificiaryByAccountId",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                });

        }
        
        object.getTransactionsByAccountId = function () {
           var data = {
                accountId : vm.accountId
            };
            return $http.post("/getTransactionsByAccountId",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                });

        }

        object.processFundTransferRequest = function (fundTransferObj) {
           var data = {
                fundTransferObjValues : fundTransferObj
            };
            return $http.post("/processFundTransferRequest",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                });

        }
        object.addCustomer = function(customerObj){
           var data = {
                customrObj : customerObj
            };
            return $http.post("/addCustomer",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                }); 
        }
        object.removeBenificary = function(benificiaryAccountNo){
            var data = {
                bAccountNo : benificiaryAccountNo
            };
            return $http.post("/removeBenificiary",JSON.stringify(data))
                    .then(function (response) {
                    return response.data;
                });
        }
        return object;

    }

})();