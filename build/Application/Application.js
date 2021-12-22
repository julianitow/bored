"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ApplicationController = require("../ApplicationController");

var _ApplicationView = require("../View/ApplicationView");

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FIRST_LAUNCH_FILENAME = '1stLaunch';

var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2.default)(this, App);
    (0, _defineProperty2.default)(this, "appView", void 0);
    (0, _defineProperty2.default)(this, "controller", void 0);
    this.controller = new _ApplicationController.ApplicationController(this);
    this.appView = new _ApplicationView.ApplicationView(this.controller);
  }

  (0, _createClass2.default)(App, [{
    key: "checkFirstLaunch",
    value: function checkFirstLaunch() {
      return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, '../conf/', FIRST_LAUNCH_FILENAME), function (err, buff) {
          if (err) reject(err);
          var val = buff.toString();

          if (val == 'true') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
  }, {
    key: "setFirstLaunch",
    value: function setFirstLaunch(val) {
      fs.writeFileSync(path.join(__dirname, '../conf/', FIRST_LAUNCH_FILENAME), val);
    }
  }, {
    key: "view",
    value: function view() {
      if (this.appView === undefined) {
        console.error('View undefined');
        return;
      }

      this.appView.render();
    }
  }]);
  return App;
}();

exports.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6WyJGSVJTVF9MQVVOQ0hfRklMRU5BTUUiLCJBcHAiLCJjb250cm9sbGVyIiwiQXBwbGljYXRpb25Db250cm9sbGVyIiwiYXBwVmlldyIsIkFwcGxpY2F0aW9uVmlldyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnMiLCJyZWFkRmlsZSIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiZXJyIiwiYnVmZiIsInZhbCIsInRvU3RyaW5nIiwid3JpdGVGaWxlU3luYyIsInVuZGVmaW5lZCIsImNvbnNvbGUiLCJlcnJvciIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEscUJBQXFCLEdBQUcsV0FBOUI7O0lBRWFDLEc7QUFLVCxpQkFBYztBQUFBO0FBQUE7QUFBQTtBQUNWLFNBQUtDLFVBQUwsR0FBa0IsSUFBSUMsNENBQUosQ0FBMEIsSUFBMUIsQ0FBbEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsZ0NBQUosQ0FBb0IsS0FBS0gsVUFBekIsQ0FBZjtBQUNIOzs7O1dBRUQsNEJBQXFDO0FBQ2pDLGFBQU8sSUFBSUksT0FBSixDQUFxQixVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDN0NDLFFBQUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxJQUFJLENBQUNDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixVQUFyQixFQUFpQ2IscUJBQWpDLENBQVosRUFBcUUsVUFBQ2MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDaEYsY0FBSUQsR0FBSixFQUFTTixNQUFNLENBQUNNLEdBQUQsQ0FBTjtBQUNULGNBQU1FLEdBQUcsR0FBR0QsSUFBSSxDQUFDRSxRQUFMLEVBQVo7O0FBQ0EsY0FBSUQsR0FBRyxJQUFLLE1BQVosRUFBb0I7QUFDaEJULFlBQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFDSCxXQUZELE1BRU87QUFDSEEsWUFBQUEsT0FBTyxDQUFDLEtBQUQsQ0FBUDtBQUNIO0FBQ0osU0FSRDtBQVNILE9BVk0sQ0FBUDtBQVdIOzs7V0FFRCx3QkFBZVMsR0FBZixFQUFrQztBQUM5QlAsTUFBQUEsRUFBRSxDQUFDUyxhQUFILENBQWlCUCxJQUFJLENBQUNDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixVQUFyQixFQUFpQ2IscUJBQWpDLENBQWpCLEVBQTBFZ0IsR0FBMUU7QUFDSDs7O1dBRUQsZ0JBQWE7QUFDVCxVQUFHLEtBQUtaLE9BQUwsS0FBaUJlLFNBQXBCLEVBQStCO0FBQzNCQyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxnQkFBZDtBQUNBO0FBQ0g7O0FBQ0QsV0FBS2pCLE9BQUwsQ0FBYWtCLE1BQWI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uQ29udHJvbGxlciB9IGZyb20gJy4uL0FwcGxpY2F0aW9uQ29udHJvbGxlcic7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uVmlldyB9IGZyb20gJy4uL1ZpZXcvQXBwbGljYXRpb25WaWV3JztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgRklSU1RfTEFVTkNIX0ZJTEVOQU1FID0gJzFzdExhdW5jaCdcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIHB1YmxpYyBhcHBWaWV3OiBBcHBsaWNhdGlvblZpZXc7XHJcbiAgICBwcml2YXRlIGNvbnRyb2xsZXI6IEFwcGxpY2F0aW9uQ29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQXBwbGljYXRpb25Db250cm9sbGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYXBwVmlldyA9IG5ldyBBcHBsaWNhdGlvblZpZXcodGhpcy5jb250cm9sbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ZpcnN0TGF1bmNoKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IFxyXG4gICAgICAgICAgICBmcy5yZWFkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vY29uZi8nLCBGSVJTVF9MQVVOQ0hfRklMRU5BTUUpLCAoZXJyLCBidWZmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGJ1ZmYudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaXJzdExhdW5jaCh2YWw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NvbmYvJywgRklSU1RfTEFVTkNIX0ZJTEVOQU1FKSwgdmFsKTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuYXBwVmlldyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1ZpZXcgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hcHBWaWV3LnJlbmRlcigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==