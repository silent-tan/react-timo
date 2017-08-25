import { placements as rcPlacements } from 'rc-tooltip/lib/placements';
import _isBoolean from 'lodash/isBoolean';
import _forEach from 'lodash/forEach';

const autoAdjustOverflowEnabled = { adjustX: 1, adjustY: 1 };
const autoAdjustOverflowDisabled = { adjustX: 0, adjustY: 0 };
const targetOffset = [0, 0];

export function getOverflowOptions(autoAdjustOverflow) {
  if (_isBoolean(autoAdjustOverflow)) {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow
  };
}

export default function getPlacements(config = {}) {
  const {
    arrowWidth = 5,
    horizontalArrowShift = 16,
    verticalArrowShift = 12,
    autoAdjustOverflow = true
  } = config;
  const placementMap = {
    left: {
      points: ['cr', 'cl'],
      offset: [-4, 0]
    },
    right: {
      points: ['cl', 'cr'],
      offset: [4, 0]
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4]
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4]
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  _forEach(placementMap, (value, placement) => {
    placementMap[placement] = config.arrowPointAtCenter ? {
      ...value,
      overflow: getOverflowOptions(autoAdjustOverflow),
      targetOffset
    } : {
      ...rcPlacements[placement],
      overflow: getOverflowOptions(autoAdjustOverflow)
    };
  });
  return placementMap;
}