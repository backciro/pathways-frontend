import { ErrorServicesForTopic } from '../../stores/services';
import { ErrorSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toErrorSelectorTaskServices = (taskServicesError: ErrorServicesForTopic):
    ErrorSelectorTopicServices => ({
        errorMessageType: taskServicesError.errorMessageType,
        type: constants.TOPIC_SERVICES_ERROR,
    });