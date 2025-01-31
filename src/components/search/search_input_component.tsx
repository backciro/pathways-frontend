import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { View, Icon } from 'native-base';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from './types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { InputFormSeparator } from './separators';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.currentRefinement}'`);
        props.refine(props.currentRefinement);
    }, [props.latLong]);

    return <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InputIcon name='search' />
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={(d: string): void => {
                    debug(`SearchInputComponent search text changed to '${d}'`);
                    props.refine(d);
                }}
                value={props.currentRefinement}
                placeholder='Search for services and organizations' // TODO translate
            />
        </View>
        <InputFormSeparator />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InputIcon name='map-marker' />
            <TextInput
                style={applicationStyles.searchInput}
                onChangeText={(d: string): void => {
                    debug(`SearchInputComponent location text changed to '${d}'`);
                    setLocation(d);
                }}
                value={location}
                onEndEditing={(): void => props.setLocation(location)}
                placeholder='Near My location' // TODO translate
            />
        </View>
        <InputFormSeparator />
    </View >;
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='FontAwesome'
        style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
    />
);
