import React from 'react';
import { View, Text, Button } from 'react-native';
import { Trans } from '@lingui/react';
import { LocaleDefinition } from '../../locale';
import { Locale } from '../../locale/types';

export interface Props {
    readonly currentLocale: Locale;
    readonly locales: ReadonlyArray<LocaleDefinition>;
}

export interface Actions {
    setLocale(locale: LocaleDefinition): void;
}

export type LanguageSwitcherProps = Props & Actions;

export const LanguageSwitcher = (props: LanguageSwitcherProps): JSX.Element => {
    const { currentLocale, locales, setLocale }: LanguageSwitcherProps = props;
    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                {locales.map((locale: LocaleDefinition) => (
                    <Button key={locale.code}
                            title={locale.label}
                            onPress={(): void => setLocale(locale)}
                            disabled={locale.code === currentLocale.code} />
                ))}
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={{textAlign: 'left'}}>
                    <Trans>This sentence exists to demonstrate the translation functionality that exists in this application.</Trans>
                </Text>
            </View>
        </View>
    );
};