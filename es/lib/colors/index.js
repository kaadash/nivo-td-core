/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash-es';
import { scaleOrdinal, schemeCategory10, schemeCategory20, schemeCategory20b, schemeCategory20c } from 'd3-scale';
import { schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3 } from 'd3-scale-chromatic';

var ordinalColorScales = {
    d310: scaleOrdinal(schemeCategory10),
    d320: scaleOrdinal(schemeCategory20),
    d320b: scaleOrdinal(schemeCategory20b),
    d320c: scaleOrdinal(schemeCategory20c),
    accent: scaleOrdinal(schemeAccent),
    dark2: scaleOrdinal(schemeDark2),
    paired: scaleOrdinal(schemePaired),
    pastel1: scaleOrdinal(schemePastel1),
    pastel2: scaleOrdinal(schemePastel2),
    set1: scaleOrdinal(schemeSet1),
    set2: scaleOrdinal(schemeSet2),
    set3: scaleOrdinal(schemeSet3)
};

export var nivoCategoricalColors = function nivoCategoricalColors() {
    return scaleOrdinal(['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5']);
};

var dataColor = function dataColor(d) {
    return d.color || d.data.color;
};

export var getColorRange = function getColorRange(instruction) {
    if (instruction === 'data') return dataColor;

    if (instruction === 'nivo') return nivoCategoricalColors();

    if (_.isFunction(instruction)) return instruction;

    if (ordinalColorScales[instruction]) return ordinalColorScales[instruction];

    if (_.isArray(instruction)) return scaleOrdinal(instruction);

    return function () {
        return instruction;
    };
};

export var getColorsGenerator = function getColorsGenerator(colors, colorBy) {
    // skip range, color should be bound to data
    if (_.isFunction(colorBy)) return colorBy;

    var scale = void 0;
    var getColorId = function getColorId(d) {
        return _.get(d, colorBy);
    };

    if (colors === 'nivo') {
        // use default nivo categorical colors
        scale = nivoCategoricalColors();
    } else if (ordinalColorScales[colors]) {
        // use predefined d3 ordinal color scale
        scale = ordinalColorScales[colors];
    } else if (_.isArray(colors)) {
        // user defined color range
        scale = scaleOrdinal(colors);
    } else {
        // just use provided value, all elements will have identical color
        return function (d) {
            return colors;
        };
    }

    return function (d) {
        return scale(getColorId(d));
    };
};

export * from './inherit';
export * from './motion';
export * from './quantize';