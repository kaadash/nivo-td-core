/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memoize, isFunction, get } from 'lodash-es';
import { rgb } from 'd3-color';

/**
 * Memoize both color generator & color generator result.
 */
var memoizedColorModifier = memoize(function (method, _amount) {
    var amount = parseFloat(_amount);

    return memoize(function (d) {
        return rgb(d.color)[method](amount).toString();
    }, function (d) {
        return d.color;
    });
}, function (method, amount) {
    return method + '.' + amount;
});

var noneGenerator = function noneGenerator() {
    return 'none';
};
var inheritGenerator = function inheritGenerator(d) {
    return d.color;
};

/**
 * @param {string|Function} instruction
 * @param {string}          [themeKey]
 * @return {Function}
 */
export var getInheritedColorGenerator = function getInheritedColorGenerator(instruction, themeKey) {
    if (instruction === 'none') return noneGenerator;

    if (isFunction(instruction)) return instruction;

    if (instruction === 'theme') {
        if (!themeKey) {
            throw new Error('Cannot use \'theme\' directive without providing \'themeKey\'');
        }

        return function (d, theme) {
            return get(theme, themeKey);
        };
    }

    if (instruction === 'inherit') return inheritGenerator;

    var inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/);
    if (inheritMatches) {
        var method = inheritMatches[1];
        var amount = inheritMatches[2];

        return memoizedColorModifier(method, amount);
    }

    return function () {
        return instruction;
    };
};