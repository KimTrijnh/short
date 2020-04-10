import React, { Component, ReactElement } from 'react';

import './Drawer.scss';
import classNames from 'classnames';

interface IProps {
  renderDrawerView: () => ReactElement;
}

interface IState {
  isOpen: boolean;
}

export class Drawer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  open() {
    this.setState({ isOpen: true });
  }

  close() {
    this.setState({ isOpen: false });
  }

  render() {
    const isOpen = this.state.isOpen;
    return (
      <div className={'drawer-layout'}>
        <div
          className={classNames({
            drawer: true,
            open: isOpen
          })}
        >
          {this.props.renderDrawerView()}
        </div>
        <div className={'main-content'}>{this.props.children}</div>
      </div>
    );
  }
}
