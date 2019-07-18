import React from 'react';
import { Trans } from '@lingui/react';
import { textStyles } from '../../application/styles';
import Text from '../scaled_text/scaled_text';

export const taskAddedNotification = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            <Trans>Bookmark added</Trans>
        </Text>
    );
};

export const taskRemovedNotification = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            <Trans>Bookmark removed</Trans>
        </Text>
    );
};
