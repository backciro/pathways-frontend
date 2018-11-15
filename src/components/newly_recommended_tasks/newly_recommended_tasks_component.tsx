import React from 'react';
import * as R from 'ramda';
import { Task } from '../../selectors/tasks/task';
import { View, Text, Button, Content, Icon } from 'native-base';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { Id } from '../../stores/tasks';
import { Trans } from '@lingui/react';
import { DismissNewlyAddedTasksPopupAction } from '../../stores/questionnaire/actions';
import { SaveTheseTasksToMyPlanAction } from '../../stores/tasks/actions';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { patWhiteBorderLogo } from '../../application/images';
import { stripMarkdown } from '../strip_markdown/strip_markdown';

export interface NewlyRecommendedTasksComponentProps {
    readonly showQuestionnairePopup: boolean;
    readonly newlyRecommendedTasks: ReadonlyArray<Task>;
}

export interface NewlyRecommendedTasksComponentActions {
    readonly saveToMyPlan: (tasks: ReadonlyArray<Id>) => SaveTheseTasksToMyPlanAction;
    readonly dismissPopup: () => DismissNewlyAddedTasksPopupAction;
}

type Props = NewlyRecommendedTasksComponentProps & NewlyRecommendedTasksComponentActions;

export const NewlyRecommendedTasksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {

    const showPopup = props.showQuestionnairePopup && R.not(R.isEmpty(props.newlyRecommendedTasks));

    if (!showPopup) {
        return <EmptyComponent />;
    }

    const tasks = props.newlyRecommendedTasks;
    const taskIds = R.map((task: Task): Id => task.id, tasks);
    const saveTasksToMyPlan = (): SaveTheseTasksToMyPlanAction => props.saveToMyPlan(taskIds);
    const dismissPopup = (): DismissNewlyAddedTasksPopupAction => props.dismissPopup();

    return <View style={styles.fadeout}>
        <View style={styles.dialog}>
            <HeaderComponent taskIds={taskIds} dismissPopup={dismissPopup}/>
            <HeaderContentComponent tasksCount={tasks.length} />
            <TaskListComponent tasks={tasks}/>
            <AddTasksButtonComponent saveTasksToMyPlan={saveTasksToMyPlan} />
        </View >
    </View>;
};

const HeaderComponent =
    (props: { readonly taskIds: ReadonlyArray<Id>, readonly dismissPopup: () => DismissNewlyAddedTasksPopupAction }): JSX.Element => {
    const patLogoSize = Dimensions.get('screen').width / 7;
    return (
        <View style={styles.header}>
            <View style={styles.headerImagesWrapper}>
                <Image
                    source={patWhiteBorderLogo}
                    resizeMode={'contain'}
                    style={{
                        width: patLogoSize,
                        height: patLogoSize,
                    }}
                />
                <TouchableOpacity onPress={props.dismissPopup}>
                    <Icon name='close' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const HeaderContentComponent = (props: { readonly tasksCount: number }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackLeft, styles.headerContent]}>
        <Trans>Number of new tasks recommended based on your answers:</Trans>
        <Text style={[textStyles.headlineH2StyleBlackLeft, styles.taskCount]}> {props.tasksCount}</Text>
    </Text>
);

const TaskListComponent = (props: { readonly tasks: ReadonlyArray<Task>}): JSX.Element => (
    <Content padder style={styles.taskList}>
        {R.map((task: Task) => (
            <TaskComponent key={task.id} task={task} />
        ), props.tasks)}
    </Content>
);

const TaskComponent = (props: { readonly task: Task }): JSX.Element => (
    <View
        style={{
            backgroundColor: colors.white,
            borderRadius: values.lessRoundedBorderRadius,
            padding: 10,
            marginVertical: 3,
        }}
    >
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View>
                    <Text numberOfLines={2} style={textStyles.headlineH4StyleBlackLeft}>
                        {props.task.title}
                    </Text>
                    <Text note numberOfLines={1} style={{ textAlign: 'left' }}>
                        {stripMarkdown(props.task.description)}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                {props.task.isRecommended ? <IsRecommendedComponent /> : <EmptyComponent />}
            </View>
        </View>
    </View>
);

const IsRecommendedComponent = (): JSX.Element => (
    <Icon style={{ fontSize: values.smallerIconSize, color: colors.sunYellow, marginRight: 3 }} name='star' type='FontAwesome' />
);

const AddTasksButtonComponent = (props: { readonly saveTasksToMyPlan: () => SaveTheseTasksToMyPlanAction }): JSX.Element => (
    <View style={styles.buttonWrapper}>
        <Button style={[applicationStyles.orangeButton, applicationStyles.boxShadowBelow]} onPress={props.saveTasksToMyPlan}>
            <Text style={textStyles.button}>
                <Trans>Add these tasks to My Plan</Trans>
            </Text>
        </Button>
    </View >
);

const styles = StyleSheet.create({
    fadeout: {
        backgroundColor: colors.darkGreyWithAlpha,
        position: 'absolute',
        top: getStatusBarHeightForPlatform(),
        bottom: 0,
        left: 0,
        right: 0,
    },
    dialog: {
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        padding: 10,
        position: 'absolute',
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
    },
    header: {
        marginTop: -20,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
        borderTopLeftRadius: values.lessRoundedBorderRadius,
        borderTopRightRadius: values.lessRoundedBorderRadius,
    },
    headerContent: {
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    headerImagesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    taskList: {
        backgroundColor: colors.lightGrey,
        marginHorizontal: -10,
        flex: 1,
        padding: 10,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
    },
    taskCount: {
        color: colors.topaz,
    },
});