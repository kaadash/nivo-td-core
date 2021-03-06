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
import Chip from './Chip';

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

    return React.createElement(
        'div',
        { style: theme.tooltip.container },
        React.createElement(
            'div',
            { style: theme.tooltip.basic },
            enableChip && React.createElement(Chip, { size: 6, color: color, style: chipStyle }),
            value !== undefined ? React.createElement(
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
    id: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool.isRequired,
    color: PropTypes.string,
    format: PropTypes.func,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({
            container: PropTypes.object.isRequired,
            basic: PropTypes.object.isRequired
        }).isRequired
    }).isRequired
};

BasicTooltip.defaultProps = {
    enableChip: false
};

var enhance = compose(withPropsOnChange(['format'], function (_ref) {
    var format = _ref.format;

    if (!format || isFunction(format)) return { format: format };
    return { format: d3Format(format) };
}), pure);

export default enhance(BasicTooltip);