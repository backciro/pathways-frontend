import React from 'react';
import { values, textStyles } from '../../application/styles';
import Text from '../scaled_text/scaled_text';

// tslint:disable-next-line:no-any
export const ParagraphComponent: React.StatelessComponent = (props: any): JSX.Element => (
    <Text style={[textStyles.paragraphStyle, { paddingHorizontal: values.backgroundTextPadding, marginBottom: 20 }]}>
        {props.children}
    </Text>
);