// tslint:disable:no-expression-statement no-let

import { TaskBuilder, buildNormalizedStore } from './helpers/tasks_helpers';
import * as stores from '../topics';
import { aString, aBoolean } from '../../application/__tests__/helpers/random_test_values';

describe('tasks test helpers', () => {

    describe('building the task', () => {

        test('id property', () => {
            const id = aString();
            const task = new TaskBuilder().withId(id).build();
            expect(task.id).toBe(id);
        });

        test('title property', () => {
            const localeCode = aString();
            const title = aString();
            const task = new TaskBuilder().withLocaleCode(localeCode).withTitle(title).build();
            expect(task.title[localeCode]).toBe(title);
        });

        test('description property', () => {
            const localeCode = aString();
            const description = aString();
            const task = new TaskBuilder().withLocaleCode(localeCode).withDescription(description).build();
            expect(task.description[localeCode]).toBe(description);
        });

        test('completed property', () => {
            const completed = aBoolean();
            const task = new TaskBuilder().withCompleted(completed).build();
            expect(task.completed).toBe(completed);
        });
    });

    describe('the store', () => {

        describe('building a normalized store', () => {
            let firstTaskBuilder: TaskBuilder;
            let secondTaskBuilder: TaskBuilder;
            let validStore: stores.ValidTaskStore;

            beforeEach(() => {
                firstTaskBuilder = new TaskBuilder();
                secondTaskBuilder = new TaskBuilder();
                validStore = buildNormalizedStore(
                    [firstTaskBuilder, secondTaskBuilder],
                    [firstTaskBuilder.build().id],
                );
            });

            test('task map property', () => {
                expect(validStore).toHaveProperty('taskMap');
            });

            test('saved tasks list property', () => {
                expect(validStore).toHaveProperty('savedTasksList');
            });

            test('tasks map keys are expected task ids', () => {
                expect(Object.keys(validStore.taskMap)).toEqual([firstTaskBuilder.build().id, secondTaskBuilder.build().id]);
            });

        });
    });
});
