// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    BuildTopicServicesRequestAction, BuildTopicServicesSuccessAction, BuildTopicServicesErrorAction,
    buildTopicServicesSuccessAction, buildTopicServicesErrorAction,
} from '../stores/services/actions';
import { serviceFromValidatedJSON, validateServicesAtLocationArray } from '../stores/services/validation';
import { searchServices, APIResponse } from '../api';
import { getDeviceLocation } from '../async/location';
import {
    isNoLocationPermissionError,
    isLocationFetchTimeoutError,
    isBadResponseError,
    isInvalidResponseData,
} from '../errors/is_error';
import { Errors } from '../errors/types';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(action: BuildTopicServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const maybeLocation = yield call(getDeviceLocation, action.payload.manualUserLocation);
        if (isNoLocationPermissionError(maybeLocation)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, maybeLocation.type),
            );
        }
        if (isLocationFetchTimeoutError(maybeLocation)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, maybeLocation.type),
            );
        }
        const response: APIResponse = yield call(searchServices, topicId, maybeLocation);
        if (isBadResponseError(response)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, Errors.BadServerResponse),
            );
        }
        const validator = validateServicesAtLocationArray(response.results);
        if (isInvalidResponseData(validator)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, Errors.InvalidServerData),
            );
        }
        yield put(
            buildTopicServicesSuccessAction(topicId, R.map(serviceFromValidatedJSON, response.results)),
        );
    } catch (error) {
        yield put(
            buildTopicServicesErrorAction(topicId, Errors.Exception),
        );
    }
}

type SuccessOrFailureResult = BuildTopicServicesSuccessAction | BuildTopicServicesErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;
