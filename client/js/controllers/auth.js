angular
  .module("app")
  .controller("AuthLoginController", ["$scope", "AuthService", "$state", ($scope, AuthService, $state) => {
    $scope.user = {
      email: "foo@bar.com",
      password: "foobar"
    };
    $scope.login = () => {
      AuthService.login($scope.user.email, $scope.user.password).then(() => {
        if ($scope.returnTo && $scope.returnTo.state) {
          $state.go($scope.returnTo.state.name, $scope.returnTo.params);
          $scope.returnTo.state = null;
          $scope.returnTo.params = null;
          return;
        }
        $state.go("add-review");
      });
    };
  }])
  .controller("AuthLogoutController", ["$scope", "AuthService", "$state", ($scope, AuthService, $state) => {
    AuthService.logout().then(() => {
      $state.go("all-reviews");
    });
  }]).controller("SignUpController", ["$scope", "AuthService", "$state", ($scope, AuthService, $state) => {
    $scope.user = {
      email: "baz@qux.com",
      password: "bazqux"
    };
    $scope.register = () => {
      AuthService.register($scope.user.email, $scope.user.password).then(() => {
        $state.transitionTo("sign-up-success");
      });
    };
  }]);
