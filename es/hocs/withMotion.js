/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { partialRight } from 'lodash-es';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import setPropTypes from 'recompose/setPropTypes';
import { spring } from 'react-motion';
import { motionPropTypes } from '../props';
import { defaultAnimate, defaultMotionDamping, defaultMotionStiffness } from '../defaults';

export default (function () {
    return compose(setPropTypes(motionPropTypes), defaultProps({
        animate: defaultAnimate,
        motionDamping: defaultMotionDamping,
        motionStiffness: defaultMotionStiffness
    }), withPropsOnChange(['motionDamping', 'motionStiffness'], function (_ref) {
        var motionDamping = _ref.motionDamping,
            motionStiffness = _ref.motionStiffness;
        return {
            boundSpring: partialRight(spring, {
                damping: motionDamping,
                stiffness: motionStiffness
            })
        };
    }));
});