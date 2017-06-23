import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'terra-popup';
import Button from 'terra-button';
import ExamplePopupContent from '../popup/ExamplePopupContent';

const propTypes = {
  onFocusGain: PropTypes.func,
  onFocusLoss: PropTypes.func,
};

class PopupStandard extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.setButtonNode = this.setButtonNode.bind(this);
    this.getButtonNode = this.getButtonNode.bind(this);
    this.state = { open: false };
  }

  setButtonNode(node) {
    this.buttonNode = node;
  }

  getButtonNode() {
    return this.buttonNode;
  }

  handleButtonClick() {
    this.setState({ open: true });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleOnChange() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }} ref={this.setButtonNode}>
        <Popup
          isOpen={this.state.open}
          targetRef={this.getButtonNode}
          onRequestClose={this.handleRequestClose}
          onFocusGain={this.props.onFocusGain}
          onFocusLoss={this.props.onFocusLoss}
        >
          <ExamplePopupContent onChange={this.handleOnChange} />
        </Popup>
        <Button text="Default Popup" onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default PopupStandard;
