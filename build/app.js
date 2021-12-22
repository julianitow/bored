"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

var _electron = require("electron");

var path = _interopRequireWildcard(require("path"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var remote = _interopRequireWildcard(require("@electron/remote/main"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Modules to control application life and create native browser window
var mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new _electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  }); // and load the index.html of the app.

  mainWindow.loadFile(path.join(__dirname, './assets/index.html')); // Open the DevTools.

  mainWindow.webContents.openDevTools();
  dotenv.config({
    path: './conf/.env'
  });
  remote.initialize();
  remote.enable(mainWindow.webContents);
} // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


_electron.app.whenReady().then(function () {
  createWindow();

  _electron.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}); // Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.


_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') _electron.app.quit();
}); // In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiXSwibmFtZXMiOlsibWFpbldpbmRvdyIsImNyZWF0ZVdpbmRvdyIsIkJyb3dzZXJXaW5kb3ciLCJ3aWR0aCIsImhlaWdodCIsIndlYlByZWZlcmVuY2VzIiwicHJlbG9hZCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwibm9kZUludGVncmF0aW9uIiwibG9hZEZpbGUiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsImRvdGVudiIsImNvbmZpZyIsInJlbW90ZSIsImluaXRpYWxpemUiLCJlbmFibGUiLCJhcHAiLCJ3aGVuUmVhZHkiLCJ0aGVuIiwib24iLCJnZXRBbGxXaW5kb3dzIiwibGVuZ3RoIiwicHJvY2VzcyIsInBsYXRmb3JtIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFKQTtBQUtBLElBQUlBLFVBQUo7O0FBRUEsU0FBU0MsWUFBVCxHQUErQjtBQUM3QjtBQUNBRCxFQUFBQSxVQUFVLEdBQUcsSUFBSUUsdUJBQUosQ0FBa0I7QUFDN0JDLElBQUFBLEtBQUssRUFBRSxHQURzQjtBQUU3QkMsSUFBQUEsTUFBTSxFQUFFLEdBRnFCO0FBRzdCQyxJQUFBQSxjQUFjLEVBQUU7QUFDZEMsTUFBQUEsT0FBTyxFQUFFQyxJQUFJLENBQUNDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixjQUFyQixDQURLO0FBRWRDLE1BQUFBLGVBQWUsRUFBRTtBQUZIO0FBSGEsR0FBbEIsQ0FBYixDQUY2QixDQVc3Qjs7QUFDQVYsRUFBQUEsVUFBVSxDQUFDVyxRQUFYLENBQW9CSixJQUFJLENBQUNDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixxQkFBckIsQ0FBcEIsRUFaNkIsQ0FjN0I7O0FBQ0FULEVBQUFBLFVBQVUsQ0FBQ1ksV0FBWCxDQUF1QkMsWUFBdkI7QUFFQUMsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRVIsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FBZDtBQUNBUyxFQUFBQSxNQUFNLENBQUNDLFVBQVA7QUFDQUQsRUFBQUEsTUFBTSxDQUFDRSxNQUFQLENBQWNsQixVQUFVLENBQUNZLFdBQXpCO0FBQ0QsQyxDQUVEO0FBQ0E7QUFDQTs7O0FBQ0FPLGNBQUlDLFNBQUosR0FBZ0JDLElBQWhCLENBQXFCLFlBQU07QUFDekJwQixFQUFBQSxZQUFZOztBQUVaa0IsZ0JBQUlHLEVBQUosQ0FBTyxVQUFQLEVBQW1CLFlBQVk7QUFDN0I7QUFDQTtBQUNBLFFBQUlwQix3QkFBY3FCLGFBQWQsR0FBOEJDLE1BQTlCLEtBQXlDLENBQTdDLEVBQWdEdkIsWUFBWTtBQUM3RCxHQUpEO0FBS0QsQ0FSRCxFLENBVUE7QUFDQTtBQUNBOzs7QUFDQWtCLGNBQUlHLEVBQUosQ0FBTyxtQkFBUCxFQUE0QixZQUFZO0FBQ3RDLE1BQUlHLE9BQU8sQ0FBQ0MsUUFBUixLQUFxQixRQUF6QixFQUFtQ1AsY0FBSVEsSUFBSjtBQUNwQyxDQUZELEUsQ0FJQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTW9kdWxlcyB0byBjb250cm9sIGFwcGxpY2F0aW9uIGxpZmUgYW5kIGNyZWF0ZSBuYXRpdmUgYnJvd3NlciB3aW5kb3dcclxuaW1wb3J0IHsgYXBwLCBCcm93c2VyV2luZG93IH0gZnJvbSAnZWxlY3Ryb24nO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0ICogYXMgcmVtb3RlIGZyb20gJ0BlbGVjdHJvbi9yZW1vdGUvbWFpbic7XHJcbmxldCBtYWluV2luZG93OiBCcm93c2VyV2luZG93O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlV2luZG93ICgpOiB2b2lkIHtcclxuICAvLyBDcmVhdGUgdGhlIGJyb3dzZXIgd2luZG93LlxyXG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICB3aWR0aDogODAwLFxyXG4gICAgaGVpZ2h0OiA2MDAsXHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9wcmVsb2FkLmpzJyksXHJcbiAgICAgIG5vZGVJbnRlZ3JhdGlvbjogdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8vIGFuZCBsb2FkIHRoZSBpbmRleC5odG1sIG9mIHRoZSBhcHAuXHJcbiAgbWFpbldpbmRvdy5sb2FkRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9hc3NldHMvaW5kZXguaHRtbCcpKTtcclxuXHJcbiAgLy8gT3BlbiB0aGUgRGV2VG9vbHMuXHJcbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKVxyXG5cclxuICBkb3RlbnYuY29uZmlnKHsgcGF0aDogJy4vY29uZi8uZW52J30pO1xyXG4gIHJlbW90ZS5pbml0aWFsaXplKCk7XHJcbiAgcmVtb3RlLmVuYWJsZShtYWluV2luZG93LndlYkNvbnRlbnRzKTtcclxufVxyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2hlbiBFbGVjdHJvbiBoYXMgZmluaXNoZWRcclxuLy8gaW5pdGlhbGl6YXRpb24gYW5kIGlzIHJlYWR5IHRvIGNyZWF0ZSBicm93c2VyIHdpbmRvd3MuXHJcbi8vIFNvbWUgQVBJcyBjYW4gb25seSBiZSB1c2VkIGFmdGVyIHRoaXMgZXZlbnQgb2NjdXJzLlxyXG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgY3JlYXRlV2luZG93KClcclxuXHJcbiAgYXBwLm9uKCdhY3RpdmF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIE9uIG1hY09TIGl0J3MgY29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlXHJcbiAgICAvLyBkb2NrIGljb24gaXMgY2xpY2tlZCBhbmQgdGhlcmUgYXJlIG5vIG90aGVyIHdpbmRvd3Mgb3Blbi5cclxuICAgIGlmIChCcm93c2VyV2luZG93LmdldEFsbFdpbmRvd3MoKS5sZW5ndGggPT09IDApIGNyZWF0ZVdpbmRvdygpXHJcbiAgfSlcclxufSlcclxuXHJcbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLCBleGNlcHQgb24gbWFjT1MuIFRoZXJlLCBpdCdzIGNvbW1vblxyXG4vLyBmb3IgYXBwbGljYXRpb25zIGFuZCB0aGVpciBtZW51IGJhciB0byBzdGF5IGFjdGl2ZSB1bnRpbCB0aGUgdXNlciBxdWl0c1xyXG4vLyBleHBsaWNpdGx5IHdpdGggQ21kICsgUS5cclxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsIGZ1bmN0aW9uICgpIHtcclxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIGFwcC5xdWl0KClcclxufSlcclxuXHJcbi8vIEluIHRoaXMgZmlsZSB5b3UgY2FuIGluY2x1ZGUgdGhlIHJlc3Qgb2YgeW91ciBhcHAncyBzcGVjaWZpYyBtYWluIHByb2Nlc3NcclxuLy8gY29kZS4gWW91IGNhbiBhbHNvIHB1dCB0aGVtIGluIHNlcGFyYXRlIGZpbGVzIGFuZCByZXF1aXJlIHRoZW0gaGVyZS5cclxuIl19