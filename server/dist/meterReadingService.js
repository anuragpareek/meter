"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.load = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _path = _interopRequireDefault(require("path"));

var fileName = 'metering_data';
var indexs = {
  meterId: 0,
  wh: 2,
  varh: 3,
  timestamp: 4,
  date: 4
};

var load = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var jsonArray, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _csvtojson["default"])().fromFile("./public/".concat(fileName, ".csv"));

          case 2:
            jsonArray = _context.sent;
            // create a new timestamp from ReadingDateTimeUTC for a effective query
            data = jsonArray.map(function (json) {
              var date = json.ReadingDateTimeUTC.split('/');
              date = "".concat(date[1], "/").concat(date[0], "/").concat(date[2]);
              date = new Date(date);
              return [].concat((0, _toConsumableArray2["default"])(Object.values(json)), [date.getTime()]);
            });

            _fs["default"].writeFileSync("./public/".concat(fileName, ".json"), JSON.stringify(data, null));

            return _context.abrupt("return", 'success');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function load() {
    return _ref.apply(this, arguments);
  };
}();

exports.load = load;

var get = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _ref3,
        meterId,
        startDate,
        endDate,
        _ref3$orderBy,
        orderBy,
        _ref4,
        _ref4$page,
        page,
        _ref4$limit,
        limit,
        rawdata,
        readingData,
        meterFlag,
        startDateFlag,
        endDateFlag,
        orderIndex,
        count,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, meterId = _ref3.meterId, startDate = _ref3.startDate, endDate = _ref3.endDate, _ref3$orderBy = _ref3.orderBy, orderBy = _ref3$orderBy === void 0 ? 'timestamp' : _ref3$orderBy;
            _ref4 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref4$page = _ref4.page, page = _ref4$page === void 0 ? 0 : _ref4$page, _ref4$limit = _ref4.limit, limit = _ref4$limit === void 0 ? 10 : _ref4$limit;
            rawdata = _fs["default"].readFileSync(_path["default"].join(__dirname, "../public/".concat(fileName, ".json")));
            readingData = JSON.parse(rawdata);
            meterFlag = true;
            startDateFlag = true;
            endDateFlag = true;

            if (meterId || startDate || endDate) {
              readingData = readingData.filter(function (reading) {
                if (meterId) {
                  meterFlag = reading[indexs.meterId] === meterId;
                }

                if (startDate) {
                  startDateFlag = reading[indexs.timestamp] >= new Date(startDate).getTime();
                }

                if (endDate) {
                  endDateFlag = reading[indexs.timestamp] <= new Date(endDate).getTime();
                }

                return meterFlag && startDateFlag && endDateFlag;
              });
            } // Sort on basis of passed order by if orderBy is not a valid param then default sort is used


            orderIndex = indexs[orderBy] || indexs.timestamp;
            readingData = readingData.sort(function (a, b) {
              return b[orderIndex] - a[orderIndex];
            }); // Get Count before pagination so that we can get count of complete data after filters

            count = readingData.length;

            if (page && limit) {
              readingData = readingData.splice(--page * limit, limit);
            }

            return _context2.abrupt("return", {
              data: readingData,
              count: count
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get() {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;