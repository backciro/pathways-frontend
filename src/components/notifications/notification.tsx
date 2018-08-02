// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import { StyleSheet } from 'react-native';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { Notification } from '../../selectors/notifications';
import { NotificationParameters } from './notifications';
import { NotificationType } from '../../stores/notifications';
import { colors } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';

export interface NotificationProps {
    readonly notification: Notification;
    readonly notificationParameters: NotificationParameters;
}
export interface NotificationActions {
    readonly timeElapsedCallback: () => void;
}
type Props = NotificationProps & NotificationActions;

export class NotificationComponent extends React.Component<Props> {
    timer: number;
    defaultMilliSeconds: number = 1500;

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.props.timeElapsedCallback();
        }, this.defaultMilliSeconds);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    render(): JSX.Element {
        const shouldRender = this.shouldRenderContentForNotification();
        return shouldRender ?  this.renderNotification() : <EmptyComponent/>;
    }

    private shouldRenderContentForNotification(): boolean {
        switch (this.props.notification.type) {
            default:
            case NotificationType.TaskAddedToPlan:
                return true;
            case NotificationType.QuestionAnswered:
                return this.props.notificationParameters.recommendedTasks.length > 0;
        }
    }

    private renderNotification(): JSX.Element {
        const style = styles.stackedContent;
        return (<View style={style}>{this.renderContentForNotification()}</View>);
    }

    private renderContentForNotification(): JSX.Element {
        switch (this.props.notification.type) {
            default:
            case NotificationType.TaskAddedToPlan:
                return this.renderContentForTaskAddNotification();
            case NotificationType.QuestionAnswered:
                return this.renderContentForSuggestedTasksNotification();
        }
    }

    private renderContentForTaskAddNotification(): JSX.Element {
        return (
            <Text style={[styles.messageText]}>
                <Trans>Task added to plan</Trans>
            </Text>
        );
    }

    private renderContentForSuggestedTasksNotification(): JSX.Element {
        const taskCount = this.props.notificationParameters.recommendedTasks.length;
        return (
            <Text style={[styles.messageText]}>
                <Trans>You have</Trans>
                <Text style={[styles.messageText]}> {taskCount} </Text>
                {taskCount === 1 ? <Trans>recommended task</Trans> : <Trans>recommended tasks</Trans>}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    stackedContent: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkGrey,
        flex: 1,
        position: 'absolute',
        padding: 10,
        bottom: 20,
        left: 0,
        right: 0,
    },
    messageText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
