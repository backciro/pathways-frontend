// tslint:disable:no-class readonly-keyword readonly-array no-expression-statement no-this

import { Id as AnswerId } from '../../../stores/questionnaire/index';
import { Id as TaskId } from '../../../stores/tasks';
import { PersistedUserData } from '../../user_data/persisted_user_data';

export class PersistedUserDataBuilder {
    chosenAnswers: AnswerId[] = [];
    savedTasks: TaskId[] = [];

    addChosenAnswer(id: AnswerId): PersistedUserDataBuilder {
        this.chosenAnswers.push(id);
        return this;
    }

    addSavedTask(id: TaskId): PersistedUserDataBuilder {
        this.savedTasks.push(id);
        return this;
    }

    buildObject(): PersistedUserData {
        return {
            chosenAnswers: this.chosenAnswers,
            savedTasks: this.savedTasks,
        };
    }

    buildJson(): string {
        return JSON.stringify(this.buildObject());
    }
}
