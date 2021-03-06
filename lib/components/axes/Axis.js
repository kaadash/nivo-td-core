'use strict';

exports.__esModule = true;
exports.axisPropType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _d3Format = require('d3-format');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withPropsOnChange = require('recompose/withPropsOnChange');

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _reactMotion = require('react-motion');

var _hocs = require('../../hocs');

var _axes = require('../../lib/axes');

var _AxisTick = require('./AxisTick');

var _AxisTick2 = _interopRequireDefault(_AxisTick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axisPositions = ['top', 'right', 'bottom', 'left'];
var legendPositions = ['start', 'center', 'end'];

var axisPropType = exports.axisPropType = _propTypes2.default.shape({
    orient: _propTypes2.default.oneOf(axisPositions),

    // ticks
    tickValues: _propTypes2.default.array,
    tickSize: _propTypes2.default.number,
    tickPadding: _propTypes2.default.number,
    tickRotation: _propTypes2.default.number,
    format: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

    // legend
    legend: _propTypes2.default.string,
    legendPosition: _propTypes2.default.oneOf(legendPositions),
    legendOffset: _propTypes2.default.number
});

var willEnter = function willEnter() {
    return {
        opacity: 0,
        x: 0,
        y: 0
    };
};

var willLeave = function willLeave(springConfig) {
    return function (_ref) {
        var _ref$style = _ref.style,
            x = _ref$style.x,
            y = _ref$style.y;
        return {
            opacity: (0, _reactMotion.spring)(0, springConfig),
            x: (0, _reactMotion.spring)(x.val, springConfig),
            y: (0, _reactMotion.spring)(y.val, springConfig)
        };
    };
};

var Axis = function Axis(_ref2) {
    var scale = _ref2.scale,
        width = _ref2.width,
        height = _ref2.height,
        _position = _ref2.position,
        tickValues = _ref2.tickValues,
        tickCount = _ref2.tickCount,
        tickSize = _ref2.tickSize,
        tickPadding = _ref2.tickPadding,
        tickRotation = _ref2.tickRotation,
        format = _ref2.format,
        axisFormat = _ref2.axisFormat,
        _legend = _ref2.legend,
        legendPosition = _ref2.legendPosition,
        legendOffset = _ref2.legendOffset,
        theme = _ref2.theme,
        animate = _ref2.animate,
        motionStiffness = _ref2.motionStiffness,
        motionDamping = _ref2.motionDamping,
        onClick = _ref2.onClick;

    var _computeAxisTicks = (0, _axes.computeAxisTicks)({
        width: width,
        height: height,
        scale: scale,
        position: _position,
        tickValues: tickValues,
        tickCount: tickCount,
        tickSize: tickSize,
        tickPadding: tickPadding,
        tickRotation: tickRotation
    }),
        x = _computeAxisTicks.x,
        y = _computeAxisTicks.y,
        ticks = _computeAxisTicks.ticks,
        textAlign = _computeAxisTicks.textAlign,
        textBaseline = _computeAxisTicks.textBaseline;

    var legend = null;
    if (_legend !== undefined) {
        var legendX = 0;
        var legendY = 0;
        var legendRotation = 0;
        var textAnchor = void 0;

        if (['left', 'right'].includes(_position)) {
            legendRotation = -90;
            legendX = legendOffset;
            if (legendPosition === 'start') {
                textAnchor = 'start';
                legendY = height;
            } else if (legendPosition === 'center') {
                textAnchor = 'middle';
                legendY = height / 2;
            } else if (legendPosition === 'end') {
                textAnchor = 'end';
            }
        } else {
            legendY = legendOffset;
            if (legendPosition === 'start') {
                textAnchor = 'start';
            } else if (legendPosition === 'center') {
                textAnchor = 'middle';
                legendX = width / 2;
            } else if (legendPosition === 'end') {
                textAnchor = 'end';
                legendX = width;
            }
        }

        legend = _react2.default.createElement(
            'text',
            {
                fill: theme.axis.legendColor,
                transform: 'translate(' + legendX + ', ' + legendY + ') rotate(' + legendRotation + ')',
                textAnchor: textAnchor,
                style: { fontSize: theme.axis.legendFontSize }
            },
            _legend
        );
    }

    var tickElements = void 0;
    if (!animate) {
        tickElements = _react2.default.createElement(
            'g',
            null,
            ticks.map(function (tick, index) {
                return _react2.default.createElement(_AxisTick2.default, _extends({
                    key: tick.key,
                    value: tick.key,
                    format: format,
                    axisFormat: axisFormat,
                    lineX: tick.key === 0 && _position === 'left' ? width : tick.lineX,
                    lineY: tick.lineY,
                    rotate: tickRotation,
                    textX: tick.textX,
                    textY: tick.textY,
                    textBaseline: textBaseline,
                    textAnchor: textAlign,
                    theme: theme,
                    x: tick.x,
                    y: tick.y
                }, onClick ? { onClick: onClick } : {}));
            })
        );
    } else {
        var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
        };

        tickElements = _react2.default.createElement(
            _reactMotion.TransitionMotion,
            {
                willEnter: willEnter,
                willLeave: willLeave(springConfig),
                styles: ticks.map(function (tick) {
                    return {
                        key: '' + tick.key,
                        data: tick,
                        style: {
                            opacity: (0, _reactMotion.spring)(1, springConfig),
                            x: (0, _reactMotion.spring)(tick.x, springConfig),
                            y: (0, _reactMotion.spring)(tick.y, springConfig)
                        }
                    };
                })
            },
            function (interpolatedStyles) {
                return _react2.default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function (_ref3) {
                        var key = _ref3.key,
                            style = _ref3.style,
                            tick = _ref3.data;
                        return _react2.default.createElement(_AxisTick2.default, _extends({
                            key: key,
                            value: key,
                            format: format,
                            lineX: tick.lineX,
                            lineY: tick.lineY,
                            rotate: tickRotation,
                            textX: tick.textX,
                            textY: tick.textY,
                            axisFormat: axisFormat,
                            textBaseline: textBaseline,
                            textAnchor: textAlign,
                            theme: theme
                        }, onClick ? { onClick: onClick } : {}, style));
                    })
                );
            }
        );
    }

    return _react2.default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        legend,
        tickElements,
        _position === 'left' ? _react2.default.createElement('line', { x1: '0', x2: '0', y1: '0', y2: height }) : ''
    );
};

Axis.propTypes = {
    // generic
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    position: _propTypes2.default.oneOf(axisPositions).isRequired,
    scale: _propTypes2.default.func.isRequired,

    // ticks
    tickValues: _propTypes2.default.array,
    tickCount: _propTypes2.default.number,
    tickSize: _propTypes2.default.number.isRequired,
    tickPadding: _propTypes2.default.number.isRequired,
    tickRotation: _propTypes2.default.number.isRequired,
    format: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

    // legend
    legend: _propTypes2.default.string,
    legendPosition: _propTypes2.default.oneOf(legendPositions).isRequired,
    legendOffset: _propTypes2.default.number.isRequired,

    // theming
    theme: _propTypes2.default.object.isRequired,

    // interactivity
    onClick: _propTypes2.default.func
};

Axis.defaultProps = {
    // ticks
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,

    // legend
    legendPosition: 'end',
    legendOffset: 0
};

var enhance = (0, _compose2.default)((0, _hocs.withMotion)(), (0, _withPropsOnChange2.default)(['format'], function (_ref4) {
    var format = _ref4.format;

    if (!format || (0, _lodash.isFunction)(format)) return { format: format };
    return { format: (0, _d3Format.format)(format) };
}), _pure2.default);

exports.default = enhance(Axis);