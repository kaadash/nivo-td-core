var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash-es';
import { format as d3Format } from 'd3-format';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { TransitionMotion, spring } from 'react-motion';
import { withMotion } from '../../hocs';
import { computeAxisTicks } from '../../lib/axes';
import AxisTick from './AxisTick';

var axisPositions = ['top', 'right', 'bottom', 'left'];
var legendPositions = ['start', 'center', 'end'];

export var axisPropType = PropTypes.shape({
    orient: PropTypes.oneOf(axisPositions),

    // ticks
    tickValues: PropTypes.array,
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // legend
    legend: PropTypes.string,
    legendPosition: PropTypes.oneOf(legendPositions),
    legendOffset: PropTypes.number
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
            opacity: spring(0, springConfig),
            x: spring(x.val, springConfig),
            y: spring(y.val, springConfig)
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

    var _computeAxisTicks = computeAxisTicks({
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

        legend = React.createElement(
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
        tickElements = React.createElement(
            'g',
            null,
            ticks.map(function (tick, index) {
                return React.createElement(AxisTick, _extends({
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

        tickElements = React.createElement(
            TransitionMotion,
            {
                willEnter: willEnter,
                willLeave: willLeave(springConfig),
                styles: ticks.map(function (tick) {
                    return {
                        key: '' + tick.key,
                        data: tick,
                        style: {
                            opacity: spring(1, springConfig),
                            x: spring(tick.x, springConfig),
                            y: spring(tick.y, springConfig)
                        }
                    };
                })
            },
            function (interpolatedStyles) {
                return React.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function (_ref3) {
                        var key = _ref3.key,
                            style = _ref3.style,
                            tick = _ref3.data;
                        return React.createElement(AxisTick, _extends({
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

    return React.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        legend,
        tickElements,
        _position === 'left' ? React.createElement('line', { x1: '0', x2: '0', y1: '0', y2: height }) : ''
    );
};

Axis.propTypes = {
    // generic
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    position: PropTypes.oneOf(axisPositions).isRequired,
    scale: PropTypes.func.isRequired,

    // ticks
    tickValues: PropTypes.array,
    tickCount: PropTypes.number,
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    tickRotation: PropTypes.number.isRequired,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // legend
    legend: PropTypes.string,
    legendPosition: PropTypes.oneOf(legendPositions).isRequired,
    legendOffset: PropTypes.number.isRequired,

    // theming
    theme: PropTypes.object.isRequired,

    // interactivity
    onClick: PropTypes.func
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

var enhance = compose(withMotion(), withPropsOnChange(['format'], function (_ref4) {
    var format = _ref4.format;

    if (!format || isFunction(format)) return { format: format };
    return { format: d3Format(format) };
}), pure);

export default enhance(Axis);