// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View, Button, Content, Text, Icon, Tab, Tabs, TabHeading, ListItem } from 'native-base';
import { Id as TaskId, ToggleCompletedAction, RemoveFromSavedListAction, AddToSavedListAction } from '../../stores/tasks';
import { Task } from '../../selectors/tasks';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { taskDetailStyles } from './styles';
import { Trans } from '@lingui/react';
import { Service, TaskServices} from '../../selectors/services';
import { UpdateTaskServicesAsync } from '../../stores/services';
import { ServiceComponent } from '../services/service';
import { RelatedTasksComponent } from './related_tasks';
import { RelatedArticlesComponent } from '../articles/related_articles';
import { getTaskState, TaskStates } from './task_states';
import { RouterProps } from '../../application/routing';

export interface TaskDetailProps {
    readonly task: Task;
    readonly savedTasks: ReadonlyArray<TaskId>;
    readonly taskServices: TaskServices;
}
export interface TaskDetailActions {
    readonly toggleCompleted: (taskId: TaskId) => ToggleCompletedAction;
    readonly addToSavedList: (taskId: TaskId) => AddToSavedListAction;
    readonly removeFromSavedList: (taskId: TaskId) => RemoveFromSavedListAction;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => UpdateTaskServicesAsync.Request;
}

type AllTaskDetailProps = TaskDetailProps & TaskDetailActions & TaskServiceUpdater & RouterProps;
type TabChangeEvent = { readonly i: number, from: number, readonly ref: React.Ref<Tabs> };

export class TaskDetailComponent extends React.Component<AllTaskDetailProps> {

    constructor(props: AllTaskDetailProps) {
        super(props);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <Content padder scrollEnabled={false} style={{ flex: 0, flexGrow: 0, flexShrink: 0, height: 'auto' }}>
                    {renderHeader(this.props)}
                </Content>
                <Tabs style={taskDetailStyles.tabs} onChangeTab={this.props.requestUpdateTaskServices}>
                    <Tab heading={<TabHeading><Text><Trans>INFORMATION</Trans></Text></TabHeading>}>
                        <Content padder>
                            <Grid style={taskDetailStyles.tabContent}>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='star-circle' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
                                        <Text>This task is <Text style={applicationStyles.bold}>recommended for you</Text>.</Text>
                                    </Col>
                                </Row>
                                <Row style={taskDetailStyles.row}>
                                    <Col size={10}>
                                        <Icon type='MaterialCommunityIcons' name='sign-text' />
                                    </Col>
                                    <Col size={90} style={taskDetailStyles.iconText}>
                                        <Text>This task helps with <Text style={applicationStyles.bold}>settling in</Text>.</Text>
                                    </Col>
                                </Row>
                                <Row style={taskDetailStyles.row}>
                                    <Text>You can get information about your community ...</Text>
                                </Row>
                                <RelatedArticlesComponent
                                    {...this.props}
                                    relatedArticles={this.props.task.relatedArticles}
                                />
                                <RelatedTasksComponent
                                    {...this.props}
                                    relatedTasks={this.props.task.relatedTasks}
                                    savedTasks={this.props.savedTasks}
                                />
                            </Grid>
                        </Content>
                    </Tab>
                    <Tab heading={<TabHeading><Text><Trans>FIND SERVICES</Trans></Text></TabHeading>}>
                        <FlatList
                            ListEmptyComponent={ServiceListEmpty}
                            refreshing={this.props.taskServices.loading}
                            onRefresh={this.props.requestUpdateTaskServices}
                            data={this.props.taskServices.services}
                            keyExtractor={(service: Service): string => service.id}
                            renderItem={renderServiceListItem} />
                    </Tab>
                </Tabs>
            </View>
        );
    }

    private onChangeTab({ i, from }: TabChangeEvent): void {
        if (from === 0 && i === 1) {
            this.props.requestUpdateTaskServices();
        }
    }

}

interface ServiceItemInfo extends ListRenderItemInfo<Service> {}

function ServiceListEmpty(): JSX.Element {
    return (
        <View style={{ padding: 20 }}>
            <Text><Trans>No related services found.</Trans></Text>
        </View>
    );
}

function renderHeader(props: AllTaskDetailProps): JSX.Element {
    const task = props.task;
    const taskState = getTaskState({
        inPlan: R.any((id: TaskId) => id === task.id, props.savedTasks),
        completed: task.completed,
    });

    const doneButton = (
        <Button iconLeft rounded light style={[{marginTop: 10}]}
                onPress={(): void => {props.toggleCompleted(task.id); props.removeFromSavedList(task.id); }}>
            <Icon name='checkbox' />
            <Text><Trans>Mark Done</Trans></Text>
        </Button>
    );
    const notDoneButton = (
        <Button iconLeft rounded light
                onPress={(): void => {props.toggleCompleted(task.id); props.addToSavedList(task.id); }}>
            <Icon name='close' />
            <Text><Trans>Not done</Trans></Text>
        </Button>
    );
    const removeFromPlanButton = (
        <Button iconLeft rounded light onPress={(): RemoveFromSavedListAction => props.removeFromSavedList(task.id)}>
            <Icon name='remove' />
            <Text><Trans>Remove from plan</Trans></Text>
        </Button>
    );
    const addToPlanButton = (
        <Button iconLeft rounded light onPress={(): AddToSavedListAction => props.addToSavedList(task.id)}>
            <Icon name='add' />
            <Text><Trans>Add to plan</Trans></Text>
        </Button>
    );

    switch (taskState) {
        case TaskStates.CompletedInPlan:
        case TaskStates.CompletedNotInPlan:
            return buildHeader(task.title, <Trans>COMPLETED TASK</Trans>, notDoneButton);
        case TaskStates.InProgress:
            return buildHeader(task.title, <Trans>TASK I PLAN TO DO</Trans>, <View>{removeFromPlanButton}{doneButton}</View>);
        case TaskStates.Available:
        default:
            return buildHeader(task.title, <Trans>AVAILABLE TASK</Trans>, addToPlanButton);
    }
}

function buildHeader(taskTitle: string, stateTitle: string | JSX.Element, stateButtons: JSX.Element): JSX.Element {
    return (
        <Grid>
            <Row>
                <Text style={[applicationStyles.bold, {marginBottom: 5}]}>{stateTitle}</Text>
            </Row>
            <Row>
                <Text>{taskTitle}</Text>
            </Row>
            <Row style={taskDetailStyles.actions}>
                <Col size={70}>
                    {stateButtons}
                </Col>
                <Col size={15}>
                    <Button dark transparent>
                        <Icon name='share' />
                    </Button>
                </Col>
                <Col size={15}>
                    <Button dark transparent>
                        <Icon name='more' />
                    </Button>
                </Col>
            </Row>
        </Grid>
    );
}

function renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
    return (
        <ListItem>
            <ServiceComponent service={item} />
        </ListItem>
    );
}
