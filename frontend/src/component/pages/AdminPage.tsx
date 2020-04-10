import React, { Component, ReactElement, RefObject } from 'react';

import './AdminPage.scss';
import { Drawer } from '../ui/Drawer';
import { Icon, IconID } from '../ui/Icon';
import { Navigation } from '../ui/Navigation';
import { Tabs } from '../ui/Tabs';

interface IProps {}

interface IState {
  isMenuOpen: boolean;
}

export class AdminPage extends Component<IProps, IState> {
  private menuIconRef = React.createRef<Icon>();
  private drawerRef = React.createRef<Drawer>();
  private tabsRef = React.createRef<Tabs>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      isMenuOpen: true
    };
  }

  render() {
    return (
      <div className={'admin-page'}>
        <header>
          <div className={'menu-button'}>
            <Icon
              ref={this.menuIconRef}
              defaultIconID={IconID.MenuOpen}
              onClick={this.handleMenuIconClick}
            />
          </div>
          <div id={'logo'}>
            <div className={'short'}>Short</div>
            <div className={'admin'}>Admin</div>
          </div>
        </header>
        <div className={'content'}>
          <Drawer ref={this.drawerRef} renderDrawerView={this.renderDrawer}>
            <Tabs ref={this.tabsRef} defaultTabIdx={0}>
              <div className={'tab'}>Tab 1</div>
              <div className={'tab'}>Tab 2</div>
              <div className={'tab'}>Tab 3</div>
            </Tabs>
          </Drawer>
        </div>
      </div>
    );
  }

  handleMenuIconClick = () => {
    const { isMenuOpen } = this.state;

    if (isMenuOpen) {
      this.setIcon(this.menuIconRef, IconID.Menu);
      this.closeDrawer();
      this.setState({ isMenuOpen: false });
      return;
    }

    this.setIcon(this.menuIconRef, IconID.MenuOpen);
    this.openDrawer();
    this.setState({ isMenuOpen: true });
  };

  setIcon(iconRef: RefObject<Icon>, iconID: IconID) {
    if (!iconRef || !iconRef.current) {
      return;
    }
    iconRef.current.setIcon(iconID);
  }

  openDrawer = () => {
    if (!this.drawerRef || !this.drawerRef.current) {
      return;
    }
    this.drawerRef.current.open();
  };

  closeDrawer = () => {
    if (!this.drawerRef || !this.drawerRef.current) {
      return;
    }
    this.drawerRef.current.close();
  };

  handleMenuItemSelected = (selectItemIdx: number) => {
    if (!this.tabsRef || !this.tabsRef.current) {
      return;
    }
    this.tabsRef.current.showTab(selectItemIdx);
  };

  renderDrawer = (): ReactElement => {
    return (
      <Navigation
        defaultMenuItemIdx={0}
        menuItems={['Dashboard', 'Change Log', 'User']}
        onMenuItemSelected={this.handleMenuItemSelected}
      />
    );
  };
}
