'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _defaultProps = require('recompose/defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _withPropsOnChange = require('recompose/withPropsOnChange');

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange);

var _setPropTypes = require('recompose/setPropTypes');

var _setPropTypes2 = _interopRequireDefault(_setPropTypes);

var _reactMotion = require('react-motion');

var _props = require('../props');

var _defaults = require('../defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
exports.default = function () {
    return (0, _compose2.default)((0, _setPropTypes2.default)(_props.motionPropTypes), (0, _defaultProps2.default)({
        animate: _defaults.defaultAnimate,
        motionDamping: _defaults.defaultMotionDamping,
        motionStiffness: _defaults.defaultMotionStiffness
    }), (0, _withPropsOnChange2.default)(['motionDamping', 'motionStiffness'], function (_ref) {
        var motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness;
        return {
            boundSpring: (0, _lodash.partialRight)(_reactMotion.spring, {
                damping: motionDamping,
                stiffness: motionStiffness
            })
        };
    }));
};