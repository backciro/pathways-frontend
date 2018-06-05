// tslint:disable:no-expression-statement
import { LocaleManager } from '../';
import { aString } from '../../../application/__tests__/helpers/random_test_values';
import { buildLocale } from '../../../stores/__tests__/helpers/locale_helpers';

describe('LocaleManager', () => {

    describe('before .registerLocales() is called', () => {

        it('.get() should throw an error', () => {
            expect(() => LocaleManager.get(aString())).toThrow();
        });

        it('.locales should throw an error', () => {
            expect(() => LocaleManager.locales).toThrow();
        });

        it('.catalogsMap should throw an error', () => {
            expect(() => LocaleManager.catalogsMap).toThrow();
        });

    });

    describe('.registerLocales()', () => {

        const aLocale = buildLocale().get();

        afterEach(() => {
            LocaleManager.reset();
        });

        it('should return the LocaleManager', () => {
            expect(LocaleManager.registerLocale(aLocale)).toBe(LocaleManager);
        });

        it('should throw an error if called twice', () => {
            expect(LocaleManager.registerLocale(aLocale)).toBe(LocaleManager);
            expect(() => LocaleManager.registerLocale(aLocale)).toThrow();
        });

    });

    describe('with locales registered', () => {

        const aLocale = buildLocale().get();

        beforeAll(() => {
            LocaleManager.registerLocale(aLocale);
        });

        it('.get() should return a locale when given a known locale code', () => {
            expect(LocaleManager.get(aLocale.code)).toBe(aLocale);
        });

        it('.get() should throw an error if given an unknown locale code', () => {
            expect(() => LocaleManager.get(aString())).toThrow();
        });

        it('.locales should be an array of the known locales', () => {
            expect(LocaleManager.locales).toEqual([aLocale]);
        });

        it('.catalogsMap should be a map of the known locale catalogs keyed by locale code', () => {
            expect(LocaleManager.catalogsMap).toEqual({ [aLocale.code]: aLocale.catalog });
        });

    });

});