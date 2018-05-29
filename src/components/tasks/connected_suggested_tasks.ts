import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Component, Props, renderSuggestedTask } from './task_list';
import { Actions } from './task';
import { Store } from '../../application/store';
import { selectAllSuggestedTasks } from '../../selectors/tasks';
import * as stores from '../../stores/tasks';

const mapStateToProps = (store: Store): Props => ({
    tasks: selectAllSuggestedTasks(store.applicationState.tasksInStore),
    taskRenderer: renderSuggestedTask,
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): Actions => ({
    addToSavedList: (taskId: stores.Id): stores.AddToSavedListAction => dispatch(stores.addToSavedList(taskId)),
    shareTask: (): stores.ShareAction => dispatch(stores.share()),
});

export const ConnectedSuggestedTasks = connect(mapStateToProps, mapDispatchToProps)(Component);
