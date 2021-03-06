'use strict';

exports.__esModule = true;
exports.motionPropTypes = exports.marginPropType = exports.scalePropType = undefined;

var _colors = require('./colors');

Object.keys(_colors).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _colors[key];
        }
    });
});

var _curve = require('./curve');

Object.keys(_curve).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _curve[key];
        }
    });
});

var _defs = require('./defs');

Object.keys(_defs).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _defs[key];
        }
    });
});

var _stack = require('./stack');

Object.keys(_stack).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _stack[key];
        }
    });
});

var _treeMap = require('./treeMap');

Object.keys(_treeMap).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _treeMap[key];
        }
    });
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scalePropType = exports.scalePropType = _propTypes2.default.shape({
    type: _propTypes2.default.string.isRequired,
    domain: _propTypes2.default.array.isRequired,
    range: _propTypes2.default.array.isRequired
}); /*
     * This file is part of the nivo project.
     *
     * Copyright 2016-present, Raphaël Benitte.
     *
     * For the full copyright and license information, please view the LICENSE
     * file that was distributed with this source code.
     */
var marginPropType = exports.marginPropType = _propTypes2.default.shape({
    top: _propTypes2.default.number,
    right: _propTypes2.default.number,
    bottom: _propTypes2.default.number,
    left: _propTypes2.default.number
}).isRequired;

var motionPropTypes = exports.motionPropTypes = {
    animate: _propTypes2.default.bool.isRequired,
    motionStiffness: _propTypes2.default.number.isRequired,
    motionDamping: _propTypes2.default.number.isRequired
};