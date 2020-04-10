import React, { Component } from 'react';

import './Navigation.scss';
import classNames from 'classnames';

interface IProps {
  defaultMenuItemIdx: number;
  menuItems: string[];
  onMenuItemSelected: (selectedMenuItemIdx: number) => void;
}

interface IState {
  selectedMenuItemIdx: number;
}

export class Navigation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedMenuItemIdx: props.defaultMenuItemIdx
    };
  }

  render() {
    return (
      <div className={'navigation'}>
        <ul className={'menu'}>{this.renderMenuItems()}</ul>
      </div>
    );
  }

  renderMenuItems = () => {
    return this.props.menuItems.map((menuItem: string, idx: number) => (
      <li
        className={classNames({
          active: idx === this.state.selectedMenuItemIdx
        })}
        onClick={this.handlerOnMenuItemClick(idx)}
      >
        {menuItem}
      </li>
    ));
  };

  handlerOnMenuItemClick = (idx: number) => {
    return () => {
      this.setState({
        selectedMenuItemIdx: idx
      });
      this.props.onMenuItemSelected(idx);
    };
  };
}
