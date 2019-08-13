import { Service } from '../../stores/services';
import { AsyncErrors } from '../../async/errors';

export interface ValidSelectorTopicServices {
    readonly services: ReadonlyArray<Service>;
    readonly type: 'ServicesForTopic:Valid';
}

export interface LoadingSelectorTopicServices {
    readonly type: 'ServicesForTopic:Loading';
}

export interface ErrorSelectorTopicServices {
    readonly errorMessageType: AsyncErrors;
    readonly type: 'ServicesForTopic:Error';
}

export type SelectorTopicServices = ValidSelectorTopicServices | LoadingSelectorTopicServices | ErrorSelectorTopicServices;
