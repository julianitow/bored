"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFreeSpace = getFreeSpace;
exports.sftp = sftp;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _child_process = require("child_process");

var dotenv = _interopRequireWildcard(require("dotenv"));

var _remote = require("@electron/remote");

var _ssh2SftpClient = _interopRequireDefault(require("ssh2-sftp-client"));

var http = _interopRequireWildcard(require("http"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//module for each service to implement
dotenv.config({
  path: path.join(__dirname, '../conf/.env')
});
var DIR_TYPE = '';
var host = process.env.HOST;
var username = process.env.USER;
var password = process.env.PASSWORD;
var remoteDir = process.env.REMOTE_DIR;
var sshKey = process.env.SSH_KEY; //TODO finish recursive implementation 

/*function readDirectory(path, callback, endCallback) {
    fs.readdir(path, (err, files) => {
        if (err) return endCallback(err);
        files.forEach(file => {
            fs.stat(path.join(path, file), (err, stats) => {
                if(err) endCallback(err);
                if(stats.isDirectory()) {
                    readDirectory(path.join(path, file), callback, () => {
                        pending--;
                        if(pending === 0) {
                            return endCallback(null);
                        }
                    });
                } else {

                }
            });
        });
    });
};*/

/**
 * Send file over sftp
 * @param {*} file File
 */

function sftp(file, type, controller) {
  var srcPath = file.path;
  var config = {
    host: host,
    username: username,
    password: password
  };
  var client = new _ssh2SftpClient.default('sftp-file-transfer');
  client.connect(config).then( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(file);

            if (!(file.type === DIR_TYPE)) {
              _context.next = 5;
              break;
            }

            fs.readdir(file.path, function (err, files) {
              console.log("file", files);
            });
            client.on('upload', function (info) {
              console.log(info);
            }); //let result = await client.uploadDir(srcPath, `${remoteDir}/${type}/${file.name}`);
            //console.log(result);

            return _context.abrupt("return");

          case 5:
            return _context.abrupt("return", client.fastPut(srcPath, "".concat(remoteDir, "/").concat(type, "/").concat(file.name), {
              step: function step(_step) {
                var percent = Math.floor(_step / file.size * 100);
                controller.updateProgressView(percent);
              }
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))).then(function () {
    controller.updateProgressView(0);

    _remote.dialog.showMessageBoxSync(null, {
      type: 'info',
      message: 'Finished !'
    });

    return client.end();
  }).catch(function (err) {
    console.error(err);
  });
}
/**
 * get available space
 * @resolve String
 */


function getFreeSpace() {
  return new Promise(function (resolve, reject) {
    console.log('SSHKEY', sshKey);

    if (sshKey !== '') {
      var cmd = "ssh -i ".concat(sshKey, " ").concat(username, "@").concat(host, " \"df -h | grep sdb | awk '{print $4}'\"");
      (0, _child_process.exec)(cmd, function (err, stdout, stderr) {
        if (err) {
          reject(err);
          return;
        }

        if (stderr) {
          reject(stderr);
          return;
        }

        console.log('stdout', stdout);
        resolve(stdout);
      });
    } else {
      var options = {
        hostname: host,
        port: 3000,
        path: '/space',
        method: 'GET'
      };
      var req = http.request(options, function (res) {
        res.on('data', function (data) {
          resolve(data.toString());
        });
      });
      req.on('error', function (err) {
        reject(err);
      });
      req.end();
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXJ2aWNlcy9TZXJ2aWNlcy50cyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsIkRJUl9UWVBFIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJIT1NUIiwidXNlcm5hbWUiLCJVU0VSIiwicGFzc3dvcmQiLCJQQVNTV09SRCIsInJlbW90ZURpciIsIlJFTU9URV9ESVIiLCJzc2hLZXkiLCJTU0hfS0VZIiwic2Z0cCIsImZpbGUiLCJ0eXBlIiwiY29udHJvbGxlciIsInNyY1BhdGgiLCJjbGllbnQiLCJDbGllbnQiLCJjb25uZWN0IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJmcyIsInJlYWRkaXIiLCJlcnIiLCJmaWxlcyIsIm9uIiwiaW5mbyIsImZhc3RQdXQiLCJuYW1lIiwic3RlcCIsInBlcmNlbnQiLCJNYXRoIiwiZmxvb3IiLCJzaXplIiwidXBkYXRlUHJvZ3Jlc3NWaWV3IiwiZGlhbG9nIiwic2hvd01lc3NhZ2VCb3hTeW5jIiwibWVzc2FnZSIsImVuZCIsImNhdGNoIiwiZXJyb3IiLCJnZXRGcmVlU3BhY2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNtZCIsInN0ZG91dCIsInN0ZGVyciIsIm9wdGlvbnMiLCJob3N0bmFtZSIsInBvcnQiLCJtZXRob2QiLCJyZXEiLCJodHRwIiwicmVxdWVzdCIsInJlcyIsImRhdGEiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFSQTtBQVVBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyxFQUFBQSxJQUFJLEVBQUVBLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLGNBQXJCO0FBQVAsQ0FBZDtBQUVBLElBQU1DLFFBQVEsR0FBRyxFQUFqQjtBQUVBLElBQU1DLElBQVksR0FBR0MsT0FBTyxDQUFD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RUFBSTtBQUNuQnFCLFFBQUFBLE1BQU0sQ0FBQ3JCLEdBQUQsQ0FBTjtBQUNILE9BRkQ7QUFHQTZCLE1BQUFBLEdBQUcsQ0FBQ2QsR0FBSjtBQUNIO0FBRUosR0FuQ00sQ0FBUDtBQW9DSCIsInNvdXJjZXNDb250ZW50IjpbIi8vbW9kdWxlIGZvciBlYWNoIHNlcnZpY2UgdG8gaW1wbGVtZW50XHJcblxyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICdAZWxlY3Ryb24vcmVtb3RlJztcclxuaW1wb3J0IENsaWVudCBmcm9tICdzc2gyLXNmdHAtY2xpZW50JzsgXHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25Db250cm9sbGVyIH0gZnJvbSAnLi4vQXBwbGljYXRpb25Db250cm9sbGVyL0FwcGxpY2F0aW9uQ29udHJvbGxlcic7XHJcbmRvdGVudi5jb25maWcoe3BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9jb25mLy5lbnYnKX0pO1xyXG5cclxuY29uc3QgRElSX1RZUEUgPSAnJztcclxuXHJcbmNvbnN0IGhvc3Q6IHN0cmluZyA9IHByb2Nlc3MuZW52LkhPU1Q7XHJcbmNvbnN0IHVzZXJuYW1lOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5VU0VSO1xyXG5jb25zdCBwYXNzd29yZDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuUEFTU1dPUkQ7XHJcbmNvbnN0IHJlbW90ZURpcjogc3RyaW5nID0gcHJvY2Vzcy5lbnYuUkVNT1RFX0RJUjtcclxuY29uc3Qgc3NoS2V5OiBzdHJpbmcgPSBwcm9jZXNzLmVudi5TU0hfS0VZO1xyXG5cclxuLy9UT0RPIGZpbmlzaCByZWN1cnNpdmUgaW1wbGVtZW50YXRpb24gXHJcbi8qZnVuY3Rpb24gcmVhZERpcmVjdG9yeShwYXRoLCBjYWxsYmFjaywgZW5kQ2FsbGJhY2spIHtcclxuICAgIGZzLnJlYWRkaXIocGF0aCwgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZW5kQ2FsbGJhY2soZXJyKTtcclxuICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICBmcy5zdGF0KHBhdGguam9pbihwYXRoLCBmaWxlKSwgKGVyciwgc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycikgZW5kQ2FsbGJhY2soZXJyKTtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkRGlyZWN0b3J5KHBhdGguam9pbihwYXRoLCBmaWxlKSwgY2FsbGJhY2ssICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwZW5kaW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kQ2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59OyovXHJcblxyXG4vKipcclxuICogU2VuZCBmaWxlIG92ZXIgc2Z0cFxyXG4gKiBAcGFyYW0geyp9IGZpbGUgRmlsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNmdHAoZmlsZTogRmlsZSwgdHlwZTogc3RyaW5nLCBjb250cm9sbGVyOiBBcHBsaWNhdGlvbkNvbnRyb2xsZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNyY1BhdGg6IHN0cmluZyA9IGZpbGUucGF0aDtcclxuICAgIGNvbnN0IGNvbmZpZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XHJcbiAgICAgICAgaG9zdCxcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICBwYXNzd29yZFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNsaWVudDogQ2xpZW50ID0gbmV3IENsaWVudCgnc2Z0cC1maWxlLXRyYW5zZmVyJyk7XHJcbiAgICBjbGllbnQuY29ubmVjdChjb25maWcpLnRoZW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgIGlmIChmaWxlLnR5cGUgPT09IERJUl9UWVBFKSB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXIoZmlsZS5wYXRoLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWxlXCIsIGZpbGVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsaWVudC5vbigndXBsb2FkJywgaW5mbyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vbGV0IHJlc3VsdCA9IGF3YWl0IGNsaWVudC51cGxvYWREaXIoc3JjUGF0aCwgYCR7cmVtb3RlRGlyfS8ke3R5cGV9LyR7ZmlsZS5uYW1lfWApO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsaWVudC5mYXN0UHV0KHNyY1BhdGgsIGAke3JlbW90ZURpcn0vJHt0eXBlfS8ke2ZpbGUubmFtZX1gLCB7XHJcbiAgICAgICAgICAgIHN0ZXA6IHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudDogbnVtYmVyID0gTWF0aC5mbG9vcigoc3RlcCAvIGZpbGUuc2l6ZSkgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlci51cGRhdGVQcm9ncmVzc1ZpZXcocGVyY2VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnRyb2xsZXIudXBkYXRlUHJvZ3Jlc3NWaWV3KDApO1xyXG4gICAgICAgIGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMobnVsbCwge1xyXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdGaW5pc2hlZCAhJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjbGllbnQuZW5kKCk7XHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBhdmFpbGFibGUgc3BhY2VcclxuICogQHJlc29sdmUgU3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJlZVNwYWNlKCk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTU0hLRVknLCBzc2hLZXkpXHJcbiAgICAgICAgaWYoc3NoS2V5ICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBjbWQgPSBgc3NoIC1pICR7c3NoS2V5fSAke3VzZXJuYW1lfUAke2hvc3R9IFwiZGYgLWggfCBncmVwIHNkYiB8IGF3ayAne3ByaW50ICQ0fSdcImBcclxuICAgICAgICAgICAgZXhlYyhjbWQsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGRlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdGRvdXQnLCBzdGRvdXQpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdGRvdXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaG9zdG5hbWU6IGhvc3QsXHJcbiAgICAgICAgICAgICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgcGF0aDogJy9zcGFjZScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IGh0dHAucmVxdWVzdChvcHRpb25zLCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzLm9uKCdkYXRhJywgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJlcS5vbignZXJyb3InLCBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXEuZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSk7XHJcbn0iXX0=