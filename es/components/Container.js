var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from '../lib/noop';

var containerStyle = {
    position: 'relative'
};

var tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10
};

var noopHandlers = {
    showTooltip: noop,
    hideTooltip: noop
};

var Container = function (_Component) {
    _inherits(Container, _Component);

    function Container() {
        var _temp, _this, _ret;

        _classCallCheck(this, Container);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            isTooltipVisible: false,
            tooltipContent: null,
            position: {}
        }, _this.showTooltip = function (content, event) {
            var clientX = event.clientX,
                clientY = event.clientY;

            var bounds = _this.container.getBoundingClientRect();

            var x = clientX - bounds.left;
            var y = clientY - bounds.top;

            var position = {};

            if (x < bounds.width / 2) position.left = x + 20;else position.right = bounds.width - x + 20;

            if (y < bounds.height / 2) position.top = y - 12;else position.bottom = bounds.height - y - 12;

            _this.setState({
                isTooltipVisible: true,
                tooltipContent: content,
                position: position
            });
        }, _this.hideTooltip = function () {
            _this.setState({ isTooltipVisible: false, tooltipContent: null });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Container.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            children = _props.children,
            isInteractive = _props.isInteractive,
            theme = _props.theme;
        var _state = this.state,
            isTooltipVisible = _state.isTooltipVisible,
            tooltipContent = _state.tooltipContent,
            position = _state.position;


        if (!isInteractive) return children(noopHandlers);

        return React.createElement(
            'div',
            {
                style: containerStyle,
                ref: function ref(container) {
                    _this2.container = container;
                }
            },
            children({
                showTooltip: this.showTooltip,
                hideTooltip: this.hideTooltip
            }),
            isTooltipVisible && React.createElement(
                'div',
                {
                    style: _extends({}, tooltipStyle, position, theme.tooltip)
                },
                tooltipContent
            )
        );
    };

    return Container;
}(Component);

Container.propTypes = {
    children: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired
};
Container.defaultProps = {
    isInteractive: true
};
export default Container;