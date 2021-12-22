"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Service = _interopRequireWildcard(require("../Services"));

var _remote = require("@electron/remote");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SERIE_TYPE = 'TV-Shows';
var FILM_TYPE = 'Movies';

var ApplicationController = /*#__PURE__*/function () {
  function ApplicationController(application) {
    (0, _classCallCheck2.default)(this, ApplicationController);
    (0, _defineProperty2.default)(this, "application", void 0);
    this.application = application;
    this.init();
  }

  (0, _createClass2.default)(ApplicationController, [{
    key: "init",
    value: function init() {
      var _this = this;

      setInterval(function () {
        _this.updateFreeSpaceView();
      }, 10000);
    }
  }, {
    key: "freeSpace",
    value: function () {
      var _freeSpace = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var space;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Service.getFreeSpace();

              case 3:
                space = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 9:
                return _context.abrupt("return", space);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function freeSpace() {
        return _freeSpace.apply(this, arguments);
      }

      return freeSpace;
    }()
  }, {
    key: "dragOverHandler",
    value: function dragOverHandler(ev) {
      ev.preventDefault();
    }
  }, {
    key: "updateFreeSpaceView",
    value: function updateFreeSpaceView() {
      this.application.appView.updateInfo();
    }
  }, {
    key: "updateProgressView",
    value: function updateProgressView(value) {
      this.application.appView.setProgressBar(value);
    }
  }, {
    key: "disableZone",
    value: function disableZone() {//TODO
    }
  }, {
    key: "dropHandler",
    value: function dropHandler(ev) {
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        var file = ev.dataTransfer.items[0].getAsFile();
        var options = {
          type: 'question',
          buttons: ['Cancel', 'Serie', 'Film'],
          title: 'C\'est quoi ?',
          message: "".concat(file.name, " ?")
        };

        var res = _remote.dialog.showMessageBoxSync(null, options);

        switch (res) {
          case 1:
            this.upload(file, SERIE_TYPE);
            break;

          case 2:
            this.upload(file, FILM_TYPE);
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "upload",
    value: function upload(file, type) {
      var _this2 = this;

      //TODO Directory implementation
      console.log(file);
      /*if (file.type === DIR_TYPE) {
          dialog.showMessageBoxSync(null, {
              type: 'warning',
              message: 'Les dossiers ne sont pas encore pris en charge, uniquement les fichiers'
          });
          return;
      }*/

      var fileSize = file.size / 1000000000; //conversion en go

      this.freeSpace().then(function (space) {
        var spaceFreeStr = space.split('G')[0];
        var spaceFree = Number(spaceFreeStr.replace(',', '.'));

        if (fileSize >= spaceFree) {
          _remote.dialog.showMessageBoxSync(null, {
            type: 'warning',
            message: 'Not enough space available.'
          });

          return;
        }

        Service.sftp(file, type, _this2);
      });
    }
  }]);
  return ApplicationController;
}();

exports.ApplicationController = ApplicationController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbkNvbnRyb2xsZXIvQXBwbGljYXRpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIlNFUklFX1RZUEUiLCJGSUxNX1RZUEUiLCJBcHBsaWNhdGlvbkNvbnRyb2xsZXIiLCJhcHBsaWNhdGlvbiIsImluaXQiLCJzZXRJbnRlcnZhbCIsInVwZGF0ZUZyZWVTcGFjZVZpZXciLCJTZXJ2aWNlIiwiZ2V0RnJlZVNwYWNlIiwic3BhY2UiLCJjb25zb2xlIiwiZXJyb3IiLCJldiIsInByZXZlbnREZWZhdWx0IiwiYXBwVmlldyIsInVwZGF0ZUluZm8iLCJ2YWx1ZSIsInNldFByb2dyZXNzQmFyIiwiZGF0YVRyYW5zZmVyIiwiaXRlbXMiLCJmaWxlIiwiZ2V0QXNGaWxlIiwib3B0aW9ucyIsInR5cGUiLCJidXR0b25zIiwidGl0bGUiLCJtZXNzYWdlIiwibmFtZSIsInJlcyIsImRpYWxvZyIsInNob3dNZXNzYWdlQm94U3luYyIsInVwbG9hZCIsImxvZyIsImZpbGVTaXplIiwic2l6ZSIsImZyZWVTcGFjZSIsInRoZW4iLCJzcGFjZUZyZWVTdHIiLCJzcGxpdCIsInNwYWNlRnJlZSIsIk51bWJlciIsInJlcGxhY2UiLCJzZnRwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBR0EsSUFBTUEsVUFBVSxHQUFHLFVBQW5CO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFFBQWxCOztJQUVhQyxxQjtBQUlULGlDQUFZQyxXQUFaLEVBQThCO0FBQUE7QUFBQTtBQUMxQixTQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLElBQUw7QUFDSDs7OztXQUVELGdCQUFhO0FBQUE7O0FBQ1RDLE1BQUFBLFdBQVcsQ0FBQyxZQUFNO0FBQ2QsUUFBQSxLQUFJLENBQUNDLG1CQUFMO0FBQ0gsT0FGVSxFQUVSLEtBRlEsQ0FBWDtBQUdIOzs7OytGQUVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHc0JDLE9BQU8sQ0FBQ0MsWUFBUixFQUh0Qjs7QUFBQTtBQUdRQyxnQkFBQUEsS0FIUjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBS1FDLGdCQUFBQSxPQUFPLENBQUNDLEtBQVI7O0FBTFI7QUFBQSxpREFPV0YsS0FQWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBVUEseUJBQWdCRyxFQUFoQixFQUEwQjtBQUN0QkEsTUFBQUEsRUFBRSxDQUFDQyxjQUFIO0FBQ0g7OztXQUVELCtCQUE0QjtBQUN4QixXQUFLVixXQUFMLENBQWlCVyxPQUFqQixDQUF5QkMsVUFBekI7QUFDSDs7O1dBRUQsNEJBQW1CQyxLQUFuQixFQUFnQztBQUM1QixXQUFLYixXQUFMLENBQWlCVyxPQUFqQixDQUF5QkcsY0FBekIsQ0FBd0NELEtBQXhDO0FBQ0g7OztXQUVELHVCQUFvQixDQUNoQjtBQUNIOzs7V0FFRCxxQkFBWUosRUFBWixFQUFzQjtBQUNsQkEsTUFBQUEsRUFBRSxDQUFDQyxjQUFIOztBQUNBLFVBQUlELEVBQUUsQ0FBQ00sWUFBSCxDQUFnQkMsS0FBcEIsRUFBMkI7QUFDdkIsWUFBTUMsSUFBVSxHQUFHUixFQUFFLENBQUNNLFlBQUgsQ0FBZ0JDLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCRSxTQUF6QixFQUFuQjtBQUNBLFlBQU1DLE9BQW1DLEdBQUk7QUFDM0NDLFVBQUFBLElBQUksRUFBRSxVQURxQztBQUUzQ0MsVUFBQUEsT0FBTyxFQUFFLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsTUFBcEIsQ0FGa0M7QUFHM0NDLFVBQUFBLEtBQUssRUFBRSxlQUhvQztBQUkzQ0MsVUFBQUEsT0FBTyxZQUFLTixJQUFJLENBQUNPLElBQVY7QUFKb0MsU0FBN0M7O0FBT0EsWUFBTUMsR0FBVyxHQUFHQyxlQUFPQyxrQkFBUCxDQUEwQixJQUExQixFQUFnQ1IsT0FBaEMsQ0FBcEI7O0FBQ0EsZ0JBQU9NLEdBQVA7QUFDSSxlQUFLLENBQUw7QUFDSSxpQkFBS0csTUFBTCxDQUFZWCxJQUFaLEVBQWtCcEIsVUFBbEI7QUFDQTs7QUFDSixlQUFLLENBQUw7QUFDSSxpQkFBSytCLE1BQUwsQ0FBWVgsSUFBWixFQUFrQm5CLFNBQWxCO0FBQ0E7O0FBQ0o7QUFDSTtBQVJSO0FBVUg7QUFDSjs7O1dBRUQsZ0JBQU9tQixJQUFQLEVBQWFHLElBQWIsRUFBeUI7QUFBQTs7QUFDckI7QUFDQWIsTUFBQUEsT0FBTyxDQUFDc0IsR0FBUixDQUFZWixJQUFaO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ1EsVUFBTWEsUUFBZ0IsR0FBR2IsSUFBSSxDQUFDYyxJQUFMLEdBQVksVUFBckMsQ0FWcUIsQ0FVNEI7O0FBQ2pELFdBQUtDLFNBQUwsR0FBaUJDLElBQWpCLENBQXNCLFVBQUEzQixLQUFLLEVBQUk7QUFDM0IsWUFBTTRCLFlBQW9CLEdBQUc1QixLQUFLLENBQUM2QixLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUE3QjtBQUNBLFlBQU1DLFNBQVMsR0FBR0MsTUFBTSxDQUFDSCxZQUFZLENBQUNJLE9BQWIsQ0FBcUIsR0FBckIsRUFBMEIsR0FBMUIsQ0FBRCxDQUF4Qjs7QUFFQSxZQUFJUixRQUFRLElBQUlNLFNBQWhCLEVBQTJCO0FBQ3ZCVix5QkFBT0Msa0JBQVAsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFDNUJQLFlBQUFBLElBQUksRUFBRSxTQURzQjtBQUU1QkcsWUFBQUEsT0FBTyxFQUFFO0FBRm1CLFdBQWhDOztBQUlBO0FBQ0g7O0FBQ0RuQixRQUFBQSxPQUFPLENBQUNtQyxJQUFSLENBQWF0QixJQUFiLEVBQW1CRyxJQUFuQixFQUF5QixNQUF6QjtBQUNILE9BWkQ7QUFhSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlcnZpY2UgZnJvbSAnLi4vU2VydmljZXMnO1xyXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICdAZWxlY3Ryb24vcmVtb3RlJztcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi4vQXBwbGljYXRpb24vQXBwbGljYXRpb24nO1xyXG5cclxuY29uc3QgU0VSSUVfVFlQRSA9ICdUVi1TaG93cyc7XHJcbmNvbnN0IEZJTE1fVFlQRSA9ICdNb3ZpZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uQ29udHJvbGxlciB7XHJcblxyXG4gICAgcHVibGljIGFwcGxpY2F0aW9uOiBBcHA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGFwcGxpY2F0aW9uOiBBcHApIHtcclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJlZVNwYWNlVmlldygpO1xyXG4gICAgICAgIH0sIDEwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmcmVlU3BhY2UoKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgc3BhY2U6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzcGFjZSA9IGF3YWl0IFNlcnZpY2UuZ2V0RnJlZVNwYWNlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwYWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdPdmVySGFuZGxlcihldik6IHZvaWQge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRnJlZVNwYWNlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmFwcFZpZXcudXBkYXRlSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVByb2dyZXNzVmlldyh2YWx1ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24uYXBwVmlldy5zZXRQcm9ncmVzc0Jhcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZVpvbmUoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgZHJvcEhhbmRsZXIoZXYpOiB2b2lkIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChldi5kYXRhVHJhbnNmZXIuaXRlbXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZTogRmlsZSA9IGV2LmRhdGFUcmFuc2Zlci5pdGVtc1swXS5nZXRBc0ZpbGUoKTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogRWxlY3Ryb24uTWVzc2FnZUJveE9wdGlvbnMgID0ge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICAgICAgYnV0dG9uczogWydDYW5jZWwnLCAnU2VyaWUnLCAnRmlsbSddLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ1xcJ2VzdCBxdW9pID8nLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGAke2ZpbGUubmFtZX0gP2AsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlczogbnVtYmVyID0gZGlhbG9nLnNob3dNZXNzYWdlQm94U3luYyhudWxsLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgc3dpdGNoKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKGZpbGUsIFNFUklFX1RZUEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKGZpbGUsIEZJTE1fVFlQRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZChmaWxlLCB0eXBlKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIERpcmVjdG9yeSBpbXBsZW1lbnRhdGlvblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgIC8qaWYgKGZpbGUudHlwZSA9PT0gRElSX1RZUEUpIHtcclxuICAgICAgICAgICAgZGlhbG9nLnNob3dNZXNzYWdlQm94U3luYyhudWxsLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnTGVzIGRvc3NpZXJzIG5lIHNvbnQgcGFzIGVuY29yZSBwcmlzIGVuIGNoYXJnZSwgdW5pcXVlbWVudCBsZXMgZmljaGllcnMnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgY29uc3QgZmlsZVNpemU6IG51bWJlciA9IGZpbGUuc2l6ZSAvIDEwMDAwMDAwMDA7IC8vY29udmVyc2lvbiBlbiBnb1xyXG4gICAgICAgIHRoaXMuZnJlZVNwYWNlKCkudGhlbihzcGFjZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlRnJlZVN0cjogc3RyaW5nID0gc3BhY2Uuc3BsaXQoJ0cnKVswXTtcclxuICAgICAgICAgICAgY29uc3Qgc3BhY2VGcmVlID0gTnVtYmVyKHNwYWNlRnJlZVN0ci5yZXBsYWNlKCcsJywgJy4nKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZmlsZVNpemUgPj0gc3BhY2VGcmVlKSB7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01lc3NhZ2VCb3hTeW5jKG51bGwsIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ05vdCBlbm91Z2ggc3BhY2UgYXZhaWxhYmxlLidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFNlcnZpY2Uuc2Z0cChmaWxlLCB0eXBlLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==