'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cx = _interopDefault(require('classnames/dedupe'));
var mapValues = _interopDefault(require('lodash/mapValues'));
var React = _interopDefault(require('react'));
var omit = _interopDefault(require('lodash/omit'));
var first = _interopDefault(require('lodash/first'));
var last = _interopDefault(require('lodash/last'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var supportColors = {
  white: 'drac-bg-white',
  black: 'drac-bg-black',
  blackSecondary: 'drac-bg-black-secondary',
  blackLight: 'drac-bg-black-light',
  grey: 'drac-bg-grey',
  greySecondary: 'drac-bg-grey-secondary',
  greyLight: 'drac-bg-grey-light'
};
var baseColors = {
  cyan: 'drac-bg-cyan',
  green: 'drac-bg-green',
  orange: 'drac-bg-orange',
  pink: 'drac-bg-pink',
  purple: 'drac-bg-purple',
  red: 'drac-bg-red',
  yellow: 'drac-bg-yellow'
};
var gradientColors = {
  purpleCyan: 'drac-bg-purple-cyan',
  yellowPink: 'drac-bg-yellow-pink',
  cyanGreen: 'drac-bg-cyan-green',
  pinkPurple: 'drac-bg-pink-purple'
};
var animatedColors = {
  animated: 'drac-bg-animated'
};
var colors = /*#__PURE__*/_extends({}, supportColors, baseColors, gradientColors);
var backgroundColors = /*#__PURE__*/_extends({}, colors, animatedColors);
var borderColors = /*#__PURE__*/mapValues(baseColors, function (className) {
  return className.replace('-bg-', '-border-');
});
var glowColors = /*#__PURE__*/mapValues(baseColors, function (className) {
  return className.replace('-bg-', '-glow-');
});
var baseTextColors = /*#__PURE__*/mapValues(colors, function (className) {
  return className.replace('-bg-', '-text-');
});
var scrollbarColors = /*#__PURE__*/mapValues(colors, function (className) {
  return className.replace('-bg-', '-scrollbar-');
});
var colorUtilities = {
  classes: /*#__PURE__*/[].concat( /*#__PURE__*/Object.values(baseColors), /*#__PURE__*/Object.values(baseTextColors), /*#__PURE__*/Object.values(supportColors), /*#__PURE__*/Object.values(gradientColors), /*#__PURE__*/Object.values(borderColors), /*#__PURE__*/Object.values(animatedColors)),
  react: {
    base: /*#__PURE__*/Object.keys(baseColors),
    text: /*#__PURE__*/Object.keys(baseTextColors),
    support: /*#__PURE__*/Object.keys(supportColors),
    gradient: /*#__PURE__*/Object.keys(gradientColors),
    border: /*#__PURE__*/Object.keys(borderColors),
    animated: /*#__PURE__*/Object.keys(animatedColors)
  }
};

var padding = {
  none: 'drac-p-none',
  xxs: 'drac-p-xxs',
  xs: 'drac-p-xs',
  sm: 'drac-p-sm',
  md: 'drac-p-md',
  lg: 'drac-p-lg'
};
var paddingLeft = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-pl-');
});
var paddingRight = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-pr-');
});
var paddingTop = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-pt-');
});
var paddingBottom = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-pb-');
});
var paddingX = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-px-');
});
var paddingY = /*#__PURE__*/mapValues(padding, function (clz) {
  return clz.replace('-p-', '-py-');
});
function paddingMixin(mixin) {
  var classes = [];

  if (mixin.p) {
    classes.push(padding[mixin.p]);
  }

  if (mixin.py) {
    classes.push(paddingY[mixin.py]);
  }

  if (mixin.px) {
    classes.push(paddingX[mixin.px]);
  }

  if (mixin.pt) {
    classes.push(paddingTop[mixin.pt]);
  }

  if (mixin.pb) {
    classes.push(paddingBottom[mixin.pb]);
  }

  if (mixin.pl) {
    classes.push(paddingLeft[mixin.pl]);
  }

  if (mixin.pr) {
    classes.push(paddingRight[mixin.pr]);
  }

  return classes;
}
var margin = {
  auto: 'drac-m-auto',
  none: 'drac-m-none',
  xxs: 'drac-m-xxs',
  xs: 'drac-m-xs',
  sm: 'drac-m-sm',
  md: 'drac-m-md',
  lg: 'drac-m-lg'
};
var mLeft = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-ml-');
});
var mRight = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-mr-');
});
var mTop = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-mt-');
});
var mBottom = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-mb-');
});
var mX = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-mx-');
});
var mY = /*#__PURE__*/mapValues(margin, function (clz) {
  return clz.replace('-m-', '-my-');
});
function marginMixin(mixin) {
  var classes = [];

  if (mixin.m) {
    classes.push(margin[mixin.m]);
  }

  if (mixin.my) {
    classes.push(mY[mixin.my]);
  }

  if (mixin.mx) {
    classes.push(mX[mixin.mx]);
  }

  if (mixin.mt) {
    classes.push(mTop[mixin.mt]);
  }

  if (mixin.mb) {
    classes.push(mBottom[mixin.mb]);
  }

  if (mixin.ml) {
    classes.push(mLeft[mixin.ml]);
  }

  if (mixin.mr) {
    classes.push(mRight[mixin.mr]);
  }

  return classes;
}
var spacingUtilities = {
  classes: {
    padding: /*#__PURE__*/[].concat( /*#__PURE__*/Object.values(padding), /*#__PURE__*/Object.values(paddingX), /*#__PURE__*/Object.values(paddingY), /*#__PURE__*/Object.values(paddingTop), /*#__PURE__*/Object.values(paddingBottom), /*#__PURE__*/Object.values(paddingLeft), /*#__PURE__*/Object.values(paddingRight)),
    margin: /*#__PURE__*/[].concat( /*#__PURE__*/Object.values(margin), /*#__PURE__*/Object.values(mX), /*#__PURE__*/Object.values(mY), /*#__PURE__*/Object.values(mTop), /*#__PURE__*/Object.values(mBottom), /*#__PURE__*/Object.values(mRight), /*#__PURE__*/Object.values(mLeft))
  },
  react: {
    padding: ["p", "px", "py", "pt", "pb", "pl", "pr"],
    margin: ["m", "mx", "my", "mt", "mb", "ml", "mr"]
  }
};
/**
 * Removes all spacing props from props object
 */

function cleanProps(props) {
  return omit(props, [].concat(spacingUtilities.react.padding, spacingUtilities.react.margin));
}

var _excluded = ["size", "color", "as"];
var headingSizes = {
  '2xl': 'drac-heading-2xl',
  xl: 'drac-heading-xl',
  lg: 'drac-heading-lg',
  md: 'drac-heading',
  sm: 'drac-heading-sm',
  xs: 'drac-heading-xs'
};
var headingColors = /*#__PURE__*/mapValues(colors, function (className) {
  return className.replace('-bg-', '-text-');
});
/**
 * Heading is used to display headlines and other forms of hierarchical Text.
 *
 * Headings are similar to the base Text component, but restricted to certain
 * sizes and font weight.
 */

var Heading = function Heading(props) {
  var size = props.size,
      color = props.color,
      as = props.as,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-heading", props.className, headingSizes[size != null ? size : 'xl'], headingColors[color != null ? color : 'white']].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement(as != null ? as : 'h2', cleanProps(finalProps), props.children);
};
Heading.displayName = 'Heading';

var _excluded$1 = ["align", "size", "weight", "lineHeight", "as", "color"];
var textAligns = {
  left: 'drac-text-left',
  center: 'drac-text-center',
  right: 'drac-text-right',
  justify: 'drac-text-justify'
};
var textSizes = {
  md: 'drac-text',
  lg: 'drac-text-lg',
  sm: 'drac-text-sm',
  xs: 'drac-text-xs'
};
var textWeights = {
  normal: 'drac-text',
  semibold: 'drac-text-semibold',
  bold: 'drac-text-bold'
};
var lineHeights = {
  md: 'drac-line-height',
  xl: 'drac-line-height-xl',
  lg: 'drac-line-height-lg',
  sm: 'drac-line-height-sm',
  xs: 'drac-line-height-xs'
};
var textColors = /*#__PURE__*/mapValues(colors, function (className) {
  return className.replace('-bg-', '-text-');
});
/**
 * Text is the base component for any sort of text.
 *
 * Consumers of this component can control, the color, size,
 * weight, and spacing of Text.
 *
 * Use this component for generic, and non-hierarchical text that is
 * to be displayed on a page, or as part of other complex components
 * or UI patterns.
 */

var Text = function Text(props) {
  var align = props.align,
      size = props.size,
      weight = props.weight,
      lineHeight = props.lineHeight,
      as = props.as,
      color = props.color,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$1);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-text", props.className, align && textAligns[align], textSizes[size != null ? size : 'md'], textWeights[weight != null ? weight : 'normal'], lineHeights[lineHeight != null ? lineHeight : 'md'], textColors[color != null ? color : 'white']].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement(as != null ? as : 'span', cleanProps(finalProps), props.children);
};
Text.displayName = 'Text';

var _excluded$2 = ["color", "size", "borderSize", "variant"];
var textareaVariants = {
  normal: 'drac-textarea',
  outline: 'drac-textarea-outline'
};
var textareaSizes = {
  lg: 'drac-textarea-lg',
  md: 'drac-textarea',
  sm: 'drac-textarea-sm'
};
var textareaBorderSizes = {
  lg: 'drac-textarea-border-lg',
  md: 'drac-textarea-border-md',
  sm: 'drac-textarea-border-sm'
};
var textareaColors = {
  white: 'drac-textarea-white drac-text-white',
  cyan: 'drac-textarea-cyandrac-text-cyan',
  green: 'drac-textarea-green drac-text-green',
  orange: 'drac-textarea-orange drac-text-orange',
  pink: 'drac-textarea-pink drac-text-pink',
  purple: 'drac-textarea-purple drac-text-purple',
  red: 'drac-textarea-red drac-text-red',
  yellow: 'drac-textarea-yellow drac-text-yellow'
};
var Textarea = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var color = props.color,
      size = props.size,
      borderSize = props.borderSize,
      variant = props.variant,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$2);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-textarea", props.className, variant && textareaVariants[variant], size && typeof size === 'string' && textareaSizes[size], borderSize && textareaBorderSizes[borderSize], color && textareaColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  if (size && typeof size === 'number') {
    finalProps[size] = size;
  }

  return React.createElement("textarea", Object.assign({
    ref: ref
  }, cleanProps(finalProps)));
});
Textarea.displayName = 'Textarea';

var _excluded$3 = ["size", "weight", "color", "hoverColor", "isExternal"];
var hoverColors = /*#__PURE__*/mapValues(textColors, function (classname) {
  return classname + "--hover";
});
/**
 * Anchor is an abstraction/style that can/is applied to HTML anchor elements.
 *
 * Consumers of this component can control, the color, size,
 * weight, and spacing of the Anchor.
 *
 * Use this component to create text or element based anchors around other HTML tags or React Components.
 */

var Anchor = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var size = props.size,
      weight = props.weight,
      color = props.color,
      hoverColor = props.hoverColor,
      isExternal = props.isExternal,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$3);

  var finalProps = cleanProps(_extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-anchor", "drac-text", props.className, textSizes[size != null ? size : 'md'], textWeights[weight != null ? weight : 'normal'], textColors[color != null ? color : 'white'], hoverColors[hoverColor != null ? hoverColor : 'purple']].concat(paddingMixin(props), marginMixin(props)))
  }));
  return React.createElement("a", Object.assign({
    ref: ref,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined
  }, finalProps), props.children);
});
Anchor.displayName = 'Anchor';

var _excluded$4 = ["align", "size", "weight", "lineHeight", "color"];
/**
 * Paragraph is a semantic component used for blocks of text with
 * semantic meaning.
 *
 * Paragraph accepts all the same customization options as Text.
 */

var Paragraph = function Paragraph(props) {
  var align = props.align,
      size = props.size,
      weight = props.weight,
      lineHeight = props.lineHeight,
      color = props.color,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$4);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-text", props.className, align && textAligns[align], textSizes[size != null ? size : 'md'], textWeights[weight != null ? weight : 'normal'], lineHeights[lineHeight != null ? lineHeight : 'md'], textColors[color != null ? color : 'white']].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("p", Object.assign({}, cleanProps(finalProps)), props.children);
};
Paragraph.displayName = 'Paragraph';

var _excluded$5 = ["color", "display", "height", "width", "glowColor", "borderColor", "rounded", "as", "scrollbar"];
var roundedBorders = {
  none: 'drac-rounded-none',
  sm: 'drac-rounded-sm',
  base: 'drac-rounded',
  lg: 'drac-rounded-lg',
  xl: 'drac-rounded-xl',
  '2xl': 'drac-rounded-2xl',
  '3xl': 'drac-rounded-3xl',
  full: 'drac-rounded-full'
};
var displays = {
  none: 'drac-d-none',
  block: 'drac-d-block',
  flex: 'drac-d-flex',
  grid: 'drac-d-grid',
  table: 'drac-d-table',
  inline: 'drac-d-inline',
  'inline-block': 'drac-d-inline-block',
  'inline-flex': 'drac-d-inline-flex',
  'inline-grid': 'drac-d-inline-grid',
  'inline-table': 'drac-d-inline-table'
};
var widths = {
  auto: 'drac-w-auto',
  none: 'drac-w-none',
  full: 'drac-w-full',
  xxs: 'drac-w-xxs',
  xs: 'drac-w-xs',
  sm: 'drac-w-sm',
  md: 'drac-w-md',
  lg: 'drac-w-lg',
  xl: 'drac-w-xl',
  '2xl': 'drac-w-2xl',
  '3xl': 'drac-w-3xl',
  '4xl': 'drac-w-4xl',
  '5xl': 'drac-w-5xl',
  '6xl': 'drac-w-6xl',
  '7xl': 'drac-w-7xl',
  '8xl': 'drac-w-8xl'
};
var heights = /*#__PURE__*/mapValues(widths, function (clz) {
  return clz.replace('-w-', '-h-');
});
/**
 * Box is the most primitive component of Dracula UI.
 * Using Box allows for consumers of the components library to compose
 * more complex patterns, components, and UIs.
 *
 * Box includes built-in Color and Spacing properties that make building
 * complex components convenient and consistent.
 */

function Box(props) {
  var color = props.color,
      display = props.display,
      height = props.height,
      width = props.width,
      glowColor = props.glowColor,
      borderColor = props.borderColor,
      rounded = props.rounded,
      _props$as = props.as,
      as = _props$as === void 0 ? 'div' : _props$as,
      scrollbar = props.scrollbar,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$5);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-box", props.className, scrollbar && scrollbarColors[typeof scrollbar === 'boolean' ? 'purple' : scrollbar], height && heights[height], width && widths[width], color && backgroundColors[color], display && displays[display], glowColor && glowColors[glowColor], borderColor && borderColors[borderColor], rounded && roundedBorders[rounded]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement(as, cleanProps(finalProps), props.children);
}
Box.displayName = 'Box';

var _excluded$6 = ["color", "size", "variant", "disabled", "as"];
var buttonVariants = {
  normal: 'drac-btn',
  outline: 'drac-btn-outline',
  ghost: 'drac-btn-ghost'
};
var buttonSizes = {
  md: 'drac-btn',
  lg: 'drac-btn-lg',
  sm: 'drac-btn-sm',
  xs: 'drac-btn-xs'
};
/**
 * The Button component triggers actions, behaviors, or events based
 * on user input.
 */

var Button = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var color = props.color,
      size = props.size,
      variant = props.variant,
      disabled = props.disabled,
      as = props.as,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$6);

  var isOutline = variant === 'outline';
  var isGhost = variant === 'ghost';
  var overrideTextColor = isOutline || isGhost;
  var textColorClass = overrideTextColor && color !== 'animated' ? textColors[color != null ? color : 'green'] : undefined;
  var backgroundClass = backgroundColors[color != null ? color : 'green'];

  if (isGhost) {
    backgroundClass = backgroundClass + "-transparent";
  }

  var classes = cx.apply(void 0, ['drac-btn', props.className, backgroundClass, buttonVariants[variant != null ? variant : 'normal'], buttonSizes[size != null ? size : 'md'], textColorClass].concat(paddingMixin(props), marginMixin(props)));
  return React.createElement(as != null ? as : 'button', _extends({
    className: classes,
    disabled: disabled
  }, cleanProps(htmlProps), {
    ref: ref
  }), props.children);
});
Button.displayName = 'Button';

var _excluded$7 = ["variant", "color", "children"];
var variants = {
  normal: 'drac-badge',
  subtle: 'drac-badge-subtle',
  outline: 'drac-badge-outline'
};
/**
 * Badges are used to denote status or to highlight specific
 * information.
 */

var Badge = function Badge(props) {
  var _props$variant;

  var variant = props.variant,
      _props$color = props.color,
      color = _props$color === void 0 ? 'purple' : _props$color,
      children = props.children,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$7);

  var isOutline = variant === 'outline';
  var isSubtle = variant === 'subtle';
  var overrideTextColor = isOutline || isSubtle;
  var textColorClass = overrideTextColor && color !== 'animated' ? textColors[color] : undefined;
  var backgroundClass = backgroundColors[color];

  if (isSubtle) {
    backgroundClass = backgroundClass + "-transparent";
  }

  var classes = cx.apply(void 0, ['drac-badge', props.className, backgroundClass, variants[(_props$variant = props.variant) != null ? _props$variant : 'normal'], textColorClass].concat(marginMixin(props), paddingMixin(props)));
  return React.createElement("span", Object.assign({
    className: classes
  }, cleanProps(htmlProps)), React.createElement(Text, {
    color: overrideTextColor && props.color !== 'animated' ? props.color : 'black'
  }, children));
};
Badge.displayName = 'Badge';

var _excluded$8 = ["color", "variant", "borderVariant", "src", "title"];
var AvatarVariants = {
  normal: 'drac-avatar',
  subtle: 'drac-avatar-subtle'
};
var AvatarBorderVariants = {
  normal: '',
  large: 'drac-avatar-lg-stroke',
  none: 'drac-avatar-no-border'
};
/**
 * The Avatar component is used to represent a user.
 *
 * It displays a profile picture, or falls back to the user's initials
 * if a profile pic is not provided.
 */

var Avatar = function Avatar(props) {
  var _first, _last, _props$color;

  var color = props.color,
      variant = props.variant,
      borderVariant = props.borderVariant,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$8);

  var backgroundClass = colors[color != null ? color : 'green'] + "-transparent";
  var classes = cx.apply(void 0, ['drac-avatar', props.className, backgroundClass, textColors[color != null ? color : 'green'], AvatarVariants[variant != null ? variant : 'normal'], AvatarBorderVariants[borderVariant != null ? borderVariant : 'normal']].concat(paddingMixin(props), marginMixin(props)));
  var names = props.title.split(' ');
  var f = (_first = first(names)) == null ? void 0 : _first.slice(0, 1);
  var l = (_last = last(names)) == null ? void 0 : _last.slice(0, 1);

  var style = _extends({}, props.style);

  return React.createElement("span", Object.assign({
    className: classes,
    style: style
  }, cleanProps(htmlProps)), props.src && React.createElement("span", {
    className: cx('drac-avatar-background'),
    style: {
      backgroundImage: "url('" + props.src + "')"
    }
  }), !props.src && React.createElement(Text, {
    color: (_props$color = props.color) != null ? _props$color : 'white'
  }, f, l));
};
Avatar.displayName = 'Avatar';

var _excluded$9 = ["color", "size", "borderSize", "variant"];
var inputVariants = {
  normal: 'drac-input',
  outline: 'drac-input-outline'
};
var inputSizes = {
  lg: 'drac-input-lg',
  md: 'drac-input',
  sm: 'drac-input-sm'
};
var borderSizes = {
  lg: 'drac-input-border-lg',
  md: 'drac-input-border-md',
  sm: 'drac-input-border-sm'
};
var inputColors = {
  white: 'drac-input-white drac-text-white',
  cyan: 'drac-input-cyan drac-text-cyan',
  green: 'drac-input-green drac-text-green',
  orange: 'drac-input-orange drac-text-orange',
  pink: 'drac-input-pink drac-text-pink',
  purple: 'drac-input-purple drac-text-purple',
  red: 'drac-input-red drac-text-red',
  yellow: 'drac-input-yellow drac-text-yellow'
};
/**
 * Input is a styled HTML Input.
 *
 * There are no behavior changes applied to the native HTML tag other
 * than light styling done via CSS in order to keep inputs accessible.
 */

var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var color = props.color,
      size = props.size,
      borderSize = props.borderSize,
      variant = props.variant,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$9);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-input", props.className, variant && inputVariants[variant], size && typeof size === 'string' && inputSizes[size], borderSize && borderSizes[borderSize], color && inputColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  if (size && typeof size === 'number') {
    finalProps[size] = size;
  }

  return React.createElement("input", Object.assign({
    ref: ref
  }, cleanProps(finalProps)));
});
Input.displayName = 'Input';

var _excluded$a = ["size", "variant", "color", "disabled"];
var selectVariants = {
  normal: 'drac-select',
  outline: 'drac-select-outline'
};
var selectSizes = {
  large: 'drac-select-lg',
  medium: 'drac-select',
  small: 'drac-select-sm'
};
var selectColors = {
  white: 'drac-select-white',
  cyan: 'drac-select-cyan',
  green: 'drac-select-green',
  orange: 'drac-select-orange',
  pink: 'drac-select-pink',
  purple: 'drac-select-purple',
  red: 'drac-select-red',
  yellow: 'drac-select-yellow'
};
/**
 * Select is a styled HTML Select element.
 *
 * There are no behavior changes applied to the native HTML tag other
 * than light styling done via CSS, and small SVG component in order to keep Selects accessible.
 */

var Select = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var size = props.size,
      variant = props.variant,
      color = props.color,
      disabled = props.disabled,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$a);

  var finalProps = _extends({
    disabled: disabled
  }, htmlProps, {
    className: cx.apply(void 0, ['drac-select', props.className, variant && selectVariants[variant], typeof size === 'string' && size && selectSizes[size], color && selectColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  if (typeof size === 'number') {
    finalProps.size = size;
  }

  return React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement("select", Object.assign({
    ref: ref
  }, cleanProps(finalProps))), React.createElement("div", {
    className: "drac-select-arrow drac-text-" + props.color
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    focusable: "false",
    role: "presentation",
    "aria-hidden": "true"
  }, React.createElement("path", {
    fill: "currentColor",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }))));
});
Select.displayName = 'Select';

var _excluded$b = ["color"];
var dividerColors = borderColors;
/**
 * Dividers are horizontal lines used to separate semantic blocks of
 * content or UI patterns.
 */

var Divider = function Divider(props) {
  var color = props.color,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$b);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ["drac-divider", props.className, color && dividerColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("hr", Object.assign({}, cleanProps(finalProps)));
};
Divider.displayName = 'Divider';

var _excluded$c = ["color", "name", "disabled"];
var radioColors = {
  white: 'drac-radio-white',
  cyan: 'drac-radio-cyan',
  green: 'drac-radio-green',
  orange: 'drac-radio-orange',
  pink: 'drac-radio-pink',
  purple: 'drac-radio-purple',
  red: 'drac-radio-red',
  yellow: 'drac-radio-yellow'
};
/**
 * Radio is a styled HTML Input of type radio.
 *
 * There are no behavior changes applied to the native HTML tag other
 * than light styling done via CSS in order to keep Radios accessible.
 */

var Radio = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var color = props.color,
      name = props.name,
      disabled = props.disabled,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$c);

  var finalProps = _extends({
    name: name,
    disabled: disabled
  }, htmlProps, {
    className: cx.apply(void 0, ["drac-radio", props.className, radioColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("input", Object.assign({
    type: "radio",
    ref: ref
  }, cleanProps(finalProps)));
});
Radio.displayName = 'Radio';

var _excluded$d = ["className", "color", "name", "disabled"];
var checkboxColors = {
  white: 'drac-checkbox-white',
  cyan: 'drac-checkbox-cyan',
  green: 'drac-checkbox-green',
  orange: 'drac-checkbox-orange',
  pink: 'drac-checkbox-pink',
  purple: 'drac-checkbox-purple',
  red: 'drac-checkbox-red',
  yellow: 'drac-checkbox-yellow'
};
/**
 * Checkbox is a styled HTML Input of type checkbox.
 *
 * There are no behavior changes applied to the native HTML tag other
 * than light styling done via CSS in order to keep check boxes accessible.
 */

var Checkbox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
      color = props.color,
      name = props.name,
      disabled = props.disabled,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$d);

  var finalProps = _extends({
    name: name,
    disabled: disabled
  }, htmlProps, {
    className: cx.apply(void 0, ["drac-checkbox", className, color && checkboxColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("input", Object.assign({
    type: "checkbox",
    ref: ref
  }, cleanProps(finalProps)));
});
Checkbox.displayName = 'Checkbox';

var _excluded$e = ["name", "color", "disabled"];
var switchColors = {
  white: 'drac-switch-white',
  cyan: 'drac-switch-cyan',
  green: 'drac-switch-green',
  orange: 'drac-switch-orange',
  pink: 'drac-switch-pink',
  purple: 'drac-switch-purple',
  red: 'drac-switch-red',
  yellow: 'drac-switch-yellow'
};
/**
 * Switch is an abstraction pattern that represents toggles.
 *
 * Use the Switch component as an alternative for Checkboxes or Radios
 * when options are binary.
 *
 * Switches are implemented as Checkboxes under the hood,
 * and work normally with forms.
 */

var Switch = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var name = props.name,
      color = props.color,
      disabled = props.disabled,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$e);

  var finalProps = _extends({
    name: name,
    disabled: disabled
  }, htmlProps, {
    className: cx.apply(void 0, ["drac-switch", 'drac-checkbox', props.className, switchColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("input", Object.assign({
    type: "checkbox",
    ref: ref
  }, cleanProps(finalProps)));
});
Switch.displayName = 'Switch';

var cardOrientations = {
  normal: '',
  portrait: 'drac-card-portrait'
};
var cardVariants = {
  normal: '',
  subtle: 'drac-card-subtle'
};
/**
 * Card is a high level Pattern Component use to group
 * related or hierarchical information.
 */

var Card = function Card(props) {
  var classNames = cx('drac-card', props.className, props.variant && cardVariants[props.variant], // apply border color based on theme color
  // @ts-ignore TODO: make sure border and background colors match
  props.color && props.variant !== 'subtle' && backgroundColors[props.color], // @ts-ignore TODO: make sure border and background colors match
  props.color && props.variant === 'subtle' && borderColors[props.color], props.glowColor && glowColors[props.glowColor]);
  return React.createElement(Box, Object.assign({}, props, {
    className: classNames
  }), props.children);
};
Card.displayName = 'Card';

var _excluded$f = ["color"];
var tabsColors = {
  white: 'drac-tabs-white',
  cyan: 'drac-tabs-cyan',
  green: 'drac-tabs-green',
  orange: 'drac-tabs-orange',
  pink: 'drac-tabs-pink',
  purple: 'drac-tabs-purple',
  red: 'drac-tabs-red',
  yellow: 'drac-tabs-yellow'
};
/**
 * Tabs are horizontal navigation elements used to display
 * content within the same page.
 */

var Tabs = function Tabs(props) {
  var color = props.color,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$f);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ['drac-tabs', props.className, tabsColors[color != null ? color : 'white']].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("ul", Object.assign({}, cleanProps(finalProps)));
};
Tabs.displayName = 'Tabs';

var _excluded$g = ["color", "variant"];
var tableColors = {
  white: 'drac-table-white',
  cyan: 'drac-table-cyan',
  green: 'drac-table-green',
  orange: 'drac-table-orange',
  pink: 'drac-table-pink',
  purple: 'drac-table-purple',
  red: 'drac-table-red',
  yellow: 'drac-table-yellow'
};
var tableVariants = {
  normal: 'drac-table',
  striped: 'drac-table-striped'
};
/**
 * Tables are used to display data in a tabular fashion.
 */

var Table = function Table(props) {
  var color = props.color,
      variant = props.variant,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$g);

  var finalProps = _extends({}, htmlProps, {
    className: cx.apply(void 0, ['drac-table', props.className, variant && tableVariants[variant], color && tableColors[color]].concat(paddingMixin(props), marginMixin(props)))
  });

  return React.createElement("table", Object.assign({}, cleanProps(finalProps)));
};
Table.displayName = 'Table';

var _excluded$h = ["color", "variant"];
var listColors = {
  white: 'drac-list-white',
  cyan: 'drac-list-cyan',
  green: 'drac-list-green',
  orange: 'drac-list-orange',
  pink: 'drac-list-pink',
  purple: 'drac-list-purple',
  red: 'drac-list-red',
  yellow: 'drac-list-yellow'
};
var listVariants = {
  unordered: 'drac-list-unordered',
  ordered: 'drac-list-ordered',
  none: 'drac-list-none'
};
/**
 * Lists are used to display list items in an unordered way.
 */

var List = function List(props) {
  var color = props.color,
      variant = props.variant,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$h);

  if (variant === 'ordered') throw new Error('the `ordered` prop has been deprecated. Please use the OrderedList component.');
  var finalProps = cleanProps(_extends({}, htmlProps, {
    className: cx.apply(void 0, ['drac-list', props.className, variant && listVariants[variant], color && listColors[color]].concat(paddingMixin(props), marginMixin(props)))
  }));
  return React.createElement("ul", Object.assign({}, finalProps));
};
List.displayName = 'List';

var _excluded$i = ["color", "type"];
var orderedListColors = {
  white: 'drac-list-white',
  cyan: 'drac-list-cyan',
  green: 'drac-list-green',
  orange: 'drac-list-orange',
  pink: 'drac-list-pink',
  purple: 'drac-list-purple',
  red: 'drac-list-red',
  yellow: 'drac-list-yellow'
};
var orderedListTypes = {
  1: 'drac-list-ordered-decimal',
  a: 'drac-list-ordered-lower-alpha',
  A: 'drac-list-ordered-lower-alpha',
  i: 'drac-list-ordered-lower-roman',
  I: 'drac-list-ordered-lower-roman'
};
/**
 * Ordered Lists are used to display list items in an ordered way.
 */

var OrderedList = function OrderedList(props) {
  var color = props.color,
      type = props.type,
      htmlProps = _objectWithoutPropertiesLoose(props, _excluded$i);

  var finalProps = cleanProps(_extends({}, htmlProps, {
    type: type,
    className: cx.apply(void 0, ['drac-list drac-list-ordered', type && orderedListTypes[type], props.className, color && orderedListColors[color]].concat(paddingMixin(props), marginMixin(props)))
  }));
  return React.createElement("ol", Object.assign({}, finalProps));
};
OrderedList.displayName = 'OrderedList';

exports.Anchor = Anchor;
exports.Avatar = Avatar;
exports.AvatarBorderVariants = AvatarBorderVariants;
exports.AvatarVariants = AvatarVariants;
exports.Badge = Badge;
exports.Box = Box;
exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Divider = Divider;
exports.Heading = Heading;
exports.Input = Input;
exports.List = List;
exports.OrderedList = OrderedList;
exports.Paragraph = Paragraph;
exports.Radio = Radio;
exports.Select = Select;
exports.Switch = Switch;
exports.Table = Table;
exports.Tabs = Tabs;
exports.Text = Text;
exports.Textarea = Textarea;
exports.animatedColors = animatedColors;
exports.backgroundColors = backgroundColors;
exports.baseColors = baseColors;
exports.baseTextColors = baseTextColors;
exports.borderColors = borderColors;
exports.borderSizes = borderSizes;
exports.buttonSizes = buttonSizes;
exports.buttonVariants = buttonVariants;
exports.cardOrientations = cardOrientations;
exports.cardVariants = cardVariants;
exports.checkboxColors = checkboxColors;
exports.cleanProps = cleanProps;
exports.colorUtilities = colorUtilities;
exports.colors = colors;
exports.displays = displays;
exports.dividerColors = dividerColors;
exports.glowColors = glowColors;
exports.gradientColors = gradientColors;
exports.headingColors = headingColors;
exports.headingSizes = headingSizes;
exports.heights = heights;
exports.hoverColors = hoverColors;
exports.inputColors = inputColors;
exports.inputSizes = inputSizes;
exports.inputVariants = inputVariants;
exports.lineHeights = lineHeights;
exports.listColors = listColors;
exports.listVariants = listVariants;
exports.marginMixin = marginMixin;
exports.orderedListColors = orderedListColors;
exports.paddingMixin = paddingMixin;
exports.radioColors = radioColors;
exports.roundedBorders = roundedBorders;
exports.scrollbarColors = scrollbarColors;
exports.selectColors = selectColors;
exports.selectSizes = selectSizes;
exports.selectVariants = selectVariants;
exports.spacingUtilities = spacingUtilities;
exports.supportColors = supportColors;
exports.switchColors = switchColors;
exports.tableColors = tableColors;
exports.tableVariants = tableVariants;
exports.tabsColors = tabsColors;
exports.textAligns = textAligns;
exports.textColors = textColors;
exports.textSizes = textSizes;
exports.textWeights = textWeights;
exports.textareaBorderSizes = textareaBorderSizes;
exports.textareaColors = textareaColors;
exports.textareaSizes = textareaSizes;
exports.textareaVariants = textareaVariants;
exports.widths = widths;
//# sourceMappingURL=dracula-ui.cjs.development.js.map
