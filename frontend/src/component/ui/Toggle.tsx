import React, { Component } from 'react';

import './Toggle.scss';
import classNames from 'classnames';

interface Props {
  defaultIsEnabled: boolean;
  onClick?: (enabled: boolean) => void;
}

interface State {
  enabled: boolean;
  // buttonClassName: string;
  // backgroundClassName: string;
}

export class Toggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log("Init!");
    this.state = {
      enabled: props.defaultIsEnabled
    };
  }

  handleClick = () => {
    this.setState({
      enabled: !this.state.enabled
    }, () => {
        const { enabled } = this.state;
        console.log("will this work? ->", enabled);
      if (!this.props.onClick) {
        return;
      }
      this.props.onClick(enabled);
    });
  };

  render() {
    const { enabled } = this.state;
    return (
      <div className={'toggle'}>
        <div
          className={classNames({
            'background': true,
            'active': enabled
          })}
          onClick={this.handleClick}
        >
          <div className={classNames({
            'knob': true,
            'active': enabled
          })}/>
        </div>
      </div>
    );
  }
}
