// tslint:disable:no-expression-statement no-string-literal no-let typedef
import { readFileSync, existsSync } from 'fs';
import { EOL } from 'os';
import * as R from 'ramda';

describe('version id in VERSION.txt', () => {
    let version = '';
    beforeEach(() => {
        version = readFileSync('VERSION.txt').toString().trim();
    });

    it('matches with version id in app.json', () => {

        const filename = 'app.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);

        expect(json['expo']['version']).toBe(version);
    });

    it('matches with version id in .env', () => {

        const filename = '.env';
        if (existsSync(filename)) {
            const content = readFileSync(filename).toString();
            const lines = content.split(EOL);
            const versionLine = R.head(R.filter(line => line.startsWith('VERSION'), lines));

            expect(versionLine).toBe(`VERSION=${version}`);
        }
    });

    it('matches with version id environment variable', () => {
        if (process.env.VERSION) {
            expect(process.env.VERSION).toBe(version);
        }
    });

    it('matches with version id in package.json', () => {

        const filename = 'package.json';
        const content = readFileSync(filename).toString();
        const json = JSON.parse(content);

        expect(json['version']).toBe(version);
    });
});
