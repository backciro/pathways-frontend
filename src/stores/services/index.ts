import { LocalizedText } from '../../locale';

import { Id, Service, Store, ServiceMap, TaskServices } from './types';
import { UpdateTaskServicesAsync, updateTaskServicesAsync } from './update_task_services';
import { Task as constants } from '../../application/constants';
import { Action } from 'redux';

export { Id, Service, Store };
export { UpdateTaskServicesAsync, updateTaskServicesAsync };

export function serviceFromServiceData(data: any): Service { // tslint:disable-line:no-any
    // TODO: Perform appropriate data validation.
    //       Alternatively bring in a tool to do this for us, eg: Serializr
    const id: string = data.id || undefined;
    // TODO: Determine how to handle localization from the API.
    // TODO: Hard-coding 'en' for the meantime.
    const name: LocalizedText = { 'en': data.name || '' };
    const description: LocalizedText = { 'en': data.description || '' };
    return { id, name, description };
}

function buildDefaultStore(): Store {
    return {
        serviceMap: {},
        taskServicesMap: {},
    };
}

export function buildDefaultTaskServices(): TaskServices {
    return {
        loading: false,
        message: '',
        serviceIds: [],
    };
}

export function reducer(store: Store = buildDefaultStore(), action: Action): Store {
    switch (action.type) {
        case constants.UPDATE_SERVICES_REQUEST:
            return updateServicesRequest(store, action as UpdateTaskServicesAsync.Request);
        case constants.UPDATE_SERVICES_SUCCESS:
            return updateServicesSuccess(store, action as UpdateTaskServicesAsync.Success);
        case constants.UPDATE_SERVICES_FAILURE:
            return updateServicesFailure(store, action as UpdateTaskServicesAsync.Failure);
        default:
            return store;
    }
}

function updateServicesRequest(store: Store, action: UpdateTaskServicesAsync.Request): Store {
    const taskId = action.payload.taskId;
    const taskServices = store.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...taskServices, message: '', loading: true },
        },
    };
}

function updateServicesSuccess(store: Store, action: UpdateTaskServicesAsync.Success): Store {
    const services = action.payload.services;
    const taskId = action.payload.taskId;
    const serviceMap = createServiceMap(services);
    const serviceIds = Object.keys(serviceMap);
    const taskServicesMap = { [taskId]: { ...store.taskServicesMap[taskId], serviceIds, loading: false } };
    return {
        ...store,
        serviceMap: { ...store.serviceMap, ...serviceMap },
        taskServicesMap: { ...store.taskServicesMap, ...taskServicesMap },
    };
}

function updateServicesFailure(store: Store, action: UpdateTaskServicesAsync.Failure): Store {
    const taskId = action.payload.taskId;
    const message = action.payload.message;
    return {
        ...store,
        taskServicesMap: {
            ...store.taskServicesMap,
            [taskId]: { ...store.taskServicesMap[taskId], message, loading: false },
        },
    };
}

function createServiceMap(services: ReadonlyArray<Service>): ServiceMap {
    const theReducer = (serviceMap: ServiceMap, service: Service): ServiceMap => {
        return { ...serviceMap, [service.id]: service };
    };
    return services.reduce(theReducer, {});
}