import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouterProps } from '../../application/routing';
import { withI18n } from '@lingui/react';
import { WelcomeComponent, WelcomeProps, WelcomeActions } from './welcome_component';
import { Store } from '../../stores';
import { SaveLocaleRequestAction, saveLocaleRequest } from '../../stores/locale/actions';
import { selectLocale } from '../../selectors/locale/select_locale';
import { selectShowOnboarding } from '../../selectors/onboarding/select_show_onboarding';
import { selectAvailableLocales } from '../../selectors/locale/select_available_locales';

function mapStateToProps(store: Store, routerProps: RouterProps): WelcomeProps {
    return {
        currentLocale: selectLocale(store),
        availableLocales: selectAvailableLocales(store),
        showOnboarding: selectShowOnboarding(store),
        history: routerProps.history,
    };
}

function mapDispatchToProps(dispatch: Dispatch<SaveLocaleRequestAction>): WelcomeActions {
    return {
        setLocale: (localeCode: string, flipOrientation: boolean): SaveLocaleRequestAction => dispatch(saveLocaleRequest(localeCode, flipOrientation)),
    };
}

export const WelcomeConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withI18n()(WelcomeComponent));