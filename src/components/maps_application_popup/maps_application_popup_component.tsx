// tslint:disable no-class no-this no-expression-statement
import React from 'react';
import { View, Text, Icon, Button } from 'native-base';
import { showLocation } from 'react-native-map-link';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';
import { sendLinkPressedEvent } from '../../sagas/analytics/events';

interface MapsApplicationPopupProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly currentPath: string;
    readonly linkContext: string;
    readonly locationTitle?: string;
}

export const MapsApplicationPopupComponent: React.StatelessComponent<MapsApplicationPopupProps> =
    (props: MapsApplicationPopupProps): JSX.Element => {

        const icon = <Icon
            type={'FontAwesome'} name={'map-marker'}
            style={{ color: colors.white, fontSize: values.smallIconSize }}
        />;

        const text = <Text style={textStyles.button} uppercase={false}><Trans>Open in maps</Trans></Text>;

        const button = (
            <Button onPress={onMapsButtonPress(props)} iconLeft style={applicationStyles.tealButton} >
                {icon}{text}
            </Button>
        );

        return <View>{button}</View>;
    };

const onMapsButtonPress = (props: MapsApplicationPopupProps): () => Promise<void> => (
    (): Promise<void> => {
        const linkType = 'Button';
        const linkValue = 'Open in maps';
        sendLinkPressedEvent(props.currentPath, props.linkContext, linkType, linkValue);
        return (
            showLocation({
                title: props.locationTitle,
                latitude: props.latitude,
                longitude: props.longitude,
                appsWhiteList: ['apple-maps', 'google-maps'],
            }).catch((): void => alert('Supported applications include Apple or Google maps.'))
        );
    }
);
