import React from 'react';
import { Image, Dimensions } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { textStyles, colors, values } from '../../application/styles';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { getColorForExploreIcon } from './get_color_for_explore_icon';
import { SelectableText } from '../selectable_text';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { Trans } from '@lingui/react';

export interface ExploreDetailContentProps {
    readonly section: ExploreSection;
    readonly sectionHasTopics: boolean;
}

export const ExploreDetailContentComponent: React.StatelessComponent<ExploreDetailContentProps> =
    (props: ExploreDetailContentProps): JSX.Element => (
        <View>
            <ImageComponent />
            <TitleComponent {...props} />
        </View>
    );

const ImageComponent = (): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 6;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkerGrey,
            marginHorizontal: -10,
            marginTop: -10,
        }}>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};

const TitleComponent = (props: ExploreDetailContentProps): JSX.Element => (
    <View style={{ paddingHorizontal: values.backgroundTextPadding, alignItems: 'flex-start' }}>
        <Icon
            type={'FontAwesome'}
            name={props.section.icon}
            style={{
                color: getColorForExploreIcon(props.section.icon),
                marginVertical: 20,
            }}
        />
        <Text style={textStyles.headlineH1StyleBlackLeft}>
        <Trans id={props.section.name} />
        </Text>
        {props.sectionHasTopics ? <CollapsibleIntroduction {...props} /> : <PlainTextIntroduction {...props} />}
    </View>
);

const CollapsibleIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <ExpandableContentComponent
        content={<SelectableText style={textStyles.headlineH4StyleBlackLeft}>
        <Trans id={props.section.description} />
        </SelectableText>}
    />
);

const PlainTextIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <SelectableText style={textStyles.headlineH4StyleBlackLeft}>
        <Trans id={props.section.description} />
    </SelectableText>
);
