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
        }).when('/accountDetails', {
            templateUrl: 'App/Views/Account-Details.html',
            controller: 'accountDetailsController',
            controllerAs: 'vm'
        }).when('/deposit', {
            templateUrl: 'App/Views/Deposit-Page.html',
            controller: 'depositController',
            controllerAs: 'vm'
        }).otherwise({
            //template : '<h1> Illegal Template <h1>'
            redirectTo: '/loginPage'
        })
     
    }])

})();