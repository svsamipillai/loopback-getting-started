angular
  .module("app", ["ui.router", "lbServices"])
  .config(["$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state("add-review", {
        url: "/add-review",
        templateUrl: "views/review-form.html",
        controller: "AddReviewController",
        authenticate: true
      })
      .state("all-reviews", {
        url: "/all-reviews",
        templateUrl: "views/all-reviews.html",
        controller: "AllReviewsController"
      })
      .state("edit-review", {
        url: "/edit-review/:id",
        templateUrl: "views/review-form.html",
        controller: "EditReviewController",
        authenticate: true
      })
      .state("delete-review", {
        url: "/delete-review/:id",
        controller: "DeleteReviewController",
        authenticate: true
      })
      .state("forbidden", {
        url: "/forbidden",
        templateUrl: "views/forbidden.html"
      })
      .state("login", {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "AuthLoginController"
      })
      .state("logout", {
        url: "/logout",
        controller: "AuthLogoutController"
      }).state("my-reviews", {
        url: "/my-reviews",
        templateUrl: "views/my-reviews.html",
        controller: "MyReviewsController",
        authenticate: true
      }).state("sign-up", {
        url: "/sign-up",
        templateUrl: "views/sign-up-form.html",
        controller: "SignUpController"
      }).state("sign-up-success", {
        url: "/sign-up/success",
        templateUrl: "views/sign-up-success.html"
      });
    $urlRouterProvider.otherwise("all-reviews");
  }]).run(["$rootScope", "$state", "LoopBackAuth", "AuthService", ($rootScope, $state, LoopBackAuth, AuthService) => {
    $rootScope.$on("$stateChangeStart", (event, toState, toParams) => {
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault();
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };
        $state.go("forbidden");
      }
    });
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);
