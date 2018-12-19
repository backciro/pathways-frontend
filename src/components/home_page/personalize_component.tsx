import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View, Button } from 'native-base';
import { Image, Dimensions } from 'react-native';
import { applicationStyles, colors, values, textStyles } from '../../application/styles';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { History } from 'history';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

export interface PersonalizeProps {
    readonly history: History;
}

export const PersonalizeComponent: React.StatelessComponent<PersonalizeProps> = (props: PersonalizeProps): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 6;
    return (
        <View style={[
            applicationStyles.boxShadowBelow,
            {
                backgroundColor: colors.orange,
                borderRadius: values.lessRoundedBorderRadius,
                padding: 20,
                marginBottom: 15,
            },
        ]}>
            <View style={{ flex: 4, flexDirection: 'row', marginBottom: 15 }}>
                <View style={{ flex: 3 }}>
                    <Text style={textStyles.headlineH2StyleWhiteLeft}>
                        <Trans>Personalize My Plan</Trans>
                    </Text>
                    <Text style={textStyles.paragraphStyleWhiteleft}>
                        <Trans>Get recommended tasks and services for settling in Canada </Trans>
                    </Text>
                </View>
                <Image
                    source={arrivalAdvisorGlyphLogo}
                    resizeMode={'contain'}
                    style={{
                        flex: 1,
                        width: logoSize,
                        height: logoSize,
                        marginBottom: 20,
                    }}
                />
            </View>
            <Button
                full
                onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
                style={[applicationStyles.whiteButton, applicationStyles.boxShadowBelow]}
            >
                <Text style={textStyles.whiteButton}>
                    <Trans>Start</Trans>
                </Text>
            </Button>
        </View>
    );
};
