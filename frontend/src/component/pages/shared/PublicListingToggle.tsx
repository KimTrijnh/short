import React, { Component } from "react";
import { Toggle } from "../../ui/Toggle";

interface IProps {
    onToggleClick?: (enabled: boolean) => void;
}


export class PublicListingToggle extends Component<IProps> {
    handleToggleClick(enabled: boolean): void {
        if (!this.props.onToggleClick) {
            return;
        }
        this.props.onToggleClick(enabled);
    }

    render() {
        return (
            <div className={'creation-toggle'}>
                <Toggle
                    defaultIsEnabled={false}
                    // onClick={this.props.onToggleClick}/>
                    onClick={this.handleToggleClick.bind(this)} />
                <span className={'toggle-label'}>
                    Share on <span>public feed</span>
                </span>
            </div>
        );
    }
}