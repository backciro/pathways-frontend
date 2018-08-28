import { Task } from '../tasks/task';
import R from 'ramda';

export const createRelatedServicesQueryFromTask = (task: Task): string => (
    task.serviceQuery !== '' ? task.serviceQuery : hackyAutogeneratedQuery(task)
);

const hackyAutogeneratedQuery = (task: Task): string => (
    R.take(3, task.title.split(' ')).join(',')
);
