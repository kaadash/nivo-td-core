'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defs = require('./defs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgWrapper = function SvgWrapper(_ref) {
    var width = _ref.width,
        height = _ref.height,
        margin = _ref.margin,
        defs = _ref.defs,
        children = _ref.children;
    return _react2.default.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', width: width, height: height },
        _react2.default.createElement(_defs.Defs, { defs: defs }),
        _react2.default.createElement(
            'g',
            { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            children
        )
    );
}; /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */


SvgWrapper.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    margin: _propTypes2.default.shape({
        top: _propTypes2.default.number.isRequired,
        left: _propTypes2.default.number.isRequired
    }).isRequired,
    defs: _propTypes2.default.array
};

exports.default = SvgWrapper;