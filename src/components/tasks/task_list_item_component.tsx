import React from 'react';
import { View, Text, Icon } from 'native-base';
import { values, colors, textStyles } from '../../application/styles';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { AddToSavedListAction, RemoveFromSavedListAction, Id } from '../../stores/tasks';
import { I18nManager, TouchableOpacity } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { ListItemBookmarkComponent } from '../tasks/bookmark_button_component';

export interface TaskListItemProps {
    readonly task: TaskListItem;
    readonly savedTasksIdList: ReadonlyArray<Id>;
}

export interface TaskListItemActions {
    readonly addToSavedList: (taskId: Id) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: Id) => RemoveFromSavedListAction;
    readonly goToTaskDetail: () => void;
}

type Props = TaskListItemProps & TaskListItemActions;

export const TaskListItemComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const taskDescription = stripMarkdown(props.task.description);
    return (
        <TouchableOpacity
            onPress={props.goToTaskDetail}
            style={{
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                padding: 10,
                marginVertical: 3,
            }}
        >
            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ marginRight: 20 }}>
                        <ListItemBookmarkComponent
                            taskId={props.task.id}
                            savedTasksIdList={props.savedTasksIdList}
                            addBookmark={props.addToSavedList}
                            removeBookmark={props.removeFromSavedList}
                        />
                    </View>
                    <View>
                        <Text numberOfLines={2} style={textStyles.headlineH4StyleBlackLeft}>
                            {props.task.title}
                        </Text>
                        <Text note numberOfLines={1} style={{ textAlign: 'left' }}>
                            {taskDescription}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {props.task.isRecommended ? <IsRecommendedComponent /> : <EmptyComponent />}
                    <Icon style={{ fontSize: values.smallIconSize }} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const IsRecommendedComponent = (): JSX.Element => (
    <Icon style={{ fontSize: values.smallerIconSize, color: colors.sunYellow, marginRight: 3 }} name='star' type='FontAwesome' />
);
