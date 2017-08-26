(function () {

    angular.module('WEP', ['ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {

        $routeProvider.when('/loginPage', {
            templateUrl: 'App/Views/Login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        }).when('/userDetails', {
            templateUrl: 'App/Views/User-Details.html',
            controller: 'userDetailsController',
            controllerAs: 'vm'
        }).when('/fundTransferOption', {
            templateUrl: 'App/Views/fund-transfer-options.html',
            controller: 'fundTransferController',
            controllerAs: 'vm'
        }).when('/fundTransfer', {
            templateUrl: 'App/Views/fund-transfer.html',
            controller: 'fundTransferController',
            controllerAs: 'vm'
        }).when('/accountDetails', {
            templateUrl: 'App/Views/Account-Details.html',
            controller: 'accountDetailsController',
            controllerAs: 'vm'
        }).when('/deposit', {
            templateUrl: 'App/Views/Deposit-Page.html',
            controller: 'depositController',
            controllerAs: 'vm'
        }).when('/benificiaryList', {
            templateUrl: 'App/Views/benificiary-list.html',
            controller: 'benificiaryController',
            controllerAs: 'vm'
        }).when('/customer', {
            templateUrl: 'App/Views/Create-Customer.html',
            controller: 'customerController',
            controllerAs: 'vm'
        }).when('/aboutUs', {
            templateUrl: 'App/Views/About-us.html',
        }).when('/addBenificiary', {
            templateUrl: 'App/Views/Add-Benificiary.html',
            controller: 'benificiaryController',
            controllerAs: 'vm'
        }).when('/transactionList', {
            templateUrl: 'App/Views/transaction-list.html',
            controller: 'transactionController',
            controllerAs: 'vm'
        }).otherwise({
            //template : '<h1> Illegal Template <h1>'
            redirectTo: '/loginPage'
        })
     
    }])

})();