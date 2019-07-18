import React from 'react';
import { Text } from 'native-base';

const ScaledText = (props:any) => {
    return(
        <Text {...props} maxFontSizeMultiplier={1.47} />
    );
}

export default ScaledText;