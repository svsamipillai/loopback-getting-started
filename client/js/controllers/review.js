angular
  .module("app")
  .controller("AllReviewsController", ["$scope", "Review", ($scope, Review) => {
    $scope.reviews = Review.find({
      filter: {
        include: ["coffeeShop", "reviewer"]
      }
    });
  }])
  .controller("AddReviewController", ["$scope", "CoffeeShop", "Review", "$state", ($scope, CoffeeShop, Review, $state) => {
    $scope.action = "Add";
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = false;
    CoffeeShop.find().$promise.then((coffeeShops) => {
      $scope.coffeeShops = coffeeShops;
      $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
    });
    $scope.submitForm = () => {
      Review.create({
        rating: $scope.review.rating,
        comments: $scope.review.comments,
        coffeeShopId: $scope.selectedShop.id
      }).$promise.then(() => {
        $state.go("all-reviews");
      });
    };
  }])
  .controller("DeleteReviewController", ["$scope", "Review", "$state", "$stateParams", ($scope, Review, $state, $stateParams) => {
    Review.deleteById({
      id: $stateParams.id
    }).$promise.then(() => {
      $state.go("my-reviews");
    });
  }])
  .controller("EditReviewController", ["$scope", "$q", "CoffeeShop", "Review", "$stateParams", "$state", ($scope, $q, CoffeeShop, Review, $stateParams, $state) => {
    $scope.action = "Edit";
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = true;
    $q.all([CoffeeShop.find().$promise, Review.findById({
      id: $stateParams.id
    }).$promise]).then((data) => {
      var coffeeShops = $scope.coffeeShops = data[0];
      $scope.review = data[1];
      $scope.selectedShop;
      var selectedShopIndex = coffeeShops.map((coffeeShop) => {
        return coffeeShop.id;
      }).indexOf($scope.review.coffeeShopId);
      $scope.selectedShop = coffeeShops[selectedShopIndex];
    });
    $scope.submitForm = () => {
      $scope.review.coffeeShopId = $scope.selectedShop.id;
      $scope.review.$save().then((review) => {
        $state.go("all-reviews");
      });
    };
  }])
  .controller("MyReviewsController", ["$scope", "Review", ($scope, Review) => {
    $scope.$watch("currentUser.id", (value) => {
      if (!value) {
        return;
      }
      $scope.reviews = Review.find({
        filter: {
          where: {
            publisherId: $scope.currentUser.id
          },
          include: ["coffeeShop", "reviewer"]
        }
      });
    });
  }]);
