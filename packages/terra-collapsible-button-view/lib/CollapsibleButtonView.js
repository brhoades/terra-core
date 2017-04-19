'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _CollapsibleButtonItem = require('./CollapsibleButtonItem');

var _CollapsibleButtonItem2 = _interopRequireDefault(_CollapsibleButtonItem);

var _CollapsibleButtonGroup = require('./CollapsibleButtonGroup');

var _CollapsibleButtonGroup2 = _interopRequireDefault(_CollapsibleButtonGroup);

require('./CollapsibleButtonView.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable no-debugger*/

var propTypes = {
  /**
   * The children to be placed within the button view.
   */
  children: _react.PropTypes.node,
  /**
   * The children to be placed within the button view.
   */
  alignment: _react.PropTypes.oneOf(['alignStart', 'alignEnd'])
};

var defaultProps = {
  children: undefined,
  alignment: 'alignStart'
};

var CollapsibleButtonView = function (_React$Component) {
  _inherits(CollapsibleButtonView, _React$Component);

  _createClass(CollapsibleButtonView, null, [{
    key: 'childFromIndexPath',
    value: function childFromIndexPath(children, indexPath) {
      var child = void 0;
      var currentChildren = children;
      var clonedIndexPath = indexPath.slice(0);

      while (clonedIndexPath.length > 0) {
        child = currentChildren ? currentChildren[clonedIndexPath.pop()] : null;
        currentChildren = child ? child.children : null;
      }

      return child;
    }
  }, {
    key: 'nestedArrayWithValueAtIndexPath',
    value: function nestedArrayWithValueAtIndexPath(nestedArrays, value, indexPath) {
      var newArray = nestedArrays.map(function (a) {
        return _extends({}, a);
      });
      var currentArray = newArray;
      var clonedIndexPath = indexPath.slice(0);

      while (clonedIndexPath.length > 1) {
        currentArray = currentArray[clonedIndexPath.pop()];
      }

      currentArray[clonedIndexPath] = value;
      return newArray;
    }
  }, {
    key: 'getSelectedStates',
    value: function getSelectedStates(children) {
      var selectedStates = [];
      for (var i = 0; i < children.length; i += 1) {
        if (children[i].props.children) {
          selectedStates.push(CollapsibleButtonView.getSelectedStates(children[i].props.children));
        } else {
          selectedStates.push(children[i].props.isSelected);
        }
      }
      return selectedStates;
    }
  }, {
    key: 'indexPathValueFromNestedArrays',
    value: function indexPathValueFromNestedArrays(nestedArrays, indexPath) {
      var currentValue = nestedArrays;
      var clonedIndexPath = indexPath.slice(0);

      while (clonedIndexPath.length > 0) {
        currentValue = currentValue[clonedIndexPath.pop()];
      }
      return currentValue;
    }
  }, {
    key: 'getInitialState',
    value: function getInitialState(children) {
      var selectedStates = CollapsibleButtonView.getSelectedStates(children);
      return { hiddenIndexes: [], selectedStates: selectedStates, toggleOpen: false };
    }
  }]);

  function CollapsibleButtonView(props) {
    _classCallCheck(this, CollapsibleButtonView);

    var _this = _possibleConstructorReturn(this, (CollapsibleButtonView.__proto__ || Object.getPrototypeOf(CollapsibleButtonView)).call(this, props));

    _this.state = CollapsibleButtonView.getInitialState(_this.props.children);
    _this.setContainer = _this.setContainer.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.toggleButton = _react2.default.createElement(_terraButton2.default, { text: '\u2026', onClick: _this.handleToggle });
    return _this;
  }

  _createClass(CollapsibleButtonView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.container) {
        this.resizeObserver = new _resizeObserverPolyfill2.default(function (entries) {
          _this2.setState({ hiddenIndexes: [], selectedStates: _this2.state.selectedStates, toggleOpen: _this2.state.toggleOpen });
          _this2.forceUpdate();
          _this2.handleResize(entries[0].contentRect.width);
        });
        this.resizeObserver.observe(this.container);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.container) {
        this.resizeObserver.disconnect(this.container);
        this.container = null;
      }
    }
  }, {
    key: 'setContainer',
    value: function setContainer(node) {
      if (node === null) {
        return;
      } // Ref callbacks happen on mount and unmount, element will be null on unmount
      this.container = node;
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle() {
      this.setState({ toggleOpen: !this.state.toggleOpen, hiddenIndexes: this.state.hiddenIndexes, selectedStates: this.state.selectedStates });
    }
  }, {
    key: 'handleResize',
    value: function handleResize(width) {
      // do calculation here
      var widthToMeasure = width;
      var hiddenIndexes = [];
      var calcWidth = 0;

      for (var i = 0; i < this.props.children.length; i += 1) {
        var child = this.container.children[i];
        if (!child) {
          break;
        }
        calcWidth += child.getBoundingClientRect().width;
        if (calcWidth > widthToMeasure) {
          hiddenIndexes.push(i);
        }
      }

      if (hiddenIndexes.length !== this.state.hiddenIndexes.length) {
        this.setState({ toggleOpen: false, hiddenIndexes: hiddenIndexes, selectedStates: this.state.selectedStates });
      }
    }
  }, {
    key: 'visibleChildComponents',
    value: function visibleChildComponents(children) {
      var visibleChildren = [];
      for (var i = 0; i < children.length; i += 1) {
        if (this.state.hiddenIndexes.indexOf(i) < 0) {
          visibleChildren.push(children[i]);
        }
      }
      return visibleChildren;
    }
  }, {
    key: 'hiddenChildComponents',
    value: function hiddenChildComponents(children) {
      var indexes = this.state.hiddenIndexes;
      var hiddenChildren = [];
      for (var i = 0; i < indexes.length; i += 1) {
        hiddenChildren.push(children[indexes[i]]);
      }
      return hiddenChildren;
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick(event, index) {
      var shouldDismiss = this.children[index].isListStyle === true; //needs to be advanced
      if (this.state.toggleOpen && shouldDismiss) {
        this.setState({ toggleOpen: false, hiddenIndexes: this.state.hiddenIndexes, selectedStates: this.state.selectedStates });
      }
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(event, indexPath, selectedValue) {
      var selectedStates = CollapsibleButtonView.nestedArrayWithValueAtIndexPath(this.state.selectedStates, selectedValue, indexPath);
      this.setState({ toggleOpen: this.state.toggleOpen, hiddenIndexes: this.state.hiddenIndexes, selectedStates: selectedStates });
    }
  }, {
    key: 'wrapOnClick',
    value: function wrapOnClick(item) {
      var _this3 = this;

      var onClick = item.props.onClick;
      return function (event) {
        _this3.handleOnClick(event);

        if (onClick) {
          onClick(event);
        }
      };
    }
  }, {
    key: 'wrapOnChange',
    value: function wrapOnChange(item, indexPath) {
      var _this4 = this;

      var onChange = item.props.onChange;
      return function (event) {
        _this4.handleOnChange(event, indexPath, selectedValue);

        if (onChange) {
          onChange(event, selectedValue);
        }
      };
    }
  }, {
    key: 'wrapChildComponents',
    value: function wrapChildComponents(children, indexPath) {
      var _this5 = this;

      return children.map(function (child, i) {
        var newProps = {};
        var clonedIndexPath = indexPath.slice(0);
        clonedIndexPath.push(i);

        if (child.type.displayName !== 'CollapsibleButtonGroup') {
          newProps.onChange = _this5.wrapOnChange(child, clonedIndexPath);
          newProps.selectedIndexes = CollapsibleButtonView.indexPathValueFromNestedArrays(_this5.state.selectedStates, clonedIndexPath);
        } else {
          newProps.onClick = _this5.wrapOnClick(child);
          newProps.isSelected = CollapsibleButtonView.indexPathValueFromNestedArrays(_this5.state.selectedStates, clonedIndexPath);
        }

        if (child.props.children) {
          _this5.wrapChildComponents(child.props.children, clonedIndexPath);
        }

        return _react2.default.cloneElement(child, newProps);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          alignment = _props.alignment,
          customProps = _objectWithoutProperties(_props, ['children', 'alignment']);

      var listClassNames = (0, _classnames2.default)(['terra-CollapsibleButtonView', _defineProperty({}, 'terra-CollapsibleButtonView-' + alignment, alignment), customProps.className]);

      var wrappedChildren = this.wrapChildComponents(children, []);
      var visibleChildren = this.visibleChildComponents(wrappedChildren);
      var hiddenChildren = this.hiddenChildComponents(wrappedChildren);

      var toggle = void 0;
      if (hiddenChildren.length > 0) {
        toggle = this.toggleButton;
      }

      var hiddenSection = void 0;
      if (this.state.toggleOpen) {
        hiddenSection = _react2.default.createElement(
          'div',
          { className: 'terra-CollapsibleButtonView-hiddenArea' },
          hiddenChildren
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'terra-CollapsibleButtonView-totallyTemporary' },
        _react2.default.createElement(
          'div',
          { className: 'terra-CollapsibleButtonView' },
          _react2.default.createElement(
            'div',
            { className: 'terra-CollapsibleButtonView-container', ref: this.setContainer },
            visibleChildren.map(function (child, childIndex) {
              var childKey = childIndex;
              return _react2.default.createElement(
                'div',
                { className: 'terra-CollapsibleButtonView-item', key: childKey },
                child
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'terra-CollapsibleButtonView-toggle' },
            toggle
          )
        ),
        hiddenSection
      );
    }
  }]);

  return CollapsibleButtonView;
}(_react2.default.Component);

CollapsibleButtonView.propTypes = propTypes;
CollapsibleButtonView.defaultProps = defaultProps;
CollapsibleButtonView.Item = _CollapsibleButtonItem2.default;
CollapsibleButtonView.Group = _CollapsibleButtonGroup2.default;

exports.default = CollapsibleButtonView;