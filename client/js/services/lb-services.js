if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
  module.exports = "lbServices";
}
(function (window, angular, undefined) {
  var urlBase = "/api";
  var authHeader = "authorization";

  function getHost(url) {
      var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
      return m ? m[1] : null;
  }
  var urlBaseHost = getHost(urlBase) ? urlBase : location.host;
  var module = angular.module("lbServices", ["ngResource"]);
  module.factory("User", ["LoopBackResource", "LoopBackAuth", "$injector", "$q", function (LoopBackResource, LoopBackAuth, $injector, $q) {
      var R = LoopBackResource(urlBase + "/Users/:id", {
          "id": "@id"
      }, {
          "prototype$__findById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "GET"
          },
          "prototype$__destroyById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "DELETE"
          },
          "prototype$__updateById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "PUT"
          },
          "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Users/:id/accessTokens",
              method: "GET"
          },
          "prototype$__create__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "POST"
          },
          "prototype$__delete__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "DELETE"
          },
          "prototype$__count__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens/count",
              method: "GET"
          },
          "create": {
              url: urlBase + "/Users",
              method: "POST"
          },
          "createMany": {
              isArray: true,
              url: urlBase + "/Users",
              method: "POST"
          },
          "patchOrCreate": {
              url: urlBase + "/Users",
              method: "PATCH"
          },
          "replaceOrCreate": {
              url: urlBase +
                  "/Users/replaceOrCreate",
              method: "POST"
          },
          "upsertWithWhere": {
              url: urlBase + "/Users/upsertWithWhere",
              method: "POST"
          },
          "exists": {
              url: urlBase + "/Users/:id/exists",
              method: "GET"
          },
          "findById": {
              url: urlBase + "/Users/:id",
              method: "GET"
          },
          "replaceById": {
              url: urlBase + "/Users/:id/replace",
              method: "POST"
          },
          "find": {
              isArray: true,
              url: urlBase + "/Users",
              method: "GET"
          },
          "findOne": {
              url: urlBase + "/Users/findOne",
              method: "GET"
          },
          "updateAll": {
              url: urlBase + "/Users/update",
              method: "POST"
          },
          "deleteById": {
              url: urlBase +
                  "/Users/:id",
              method: "DELETE"
          },
          "count": {
              url: urlBase + "/Users/count",
              method: "GET"
          },
          "prototype$patchAttributes": {
              url: urlBase + "/Users/:id",
              method: "PATCH"
          },
          "createChangeStream": {
              url: urlBase + "/Users/change-stream",
              method: "POST"
          },
          "login": {
              params: {
                  include: "user"
              },
              interceptor: {
                  response: function (response) {
                      var accessToken = response.data;
                      LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
                      LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
                      LoopBackAuth.save();
                      return response.resource;
                  }
              },
              url: urlBase + "/Users/login",
              method: "POST"
          },
          "logout": {
              interceptor: {
                  response: function (response) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return response.resource;
                  },
                  responseError: function (responseError) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return responseError.resource;
                  }
              },
              url: urlBase + "/Users/logout",
              method: "POST"
          },
          "prototype$verify": {
              url: urlBase + "/Users/:id/verify",
              method: "POST"
          },
          "confirm": {
              url: urlBase + "/Users/confirm",
              method: "GET"
          },
          "resetPassword": {
              url: urlBase + "/Users/reset",
              method: "POST"
          },
          "changePassword": {
              url: urlBase + "/Users/change-password",
              method: "POST"
          },
          "setPassword": {
              url: urlBase + "/Users/reset-password",
              method: "POST"
          },
          "getCurrent": {
              url: urlBase + "/Users" + "/:id",
              method: "GET",
              params: {
                  id: function () {
                      var id = LoopBackAuth.currentUserId;
                      if (id == null) {
                          id = "__anonymous__";
                      }
                      return id;
                  }
              },
              interceptor: {
                  response: function (response) {
                      LoopBackAuth.currentUserData = response.data;
                      return response.resource;
                  },
                  responseError: function (responseError) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return $q.reject(responseError);
                  }
              },
              __isGetCurrentUser__: true
          }
      });
      R["upsert"] = R["patchOrCreate"];
      R["updateOrCreate"] = R["patchOrCreate"];
      R["patchOrCreateWithWhere"] = R["upsertWithWhere"];
      R["update"] = R["updateAll"];
      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];
      R["prototype$updateAttributes"] = R["prototype$patchAttributes"];
      R.getCachedCurrent = function () {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
      };
      R.isAuthenticated = function () {
          return this.getCurrentId() != null;
      };
      R.getCurrentId = function () {
          return LoopBackAuth.currentUserId;
      };
      R.modelName = "User";
      return R;
  }]);
  module.factory("CoffeeShop", ["LoopBackResource", "LoopBackAuth", "$injector", "$q", function (LoopBackResource, LoopBackAuth, $injector, $q) {
      var R = LoopBackResource(urlBase + "/CoffeeShops/:id", {
          "id": "@id"
      }, {
          "prototype$__findById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviews/:fk",
              method: "GET"
          },
          "prototype$__destroyById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviews/:fk",
              method: "DELETE"
          },
          "prototype$__updateById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviews/:fk",
              method: "PUT"
          },
          "prototype$__findById__reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "GET"
          },
          "prototype$__destroyById__reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "DELETE"
          },
          "prototype$__updateById__reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "PUT"
          },
          "prototype$__get__reviews": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "GET"
          },
          "prototype$__create__reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "POST"
          },
          "prototype$__delete__reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "DELETE"
          },
          "prototype$__count__reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews/count",
              method: "GET"
          },
          "prototype$__get__reviewers": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "GET"
          },
          "prototype$__create__reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "POST"
          },
          "prototype$__delete__reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "DELETE"
          },
          "prototype$__count__reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers/count",
              method: "GET"
          },
          "create": {
              url: urlBase + "/CoffeeShops",
              method: "POST"
          },
          "createMany": {
              isArray: true,
              url: urlBase + "/CoffeeShops",
              method: "POST"
          },
          "patchOrCreate": {
              url: urlBase + "/CoffeeShops",
              method: "PATCH"
          },
          "replaceOrCreate": {
              url: urlBase + "/CoffeeShops/replaceOrCreate",
              method: "POST"
          },
          "upsertWithWhere": {
              url: urlBase + "/CoffeeShops/upsertWithWhere",
              method: "POST"
          },
          "exists": {
              url: urlBase + "/CoffeeShops/:id/exists",
              method: "GET"
          },
          "findById": {
              url: urlBase + "/CoffeeShops/:id",
              method: "GET"
          },
          "replaceById": {
              url: urlBase +
                  "/CoffeeShops/:id/replace",
              method: "POST"
          },
          "find": {
              isArray: true,
              url: urlBase + "/CoffeeShops",
              method: "GET"
          },
          "findOne": {
              url: urlBase + "/CoffeeShops/findOne",
              method: "GET"
          },
          "updateAll": {
              url: urlBase + "/CoffeeShops/update",
              method: "POST"
          },
          "deleteById": {
              url: urlBase + "/CoffeeShops/:id",
              method: "DELETE"
          },
          "count": {
              url: urlBase + "/CoffeeShops/count",
              method: "GET"
          },
          "prototype$patchAttributes": {
              url: urlBase + "/CoffeeShops/:id",
              method: "PATCH"
          },
          "createChangeStream": {
              url: urlBase + "/CoffeeShops/change-stream",
              method: "POST"
          },
          "status": {
              url: urlBase + "/CoffeeShops/status",
              method: "GET"
          },
          "::get::Review::coffeeShop": {
              url: urlBase + "/reviews/:id/coffeeShop",
              method: "GET"
          }
      });
      R["upsert"] = R["patchOrCreate"];
      R["updateOrCreate"] = R["patchOrCreate"];
      R["patchOrCreateWithWhere"] = R["upsertWithWhere"];
      R["update"] = R["updateAll"];
      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];
      R["prototype$updateAttributes"] = R["prototype$patchAttributes"];
      R.modelName = "CoffeeShop";
      R.reviews = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::get::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.count = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::count::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.create = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::create::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.createMany = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::createMany::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.destroyAll = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::delete::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.destroyById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::destroyById::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.findById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::findById::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.updateById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::updateById::CoffeeShop::reviews"];
          return action.apply(R, arguments);
      };
      R.reviewers = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::get::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.count = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::count::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.create = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::create::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.createMany = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::createMany::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.destroyAll = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::delete::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.destroyById = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::destroyById::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.findById = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::findById::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      R.reviewers.updateById = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::updateById::CoffeeShop::reviewers"];
          return action.apply(R, arguments);
      };
      return R;
  }]);
  module.factory("Review", ["LoopBackResource", "LoopBackAuth", "$injector", "$q", function (LoopBackResource, LoopBackAuth, $injector, $q) {
      var R = LoopBackResource(urlBase + "/reviews/:id", {
          "id": "@id"
      }, {
          "prototype$__get__coffeeShop": {
              url: urlBase + "/reviews/:id/coffeeShop",
              method: "GET"
          },
          "prototype$__get__reviewer": {
              url: urlBase + "/reviews/:id/reviewer",
              method: "GET"
          },
          "create": {
              url: urlBase + "/reviews",
              method: "POST"
          },
          "createMany": {
              isArray: true,
              url: urlBase + "/reviews",
              method: "POST"
          },
          "patchOrCreate": {
              url: urlBase + "/reviews",
              method: "PATCH"
          },
          "replaceOrCreate": {
              url: urlBase + "/reviews/replaceOrCreate",
              method: "POST"
          },
          "upsertWithWhere": {
              url: urlBase +
                  "/reviews/upsertWithWhere",
              method: "POST"
          },
          "exists": {
              url: urlBase + "/reviews/:id/exists",
              method: "GET"
          },
          "findById": {
              url: urlBase + "/reviews/:id",
              method: "GET"
          },
          "replaceById": {
              url: urlBase + "/reviews/:id/replace",
              method: "POST"
          },
          "find": {
              isArray: true,
              url: urlBase + "/reviews",
              method: "GET"
          },
          "findOne": {
              url: urlBase + "/reviews/findOne",
              method: "GET"
          },
          "updateAll": {
              url: urlBase + "/reviews/update",
              method: "POST"
          },
          "deleteById": {
              url: urlBase + "/reviews/:id",
              method: "DELETE"
          },
          "count": {
              url: urlBase +
                  "/reviews/count",
              method: "GET"
          },
          "prototype$patchAttributes": {
              url: urlBase + "/reviews/:id",
              method: "PATCH"
          },
          "createChangeStream": {
              url: urlBase + "/reviews/change-stream",
              method: "POST"
          },
          "::findById::CoffeeShop::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviews/:fk",
              method: "GET"
          },
          "::destroyById::CoffeeShop::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviews/:fk",
              method: "DELETE"
          },
          "::updateById::CoffeeShop::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase +
                  "/CoffeeShops/:id/reviews/:fk",
              method: "PUT"
          },
          "::get::CoffeeShop::reviews": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "GET"
          },
          "::create::CoffeeShop::reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "POST"
          },
          "::createMany::CoffeeShop::reviews": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "POST"
          },
          "::delete::CoffeeShop::reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews",
              method: "DELETE"
          },
          "::count::CoffeeShop::reviews": {
              url: urlBase + "/CoffeeShops/:id/reviews/count",
              method: "GET"
          },
          "::findById::Reviewer::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "GET"
          },
          "::destroyById::Reviewer::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "DELETE"
          },
          "::updateById::Reviewer::reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "PUT"
          },
          "::get::Reviewer::reviews": {
              isArray: true,
              url: urlBase + "/reviewers/:id/reviews",
              method: "GET"
          },
          "::create::Reviewer::reviews": {
              url: urlBase +
                  "/reviewers/:id/reviews",
              method: "POST"
          },
          "::createMany::Reviewer::reviews": {
              isArray: true,
              url: urlBase + "/reviewers/:id/reviews",
              method: "POST"
          },
          "::delete::Reviewer::reviews": {
              url: urlBase + "/reviewers/:id/reviews",
              method: "DELETE"
          },
          "::count::Reviewer::reviews": {
              url: urlBase + "/reviewers/:id/reviews/count",
              method: "GET"
          }
      });
      R["upsert"] = R["patchOrCreate"];
      R["updateOrCreate"] = R["patchOrCreate"];
      R["patchOrCreateWithWhere"] = R["upsertWithWhere"];
      R["update"] = R["updateAll"];
      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];
      R["prototype$updateAttributes"] = R["prototype$patchAttributes"];
      R.modelName = "Review";
      R.coffeeShop = function () {
          var TargetResource = $injector.get("CoffeeShop");
          var action = TargetResource["::get::Review::coffeeShop"];
          return action.apply(R, arguments);
      };
      R.reviewer = function () {
          var TargetResource = $injector.get("Reviewer");
          var action = TargetResource["::get::Review::reviewer"];
          return action.apply(R, arguments);
      };
      return R;
  }]);
  module.factory("Reviewer", ["LoopBackResource", "LoopBackAuth", "$injector", "$q", function (LoopBackResource, LoopBackAuth, $injector, $q) {
      var R = LoopBackResource(urlBase + "/reviewers/:id", {
          "id": "@id"
      }, {
          "prototype$__findById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/accessTokens/:fk",
              method: "GET"
          },
          "prototype$__destroyById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/accessTokens/:fk",
              method: "DELETE"
          },
          "prototype$__updateById__accessTokens": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/accessTokens/:fk",
              method: "PUT"
          },
          "prototype$__findById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "GET"
          },
          "prototype$__destroyById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "DELETE"
          },
          "prototype$__updateById__reviews": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/reviewers/:id/reviews/:fk",
              method: "PUT"
          },
          "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/reviewers/:id/accessTokens",
              method: "GET"
          },
          "prototype$__create__accessTokens": {
              url: urlBase + "/reviewers/:id/accessTokens",
              method: "POST"
          },
          "prototype$__delete__accessTokens": {
              url: urlBase + "/reviewers/:id/accessTokens",
              method: "DELETE"
          },
          "prototype$__count__accessTokens": {
              url: urlBase + "/reviewers/:id/accessTokens/count",
              method: "GET"
          },
          "prototype$__get__reviews": {
              isArray: true,
              url: urlBase + "/reviewers/:id/reviews",
              method: "GET"
          },
          "prototype$__create__reviews": {
              url: urlBase + "/reviewers/:id/reviews",
              method: "POST"
          },
          "prototype$__delete__reviews": {
              url: urlBase + "/reviewers/:id/reviews",
              method: "DELETE"
          },
          "prototype$__count__reviews": {
              url: urlBase +
                  "/reviewers/:id/reviews/count",
              method: "GET"
          },
          "create": {
              url: urlBase + "/reviewers",
              method: "POST"
          },
          "createMany": {
              isArray: true,
              url: urlBase + "/reviewers",
              method: "POST"
          },
          "patchOrCreate": {
              url: urlBase + "/reviewers",
              method: "PATCH"
          },
          "replaceOrCreate": {
              url: urlBase + "/reviewers/replaceOrCreate",
              method: "POST"
          },
          "upsertWithWhere": {
              url: urlBase + "/reviewers/upsertWithWhere",
              method: "POST"
          },
          "exists": {
              url: urlBase + "/reviewers/:id/exists",
              method: "GET"
          },
          "findById": {
              url: urlBase + "/reviewers/:id",
              method: "GET"
          },
          "replaceById": {
              url: urlBase + "/reviewers/:id/replace",
              method: "POST"
          },
          "find": {
              isArray: true,
              url: urlBase + "/reviewers",
              method: "GET"
          },
          "findOne": {
              url: urlBase + "/reviewers/findOne",
              method: "GET"
          },
          "updateAll": {
              url: urlBase + "/reviewers/update",
              method: "POST"
          },
          "deleteById": {
              url: urlBase + "/reviewers/:id",
              method: "DELETE"
          },
          "count": {
              url: urlBase + "/reviewers/count",
              method: "GET"
          },
          "prototype$patchAttributes": {
              url: urlBase + "/reviewers/:id",
              method: "PATCH"
          },
          "createChangeStream": {
              url: urlBase +
                  "/reviewers/change-stream",
              method: "POST"
          },
          "login": {
              params: {
                  include: "user"
              },
              interceptor: {
                  response: function (response) {
                      var accessToken = response.data;
                      LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
                      LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
                      LoopBackAuth.save();
                      return response.resource;
                  }
              },
              url: urlBase + "/reviewers/login",
              method: "POST"
          },
          "logout": {
              interceptor: {
                  response: function (response) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return response.resource;
                  },
                  responseError: function (responseError) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return responseError.resource;
                  }
              },
              url: urlBase + "/reviewers/logout",
              method: "POST"
          },
          "prototype$verify": {
              url: urlBase + "/reviewers/:id/verify",
              method: "POST"
          },
          "confirm": {
              url: urlBase + "/reviewers/confirm",
              method: "GET"
          },
          "resetPassword": {
              url: urlBase + "/reviewers/reset",
              method: "POST"
          },
          "changePassword": {
              url: urlBase + "/reviewers/change-password",
              method: "POST"
          },
          "setPassword": {
              url: urlBase + "/reviewers/reset-password",
              method: "POST"
          },
          "::findById::CoffeeShop::reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "GET"
          },
          "::destroyById::CoffeeShop::reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "DELETE"
          },
          "::updateById::CoffeeShop::reviewers": {
              params: {
                  "fk": "@fk"
              },
              url: urlBase + "/CoffeeShops/:id/reviewers/:fk",
              method: "PUT"
          },
          "::get::CoffeeShop::reviewers": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "GET"
          },
          "::create::CoffeeShop::reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "POST"
          },
          "::createMany::CoffeeShop::reviewers": {
              isArray: true,
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "POST"
          },
          "::delete::CoffeeShop::reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers",
              method: "DELETE"
          },
          "::count::CoffeeShop::reviewers": {
              url: urlBase + "/CoffeeShops/:id/reviewers/count",
              method: "GET"
          },
          "::get::Review::reviewer": {
              url: urlBase + "/reviews/:id/reviewer",
              method: "GET"
          },
          "getCurrent": {
              url: urlBase + "/reviewers" + "/:id",
              method: "GET",
              params: {
                  id: function () {
                      var id = LoopBackAuth.currentUserId;
                      if (id == null) {
                          id = "__anonymous__";
                      }
                      return id;
                  }
              },
              interceptor: {
                  response: function (response) {
                      LoopBackAuth.currentUserData = response.data;
                      return response.resource;
                  },
                  responseError: function (responseError) {
                      LoopBackAuth.clearUser();
                      LoopBackAuth.clearStorage();
                      return $q.reject(responseError);
                  }
              },
              __isGetCurrentUser__: true
          }
      });
      R["upsert"] = R["patchOrCreate"];
      R["updateOrCreate"] = R["patchOrCreate"];
      R["patchOrCreateWithWhere"] = R["upsertWithWhere"];
      R["update"] = R["updateAll"];
      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];
      R["prototype$updateAttributes"] = R["prototype$patchAttributes"];
      R.getCachedCurrent = function () {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
      };
      R.isAuthenticated = function () {
          return this.getCurrentId() != null;
      };
      R.getCurrentId = function () {
          return LoopBackAuth.currentUserId;
      };
      R.modelName = "Reviewer";
      R.reviews = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::get::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.count = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::count::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.create = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::create::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.createMany = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::createMany::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.destroyAll = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::delete::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.destroyById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::destroyById::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.findById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::findById::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      R.reviews.updateById = function () {
          var TargetResource = $injector.get("Review");
          var action = TargetResource["::updateById::Reviewer::reviews"];
          return action.apply(R, arguments);
      };
      return R;
  }]);
  module.factory("LoopBackAuth", function () {
      var props = ["accessTokenId", "currentUserId", "rememberMe"];
      var propsPrefix = "$LoopBack$";

      function LoopBackAuth() {
          var self = this;
          props.forEach(function (name) {
              self[name] = load(name);
          });
          this.currentUserData = null;
      }
      LoopBackAuth.prototype.save = function () {
          var self = this;
          var storage = this.rememberMe ? localStorage : sessionStorage;
          props.forEach(function (name) {
              save(storage, name, self[name]);
          });
      };
      LoopBackAuth.prototype.setUser = function (accessTokenId, userId, userData) {
          this.accessTokenId = accessTokenId;
          this.currentUserId = userId;
          this.currentUserData = userData;
      };
      LoopBackAuth.prototype.clearUser = function () {
          this.accessTokenId = null;
          this.currentUserId = null;
          this.currentUserData = null;
      };
      LoopBackAuth.prototype.clearStorage = function () {
          props.forEach(function (name) {
              save(sessionStorage, name, null);
              save(localStorage, name, null);
          });
      };
      return new LoopBackAuth;

      function save(storage, name, value) {
          try {
              var key = propsPrefix + name;
              if (value == null) {
                  value = "";
              }
              storage[key] = value;
          } catch (err) {
              console.log("Cannot access local/session storage:", err);
          }
      }

      function load(name) {
          var key = propsPrefix + name;
          return localStorage[key] || sessionStorage[key] || null;
      }
  }).config(["$httpProvider", function ($httpProvider) {
      $httpProvider.interceptors.push("LoopBackAuthRequestInterceptor");
  }]).factory("LoopBackAuthRequestInterceptor", ["$q", "LoopBackAuth", function ($q, LoopBackAuth) {
      return {
          "request": function (config) {
              var host = getHost(config.url);
              if (host && config.url.indexOf(urlBaseHost) === -1) {
                  return config;
              }
              if (LoopBackAuth.accessTokenId) {
                  config.headers[authHeader] = LoopBackAuth.accessTokenId;
              } else {
                  if (config.__isGetCurrentUser__) {
                      var res = {
                          body: {
                              error: {
                                  status: 401
                              }
                          },
                          status: 401,
                          config: config,
                          headers: function () {
                              return undefined;
                          }
                      };
                      return $q.reject(res);
                  }
              }
              return config || $q.when(config);
          }
      };
  }]).provider("LoopBackResource", function LoopBackResourceProvider() {
      this.setAuthHeader = function (header) {
          authHeader = header;
      };
      this.getAuthHeader = function () {
          return authHeader;
      };
      this.setUrlBase = function (url) {
          urlBase = url;
          urlBaseHost = getHost(urlBase) || location.host;
      };
      this.getUrlBase = function () {
          return urlBase;
      };
      this.$get = ["$resource", function ($resource) {
          var LoopBackResource = function (url, params, actions) {
              var resource = $resource(url, params, actions);
              resource.prototype.$save = function (success, error) {
                  var result = resource.upsert.call(this, {}, this, success, error);
                  return result.$promise || result;
              };
              return resource;
          };
          LoopBackResource.getUrlBase = function () {
              return urlBase;
          };
          LoopBackResource.getAuthHeader = function () {
              return authHeader;
          };
          return LoopBackResource;
      }];
  });
})(window, window.angular);
