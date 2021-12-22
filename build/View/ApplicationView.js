"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationView = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ApplicationView = /*#__PURE__*/function () {
  function ApplicationView(controller) {
    (0, _classCallCheck2.default)(this, ApplicationView);
    (0, _defineProperty2.default)(this, "parentElement", void 0);
    (0, _defineProperty2.default)(this, "labelDiv", void 0);
    (0, _defineProperty2.default)(this, "infoDiv", void 0);
    (0, _defineProperty2.default)(this, "zoneDiv", void 0);
    (0, _defineProperty2.default)(this, "progress", void 0);
    (0, _defineProperty2.default)(this, "controller", void 0);
    this.init(controller);
  }

  (0, _createClass2.default)(ApplicationView, [{
    key: "init",
    value: function init(controller) {
      this.controller = controller;
      this.parentElement = document.getElementsByTagName('body')[0];
    }
  }, {
    key: "render",
    value: function render() {
      this.info();
      this.dropZone();
      this.progressBar();
      this.setEvents();
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this = this;

      document.getElementById('target').addEventListener('dragover', function (ev) {
        _this.controller.dragOverHandler(ev);
      });
      document.getElementById('target').addEventListener('drop', function (ev) {
        _this.controller.dropHandler(ev);
      });
    }
  }, {
    key: "updateInfo",
    value: function updateInfo() {
      var _this2 = this;

      this.controller.freeSpace().then(function (space) {
        _this2.infoDiv.innerText = space;
      });
    }
  }, {
    key: "info",
    value: function () {
      var _info = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.labelDiv = document.createElement('div');
                this.labelDiv.id = 'infoLabel';
                this.labelDiv.classList.add('label', 'text');
                this.labelDiv.innerText = 'Available space:';
                this.infoDiv = document.createElement('div');
                this.infoDiv.id = 'info';
                this.infoDiv.className = 'info';
                this.updateInfo();
                this.labelDiv.append(this.infoDiv);
                this.parentElement.append(this.labelDiv);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function info() {
        return _info.apply(this, arguments);
      }

      return info;
    }()
  }, {
    key: "dropZone",
    value: function dropZone() {
      this.zoneDiv = document.createElement('div');
      this.zoneDiv.id = 'target';
      this.zoneDiv.className = 'zone';
      this.zoneDiv.innerText = 'Drop file here !';
      this.parentElement.append(this.zoneDiv);
    }
  }, {
    key: "setProgressBar",
    value: function setProgressBar(value) {
      this.progress.value = value;
    }
  }, {
    key: "progressBar",
    value: function progressBar() {
      var progressDiv = document.createElement('div');
      progressDiv.classList.add('progressZone');
      var label = document.createElement('label');
      label.htmlFor = 'fileProgresss';
      label.innerText = 'Tranfert status:';
      this.progress = document.createElement('progress');
      this.progress.id = 'fileProgress';
      this.progress.max = 100;
      this.progress.value = 0;
      progressDiv.append(label);
      progressDiv.append(this.progress);
      this.parentElement.append(progressDiv);
    }
  }]);
  return ApplicationView;
}();

exports.ApplicationView = ApplicationView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3L0FwcGxpY2F0aW9uVmlldy50cyJdLCJuYW1lcyI6WyJBcHBsaWNhdGlvblZpZXciLCJjb250cm9sbGVyIiwiaW5pdCIsInBhcmVudEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5mbyIsImRyb3Bab25lIiwicHJvZ3Jlc3NCYXIiLCJzZXRFdmVudHMiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsImRyYWdPdmVySGFuZGxlciIsImRyb3BIYW5kbGVyIiwiZnJlZVNwYWNlIiwidGhlbiIsInNwYWNlIiwiaW5mb0RpdiIsImlubmVyVGV4dCIsImxhYmVsRGl2IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lIiwidXBkYXRlSW5mbyIsImFwcGVuZCIsInpvbmVEaXYiLCJ2YWx1ZSIsInByb2dyZXNzIiwicHJvZ3Jlc3NEaXYiLCJsYWJlbCIsImh0bWxGb3IiLCJtYXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDYUEsZTtBQVNULDJCQUFZQyxVQUFaLEVBQStDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDM0MsU0FBS0MsSUFBTCxDQUFVRCxVQUFWO0FBQ0g7Ozs7V0FFRCxjQUFLQSxVQUFMLEVBQThDO0FBQzFDLFdBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQkMsUUFBUSxDQUFDQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFyQjtBQUNIOzs7V0FFRCxrQkFBZTtBQUNYLFdBQUtDLElBQUw7QUFDQSxXQUFLQyxRQUFMO0FBQ0EsV0FBS0MsV0FBTDtBQUNBLFdBQUtDLFNBQUw7QUFDSDs7O1dBRUQscUJBQWtCO0FBQUE7O0FBQ2RMLE1BQUFBLFFBQVEsQ0FBQ00sY0FBVCxDQUF3QixRQUF4QixFQUFrQ0MsZ0JBQWxDLENBQW1ELFVBQW5ELEVBQStELFVBQUNDLEVBQUQsRUFBUTtBQUFFLFFBQUEsS0FBSSxDQUFDWCxVQUFMLENBQWdCWSxlQUFoQixDQUFnQ0QsRUFBaEM7QUFBcUMsT0FBOUc7QUFDQVIsTUFBQUEsUUFBUSxDQUFDTSxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxnQkFBbEMsQ0FBbUQsTUFBbkQsRUFBMkQsVUFBQ0MsRUFBRCxFQUFRO0FBQUUsUUFBQSxLQUFJLENBQUNYLFVBQUwsQ0FBZ0JhLFdBQWhCLENBQTRCRixFQUE1QjtBQUFpQyxPQUF0RztBQUNIOzs7V0FFRCxzQkFBbUI7QUFBQTs7QUFDZixXQUFLWCxVQUFMLENBQWdCYyxTQUFoQixHQUE0QkMsSUFBNUIsQ0FBaUMsVUFBQUMsS0FBSyxFQUFJO0FBQ3RDLFFBQUEsTUFBSSxDQUFDQyxPQUFMLENBQWFDLFNBQWIsR0FBeUJGLEtBQXpCO0FBQ0gsT0FGRDtBQUdIOzs7OzBGQUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSSxxQkFBS0csUUFBTCxHQUFnQmhCLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxxQkFBS0QsUUFBTCxDQUFjRSxFQUFkLEdBQW1CLFdBQW5CO0FBQ0EscUJBQUtGLFFBQUwsQ0FBY0csU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsT0FBNUIsRUFBcUMsTUFBckM7QUFDQSxxQkFBS0osUUFBTCxDQUFjRCxTQUFkLEdBQTBCLGtCQUExQjtBQUVBLHFCQUFLRCxPQUFMLEdBQWVkLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZjtBQUNBLHFCQUFLSCxPQUFMLENBQWFJLEVBQWIsR0FBa0IsTUFBbEI7QUFDQSxxQkFBS0osT0FBTCxDQUFhTyxTQUFiLEdBQXlCLE1BQXpCO0FBQ0EscUJBQUtDLFVBQUw7QUFFQSxxQkFBS04sUUFBTCxDQUFjTyxNQUFkLENBQXFCLEtBQUtULE9BQTFCO0FBQ0EscUJBQUtmLGFBQUwsQ0FBbUJ3QixNQUFuQixDQUEwQixLQUFLUCxRQUEvQjs7QUFaSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBZUEsb0JBQWlCO0FBQ2IsV0FBS1EsT0FBTCxHQUFleEIsUUFBUSxDQUFDaUIsYUFBVCxDQUF1QixLQUF2QixDQUFmO0FBQ0EsV0FBS08sT0FBTCxDQUFhTixFQUFiLEdBQWtCLFFBQWxCO0FBQ0EsV0FBS00sT0FBTCxDQUFhSCxTQUFiLEdBQXlCLE1BQXpCO0FBQ0EsV0FBS0csT0FBTCxDQUFhVCxTQUFiLEdBQXlCLGtCQUF6QjtBQUNBLFdBQUtoQixhQUFMLENBQW1Cd0IsTUFBbkIsQ0FBMEIsS0FBS0MsT0FBL0I7QUFDSDs7O1dBRUQsd0JBQWVDLEtBQWYsRUFBb0M7QUFDaEMsV0FBS0MsUUFBTCxDQUFjRCxLQUFkLEdBQXNCQSxLQUF0QjtBQUNIOzs7V0FFRCx1QkFBb0I7QUFDaEIsVUFBTUUsV0FBMkIsR0FBRzNCLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBcEM7QUFDQVUsTUFBQUEsV0FBVyxDQUFDUixTQUFaLENBQXNCQyxHQUF0QixDQUEwQixjQUExQjtBQUVBLFVBQU1RLEtBQXVCLEdBQUc1QixRQUFRLENBQUNpQixhQUFULENBQXVCLE9BQXZCLENBQWhDO0FBQ0FXLE1BQUFBLEtBQUssQ0FBQ0MsT0FBTixHQUFnQixlQUFoQjtBQUNBRCxNQUFBQSxLQUFLLENBQUNiLFNBQU4sR0FBa0Isa0JBQWxCO0FBRUEsV0FBS1csUUFBTCxHQUFnQjFCLFFBQVEsQ0FBQ2lCLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBaEI7QUFDQSxXQUFLUyxRQUFMLENBQWNSLEVBQWQsR0FBbUIsY0FBbkI7QUFDQSxXQUFLUSxRQUFMLENBQWNJLEdBQWQsR0FBb0IsR0FBcEI7QUFDQSxXQUFLSixRQUFMLENBQWNELEtBQWQsR0FBc0IsQ0FBdEI7QUFFQUUsTUFBQUEsV0FBVyxDQUFDSixNQUFaLENBQW1CSyxLQUFuQjtBQUNBRCxNQUFBQSxXQUFXLENBQUNKLE1BQVosQ0FBbUIsS0FBS0csUUFBeEI7QUFDQSxXQUFLM0IsYUFBTCxDQUFtQndCLE1BQW5CLENBQTBCSSxXQUExQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi4vQXBwbGljYXRpb25Db250cm9sbGVyL0FwcGxpY2F0aW9uQ29udHJvbGxlcic7XHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblZpZXcge1xyXG5cclxuICAgIHB1YmxpYyBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgbGFiZWxEaXY6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBpbmZvRGl2OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgem9uZURpdjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHByb2dyZXNzOiBIVE1MUHJvZ3Jlc3NFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBjb250cm9sbGVyOiBBcHBsaWNhdGlvbkNvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcjogQXBwbGljYXRpb25Db250cm9sbGVyKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KGNvbnRyb2xsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoY29udHJvbGxlcjogQXBwbGljYXRpb25Db250cm9sbGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluZm8oKTtcclxuICAgICAgICB0aGlzLmRyb3Bab25lKCk7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcigpO1xyXG4gICAgICAgIHRoaXMuc2V0RXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXJnZXQnKS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldikgPT4geyB0aGlzLmNvbnRyb2xsZXIuZHJhZ092ZXJIYW5kbGVyKGV2KSB9KTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZ2V0JykuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChldikgPT4geyB0aGlzLmNvbnRyb2xsZXIuZHJvcEhhbmRsZXIoZXYpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmZyZWVTcGFjZSgpLnRoZW4oc3BhY2UgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluZm9EaXYuaW5uZXJUZXh0ID0gc3BhY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5mbygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmxhYmVsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5sYWJlbERpdi5pZCA9ICdpbmZvTGFiZWwnO1xyXG4gICAgICAgIHRoaXMubGFiZWxEaXYuY2xhc3NMaXN0LmFkZCgnbGFiZWwnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMubGFiZWxEaXYuaW5uZXJUZXh0ID0gJ0F2YWlsYWJsZSBzcGFjZTonO1xyXG5cclxuICAgICAgICB0aGlzLmluZm9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmluZm9EaXYuaWQgPSAnaW5mbyc7XHJcbiAgICAgICAgdGhpcy5pbmZvRGl2LmNsYXNzTmFtZSA9ICdpbmZvJztcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm8oKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbERpdi5hcHBlbmQodGhpcy5pbmZvRGl2KTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMubGFiZWxEaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3Bab25lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuem9uZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuem9uZURpdi5pZCA9ICd0YXJnZXQnO1xyXG4gICAgICAgIHRoaXMuem9uZURpdi5jbGFzc05hbWUgPSAnem9uZSc7XHJcbiAgICAgICAgdGhpcy56b25lRGl2LmlubmVyVGV4dCA9ICdEcm9wIGZpbGUgaGVyZSAhJztcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMuem9uZURpdik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvZ3Jlc3NCYXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9ncmVzc0JhcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0RpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwcm9ncmVzc0Rpdi5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzc1pvbmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSAnZmlsZVByb2dyZXNzcyc7XHJcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gJ1RyYW5mZXJ0IHN0YXR1czonO1xyXG5cclxuICAgICAgICB0aGlzLnByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLmlkID0gJ2ZpbGVQcm9ncmVzcyc7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5tYXggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy52YWx1ZSA9IDA7XHJcblxyXG4gICAgICAgIHByb2dyZXNzRGl2LmFwcGVuZChsYWJlbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NEaXYuYXBwZW5kKHRoaXMucHJvZ3Jlc3MpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmQocHJvZ3Jlc3NEaXYpO1xyXG4gICAgfVxyXG59Il19