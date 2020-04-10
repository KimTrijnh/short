import React, { Component } from 'react';

interface IProps {
  defaultTabIdx: number;
}

interface IState {
  currentTabIdx: number;
}

export class Tabs extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentTabIdx: props.defaultTabIdx
    };
  }

  showTab(tabIdx: number) {
    this.setState({
      currentTabIdx: tabIdx
    });
  }

  render = () => {
    if (!this.props.children) {
      return <div />;
    }
    const children = React.Children.toArray(this.props.children);
    if (children.length < 1) {
      return <div />;
    }
    const currentTabIdx = Math.min(
      children.length - 1,
      this.state.currentTabIdx
    );
    return children[currentTabIdx];
  };
}
