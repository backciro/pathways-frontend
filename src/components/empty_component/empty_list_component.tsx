import React from 'react';
import { View } from 'native-base';
import { colors, values } from '../../application/styles';
import Text from '../scaled_text/scaled_text';

export interface EmptyListProps {
    readonly message: JSX.Element;
}

export const EmptyListComponent: React.StatelessComponent<EmptyListProps> = (props: EmptyListProps): JSX.Element => (
    <View
        style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            borderRadius: values.lessRoundedBorderRadius,
            margin: 5,
            alignItems: 'center',
        }}
    >
            <Text style={{ color: colors.darkerGrey }}>
                {props.message}
            </Text>
    </View>
);
