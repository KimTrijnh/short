import React, { ReactElement } from 'react';
import { App } from './App';
import { IFeatureDecisionService } from '../service/feature-decision/FeatureDecision.service';
import { Home } from './pages/Home';
import H from 'history';
import { AuthService } from '../service/Auth.service';
import { IBrowserExtensionService } from '../service/extensionService/BrowserExtension.service';
import { QrCodeService } from '../service/QrCode.service';
import { VersionService } from '../service/Version.service';
import { GoogleSignInButton } from './pages/shared/sign-in/GoogleSignInButton';
import { GithubSignInButton } from './pages/shared/sign-in/GithubSignInButton';
import { FacebookSignInButton } from './pages/shared/sign-in/FacebookSignInButton';
import { Store } from 'redux';
import { IAppState } from '../state/reducers';
import { ErrorService } from '../service/Error.service';
import { UrlService } from '../service/Url.service';
import { SearchService } from '../service/Search.service';
import { SearchBar } from './ui/SearchBar';
import { ViewChangeLogButton } from './ui/ViewChangeLogButton';
import { ChangeLogService } from '../service/ChangeLog.service';
import { IClipboardService } from '../service/clipboardService/Clipboard.service';
import { PublicListingToggle } from './pages/shared/PublicListingToggle';

export class UIFactory {
  constructor(
    private authService: AuthService,
    private clipboardService: IClipboardService,
    private extensionService: IBrowserExtensionService,
    private urlService: UrlService,
    private qrCodeService: QrCodeService,
    private versionService: VersionService,
    private errorService: ErrorService,
    private searchService: SearchService,
    private changeLogService: ChangeLogService,
    private store: Store<IAppState>,
    private featureDecisionService: IFeatureDecisionService
  ) {}

  public createHomePage(location: H.Location<any>): ReactElement {
    return (
      <Home
        uiFactory={this}
        authService={this.authService}
        clipboardService={this.clipboardService}
        extensionService={this.extensionService}
        qrCodeService={this.qrCodeService}
        versionService={this.versionService}
        urlService={this.urlService}
        errorService={this.errorService}
        searchService={this.searchService}
        changeLogService={this.changeLogService}
        store={this.store}
        location={location}
      />
    );
  }

  public createViewChangeLogButton(props: any): ReactElement {
    const decision = this.featureDecisionService.includeViewChangeLogButton();
    const ToggledComponent = withFeatureToggle(ViewChangeLogButton, decision);
    return <ToggledComponent onClick={props.onClick} />;
  }

  public createSearchBar(props: any): ReactElement {
    const decision = this.featureDecisionService.includeSearchBar();
    const ToggledComponent = withFeatureToggle(SearchBar, decision);
    return <ToggledComponent {...props} />;
  }

  public createGoogleSignInButton(): ReactElement {
    const decision = this.featureDecisionService.includeGoogleSignButton();
    const ToggledComponent = withFeatureToggle(GoogleSignInButton, decision);
    return (
      <ToggledComponent
        googleSignInLink={this.authService.googleSignInLink()}
      />
    );
  }

  public createGithubSignInButton(): ReactElement {
    const decision = this.featureDecisionService.includeGithubSignButton();
    const ToggledComponent = withFeatureToggle(GithubSignInButton, decision);
    return (
      <ToggledComponent
        githubSignInLink={this.authService.githubSignInLink()}
      />
    );
  }

  public createFacebookSignInButton(): ReactElement {
    const decision = this.featureDecisionService.includeFacebookSignButton();
    const ToggledComponent = withFeatureToggle(FacebookSignInButton, decision);
    return (
      <ToggledComponent
        facebookSignInLink={this.authService.facebookSignInLink()}
      />
    );
  }

  public createPublicListingToggle(props: any): ReactElement {
    const decision = this.featureDecisionService.includePublicListingToggle();
    const ToggledComponent = withFeatureToggle(PublicListingToggle, decision);
    return (
      <ToggledComponent
        isShortLinkPublic={props.isShortLinkPublic}
        onToggleClick={props.onPublicToggleClick}
      />
    );
  }

  public createApp(): ReactElement {
    return <App uiFactory={this} urlService={this.urlService} />;
  }
}

function withFeatureToggle(
  WrappedComponent: React.ComponentType<any>,
  featureDecision: Promise<boolean>
) {
  interface IState {
    isFeatureEnabled: boolean;
  }

  return class extends React.Component<any, IState> {
    private isComponentMounted: boolean;

    constructor(props: any) {
      super(props);
      this.state = {
        isFeatureEnabled: false
      };
      this.isComponentMounted = false;
    }

    componentDidMount(): void {
      this.isComponentMounted = true;

      featureDecision.then(decision => {
        if (!this.isComponentMounted) {
          return;
        }
        this.setState({ isFeatureEnabled: decision });
      });
    }

    componentWillUnmount(): void {
      this.isComponentMounted = false;
    }

    render() {
      const { isFeatureEnabled } = this.state;
      if (!isFeatureEnabled) {
        return <div />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}
