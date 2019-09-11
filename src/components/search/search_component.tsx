import React, { useState } from 'react';
import { InstantSearch, connectSearchBox, connectInfiniteHits, connectConfigure } from 'react-instantsearch-native';
import { SearchInputComponent } from './search_input_component';
import { InfiniteHitsComponent } from './infinite_hits_component';
import { colors } from '../../application/styles';
import { Content } from 'native-base';
import { emptyComponent } from '../empty_component/empty_component';
import { Locale } from '../../locale';
import { LatLong } from './types';
import { useFetchLatLongFromLocation } from './api/use_fetch_lat_long_from_location';
import { toServiceSearchConfiguration } from './api/configuration';
import { debug, useTraceUpdate } from './debug';

export interface SearchComponentProps {
    readonly apiKey: string;
    readonly appId: string;
    readonly currentLocale: Locale;
}

export interface SearchComponentActions {
    readonly openMenu: () => void;
}

type Props = SearchComponentProps & SearchComponentActions;

// tslint:disable:no-expression-statement
export const SearchComponent: React.StatelessComponent<SearchComponentProps> = (props: Props): JSX.Element => {
    useTraceUpdate('SearchComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState('');
    const [latLong, setLatLong]: [LatLong, (latLong: LatLong) => void] = useState(undefined);
    const _setLatLong = (d: LatLong): void => {
        debug(`SearchComponent setLatLong to '${JSON.stringify(d)}'`);
        setLatLong(d);
    };

    const _setLocation = (d: string): void => {
        debug(`SearchComponent setLocation to '${d}'`);
        setLocation(d);
    };

    useFetchLatLongFromLocation(location, _setLatLong);

    const SearchInputConnectedComponent = connectSearchBox(SearchInputComponent);
    const ConfigureConnectedComponent = connectConfigure(() => emptyComponent());
    const InfiniteHitsConnectedComponent = connectInfiniteHits(InfiniteHitsComponent);

    return <Content style={{ backgroundColor: colors.teal }}>
        <InstantSearch indexName='dev_services' {...props} >
            <SearchInputConnectedComponent location={location} setLocation={_setLocation} latLong={latLong} />
            <ConfigureConnectedComponent {...toServiceSearchConfiguration(latLong)} />
            <InfiniteHitsConnectedComponent />
        </InstantSearch>
    </Content>;
};
