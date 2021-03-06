var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isFunction, isPlainObject, pick, isEqual, get, set } from 'lodash-es';
import { gradientTypes, patternTypes } from '../components/defs';

var gradientKeys = Object.keys(gradientTypes);
var patternKeys = Object.keys(patternTypes);

/**
 * Check a node matches given def predicate.
 *
 * @param {string|Function|Object} predicate
 * @param {Object}                 node
 * @param {string}                 [dataKey] - Optional path to access node data
 * @returns {boolean}
 */
export var isMatchingDef = function isMatchingDef(predicate, node, dataKey) {
    if (predicate === '*') {
        return true;
    } else if (isFunction(predicate)) {
        return predicate(node);
    } else if (isPlainObject(predicate)) {
        var data = dataKey ? get(node, dataKey) : node;
        return isEqual(pick(data, Object.keys(predicate)), predicate);
    }

    return false;
};

/**
 * Compute SVG defs.
 *
 * @param {Array.<Object>} defs               - Base SVG defs configs
 * @param {Array.<Object>} nodes              - Data nodes to apply defs on
 * @param {Array.<Object>} rules              - Rules used to conditionally apply defs on data nodes
 * @param {string}         [dataKey]          - Path to node data, used for rule object query based predicate
 * @param {string}         [colorKey='color'] - Node color path, required when inheritance is involved
 * @param {string}         [targetKey='fill'] - Node target property to apply def ID on
 * @returns {Array}
 */
export var bindDefs = function bindDefs(defs, nodes, rules) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        dataKey = _ref.dataKey,
        _ref$colorKey = _ref.colorKey,
        colorKey = _ref$colorKey === undefined ? 'color' : _ref$colorKey,
        _ref$targetKey = _ref.targetKey,
        targetKey = _ref$targetKey === undefined ? 'fill' : _ref$targetKey;

    var boundDefs = [];

    // will hold generated variation ids,
    // to avoid generating multiple identical defs
    var generatedIds = {};

    if (defs.length && nodes.length) {
        // first, add base defs
        boundDefs = [].concat(defs);

        nodes.forEach(function (node) {
            var _loop = function _loop(i) {
                var _rules$i = rules[i],
                    id = _rules$i.id,
                    match = _rules$i.match;

                if (isMatchingDef(match, node, dataKey)) {
                    var def = defs.find(function (_ref2) {
                        var defId = _ref2.id;
                        return defId === id;
                    });
                    if (def) {
                        if (patternKeys.includes(def.type)) {
                            if (def.background === 'inherit' || def.color === 'inherit') {
                                var nodeColor = get(node, colorKey);
                                var background = def.background;
                                var color = def.color;

                                var inheritedId = id;
                                if (def.background === 'inherit') {
                                    inheritedId = inheritedId + '.bg.' + nodeColor;
                                    background = nodeColor;
                                }
                                if (def.color === 'inherit') {
                                    inheritedId = inheritedId + '.fg.' + nodeColor;
                                    color = nodeColor;
                                }

                                set(node, targetKey, 'url(#' + inheritedId + ')');
                                if (!generatedIds[inheritedId]) {
                                    boundDefs.push(_extends({}, def, {
                                        id: inheritedId,
                                        background: background,
                                        color: color
                                    }));
                                    generatedIds[inheritedId] = 1;
                                }
                            } else {
                                // do not generate new def as there's no inheritance involved
                                set(node, targetKey, 'url(#' + id + ')');
                            }
                        } else if (gradientKeys.includes(def.type)) {
                            var allColors = def.colors.map(function (_ref3) {
                                var color = _ref3.color;
                                return color;
                            });

                            if (allColors.includes('inherit')) {
                                var _nodeColor = get(node, colorKey);

                                var _inheritedId = id;
                                var inheritedDef = _extends({}, def, {
                                    colors: def.colors.map(function (colorStop, i) {
                                        if (colorStop.color !== 'inherit') return colorStop;

                                        _inheritedId = _inheritedId + '.' + i + '.' + _nodeColor;

                                        return _extends({}, colorStop, {
                                            color: colorStop.color === 'inherit' ? _nodeColor : colorStop.color
                                        });
                                    })
                                });
                                inheritedDef.id = _inheritedId;

                                set(node, targetKey, 'url(#' + _inheritedId + ')');
                                if (!generatedIds[_inheritedId]) {
                                    boundDefs.push(inheritedDef);
                                    generatedIds[_inheritedId] = 1;
                                }
                            } else {
                                // do not generate new def as there's no inheritance involved
                                set(node, targetKey, 'url(#' + id + ')');
                            }
                        }
                    }

                    // break loop on first match
                    return 'break';
                }
            };

            for (var i = 0; i < rules.length; i++) {
                var _ret = _loop(i);

                if (_ret === 'break') break;
            }
        });
    }

    return boundDefs;
};