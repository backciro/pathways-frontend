import React from 'react';

import PropTypes from 'prop-types';

import ServiceMapView from 'views/ServiceMapView';

import AppViewContainer_Dialog from 'ui-components/AppViewContainer_Dialog';

import {PaperCard} from 'polymer/paper-card';
import {PaperIconButton} from 'polymer/paper-icon-button';
import {PaperCheckbox} from 'polymer/paper-checkbox';
import {IronCollapse} from 'polymer/iron-collapse';
import {IronIcon} from 'polymer/iron-icon';
import {PaperRipple} from 'polymer/paper-ripple';

export default class PathwayActionCard extends React.PureComponent {
    static propTypes = {
        actionId: PropTypes.number.isRequired,
        opened: PropTypes.bool.isRequired,
        onSelect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            showDialog: false
        };
    }

    render() {
        const {opened} = this.props;
        const {completed, showDialog} = this.state;

        const label = "Pathway action";

        const toggleIcon = (opened) ? 'icons:expand-less' : 'icons:expand-more';

        const classes = ['pathway-action-item'];
        if (opened) classes.push('opened');
        if (completed) classes.push('completed');

        const searchDialog = (
            <AppViewContainer_Dialog
                appView={<ServiceMapView initialSearch={{what: 'EMPLOYMENT'}} />}
                isOpen={showDialog}
                onRequestClose={this._onDialogRequestClose.bind(this)}
            />
        );

        return (
            <PaperCard className={classes.join(' ')} elevation={(opened) ? 2 : 1}>
                <div className="card-content">
                    <div className="pathway-action-item--main">
                        <div className="pathway-action-item--checkbox">
                            <PaperCheckbox checked={completed} onChange={this._onCheckboxChange.bind(this)} />
                        </div>
                        <div className="pathway-action-item--header interactive" onClick={this._onMainClick.bind(this)}>
                            <span className="pathway-action-item--label">{label}</span>
                            <IronIcon className="pathway-action-item--toggle" icon={toggleIcon} />
                            <PaperRipple />
                        </div>
                    </div>
                </div>
                <IronCollapse opened={opened} className="card-actions">
                    <div className="pathway-action-item--actions">
                        <PaperIconButton icon="icons:search" onClick={this._onMapSearchClick.bind(this)} />
                        <PaperIconButton icon="icons:list" onClick={this._onListSearchClick.bind(this)} />
                        <PaperIconButton icon="icons:alarm" onClick={this._onAlarmClick.bind(this)} />
                    </div>
                </IronCollapse>
                {searchDialog}
            </PaperCard>
        );
    }

    _onMainClick() {
        const {actionId, opened, onSelect} = this.props;
        if (onSelect) onSelect(opened ? undefined : actionId);
    }

    _onCheckboxChange() {
        this.setState({completed: !this.state.completed});
    }

    _onMapSearchClick(e) {
        e.preventDefault();
        this.setState({showDialog: true});
    }

    _onListSearchClick(e) {
        e.preventDefault();
        this.setState({showDialog: true});
    }

    _onAlarmClick(e) {
        e.preventDefault();
        alert("🤖 Beep. Beep. Beep. 🤖");
    }

    _onDialogRequestClose() {
        this.setState({showDialog: false});
    }
}
