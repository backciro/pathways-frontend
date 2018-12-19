// tslint:disable:no-class no-this no-expression-statement readonly-keyword
import React from 'react';
import * as R from 'ramda';
import { I18nManager, StyleSheet, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, colors, values, textStyles } from '../../application/styles';
import { CollapsibleContent } from '../collapsible_content/collapsible_content';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import {
    TaskListComponent,
    noTasksAddedYetTextComponent,
    noTasksRecommendedTextComponent,
} from '../tasks/task_list_component';
import { TaskListItemActions } from '../tasks/task_list_item_component';
import { Routes, goToRouteWithoutParameter, RouterProps } from '../../application/routing';
import { QuestionnairePocketComponent } from './questionnaire_pocket_component';
import { MyPlanIntroComponent } from './my_plan_intro_component';

export interface MyPlanProps {
    readonly savedTasks: ReadonlyArray<TaskListItem>;
    readonly recommendedTasks: ReadonlyArray<TaskListItem>;
}

interface MyPlanState {
    readonly savedTasksIsCollapsed: boolean;
    readonly recommendedTasksIsCollapsed: boolean;
    readonly questionnairePocketIsOpen: boolean;
}

type Props = MyPlanProps & TaskListItemActions & RouterProps;

export class MyPlanComponent extends React.Component<Props, MyPlanState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            savedTasksIsCollapsed: false,
            recommendedTasksIsCollapsed: false,
            questionnairePocketIsOpen: true,
        };
        this.toggleSavedTasksCollapsed = this.toggleSavedTasksCollapsed.bind(this);
        this.toggleRecommendedTasksCollapsed = this.toggleRecommendedTasksCollapsed.bind(this);
        this.onPocketPress = this.onPocketPress.bind(this);
        this.onPocketButtonPress = this.onPocketButtonPress.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
                <QuestionnairePocketComponent
                    isOpen={this.state.questionnairePocketIsOpen}
                    onPocketPress={this.onPocketPress}
                    onPocketButtonPress={this.onPocketButtonPress}
                />
                <ScrollView
                    style={[applicationStyles.body, { padding: values.contentPadding } ]}
                    onScroll={this.onScroll}
                    scrollEventThrottle={5}
                >
                    <MyPlanIntroComponent />
                    <CollapsibleContent
                        collapsedHeader={this.getHeading(this.getSavedTasksHeading(), this.collapsedIcon())}
                        expandedHeader={this.getHeading(this.getSavedTasksHeading(), this.expandedIcon())}
                        content={this.getContent(this.props.savedTasks, noTasksAddedYetTextComponent())}
                        onHeaderPress={this.toggleSavedTasksCollapsed}
                        isCollapsed={this.state.savedTasksIsCollapsed}
                        style={styles.clickableHeading}
                    />
                    <View style={styles.divider} />
                    <CollapsibleContent
                        collapsedHeader={this.getHeading(this.getRecommendedTasksHeading(), this.collapsedIcon())}
                        expandedHeader={this.getHeading(this.getRecommendedTasksHeading(), this.expandedIcon())}
                        content={this.getContent(this.props.recommendedTasks, noTasksRecommendedTextComponent())}
                        onHeaderPress={this.toggleRecommendedTasksCollapsed}
                        isCollapsed={this.state.recommendedTasksIsCollapsed}
                        style={styles.clickableHeading}
                    />
                    <View style={styles.divider} />
                </ScrollView>
            </View>
        );
    }

    private onPocketPress(): void {
        if (!this.state.questionnairePocketIsOpen) {
            this.setState({
                questionnairePocketIsOpen: true,
            });
        }
    }

    private onPocketButtonPress(): void {
        goToRouteWithoutParameter(Routes.Questionnaire, this.props.history)();
    }

    private onScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
        const eventScrollOffset = event.nativeEvent.contentOffset.y;
        if (eventScrollOffset > 50) {
            this.setState({
                questionnairePocketIsOpen: false,
            });
        } else {
            this.setState({
                questionnairePocketIsOpen: true,
            });
        }
    }

    private expandedIcon(): string {
        return 'arrow-dropdown';
    }

    private collapsedIcon(): string {
        return I18nManager.isRTL ? 'arrow-dropleft' : 'arrow-dropright';
    }

    private getSavedTasksHeading(): JSX.Element {
        return (
            <View>
                <Text style={textStyles.headlineH2StyleWhiteLeft}>
                    <Trans>BOOKMARKED TOPICS</Trans>
                </Text>
            </View>
        );
    }

    private getRecommendedTasksHeading(): JSX.Element {
        return (
            <View style={styles.recommendedTasksHeading}>
                <Text style={textStyles.headlineH2StyleWhiteLeft}>
                    <Trans>RECOMMENDED FOR ME</Trans>
                </Text>
                <Icon style={styles.headingYellowStar} name='star' type='FontAwesome' />
            </View>
        );
    }

    private getHeading(heading: JSX.Element, icon: string): JSX.Element {
        return (
            <View style={styles.heading}>
                {heading}
                <Icon style={styles.headingIcon} name={icon} />
            </View>
        );
    }

    private getContent(tasks: ReadonlyArray<TaskListItem>, emptyTaskListComponent: JSX.Element): JSX.Element {
        return (
            <TaskListComponent
                {...this.props}
                tasks={tasks}
                emptyTaskListComponent={emptyTaskListComponent}
                savedTasksIdList={R.map((item: TaskListItem) => item.id, this.props.savedTasks)}
            />
        );
    }

    private toggleSavedTasksCollapsed(): void {
        this.setState({ ...this.state, savedTasksIsCollapsed: !this.state.savedTasksIsCollapsed });
    }

    private toggleRecommendedTasksCollapsed(): void {
        this.setState({ ...this.state, recommendedTasksIsCollapsed: !this.state.recommendedTasksIsCollapsed });
    }
}

const styles = StyleSheet.create({
    intro: {
        marginBottom: 10,
    },
    clickableHeading: {
        backgroundColor: colors.topaz,
        padding: 10,
        borderRadius: values.lessRoundedBorderRadius,
        marginBottom: 3,
    },
    recommendedTasksHeading: {
        flexDirection: 'row',
    },
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingIcon: {
        fontSize: values.smallIconSize,
        color: colors.white,
    },
    headingYellowStar: {
        fontSize: values.smallerIconSize,
        color: colors.sunYellow,
        marginLeft: 3,
    },
    divider: {
        marginVertical: 5,
    },
});