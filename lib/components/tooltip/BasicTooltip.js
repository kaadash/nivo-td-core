'use strict';

exports.__esModule = true;

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

var _Chip = require('./Chip');

var _Chip2 = _interopRequireDefault(_Chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var chipStyle = {
    marginRight: 7,
    borderRadius: '50%'
};

var BasicTooltip = function BasicTooltip(props) {
    var id = props.id,
        _value = props.value,
        format = props.format,
        enableChip = props.enableChip,
        color = props.color,
        theme = props.theme,
        data = props.data;


    var value = _value;
    if (format !== undefined && value !== undefined) {
        value = format(value, data.keyName.format);
    }

    return _react2.default.createElement(
        'div',
        { style: theme.tooltip.container },
        _react2.default.createElement(
            'div',
            { style: theme.tooltip.basic },
            enableChip && _react2.default.createElement(_Chip2.default, { size: 6, color: color, style: chipStyle }),
            value !== undefined ? _react2.default.createElement(
                'span',
                null,
                data.keyName.name,
                ': ',
                value
            ) : id
        )
    );
};

BasicTooltip.propTypes = {
    id: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    enableChip: _propTypes2.default.bool.isRequired,
    color: _propTypes2.default.string,
    format: _propTypes2.default.func,

    theme: _propTypes2.default.shape({
        tooltip: _propTypes2.default.shape({
            container: _propTypes2.default.object.isRequired,
            basic: _propTypes2.default.object.isRequired
        }).isRequired
    }).isRequired
};

BasicTooltip.defaultProps = {
    enableChip: false
};

var enhance = (0, _compose2.default)((0, _withPropsOnChange2.default)(['format'], function (_ref) {
    var format = _ref.format;

    if (!format || (0, _lodash.isFunction)(format)) return { format: format };
    return { format: (0, _d3Format.format)(format) };
}), _pure2.default);

exports.default = enhance(BasicTooltip);