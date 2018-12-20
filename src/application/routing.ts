import { matchPath } from 'react-router';
import { RouteComponentProps } from 'react-router-native';
import { History } from 'history';
import { Id as LearnId } from '../stores/explore';
import { Id as TaskId } from '../stores/tasks';

interface MatchParameters {
    readonly learnId: LearnId;
    readonly taskId: TaskId;
}

export type RouterProps = RouteComponentProps<MatchParameters>;

export enum Routes {
    Welcome,
    Home,
    Questionnaire,
    MyPlan,
    Learn,
    LearnDetail,
    TaskDetail,
    Services,
    Help,
    About,
    RecommendedTopics,
    BookmarkedTopics,
}

export const routePathDefinition = (route: Routes): string => {
    switch (route) {
        default:
        case Routes.Welcome:
            return '/';
        case Routes.Home:
            return '/home';
        case Routes.Help:
            return '/help';
        case Routes.Questionnaire:
            return '/questionnaire';
        case Routes.MyPlan:
            return '/my-plan';
        case Routes.Learn:
            return '/learn';
        case Routes.LearnDetail:
            return '/learn/:learnId';
        case Routes.TaskDetail:
            return '/task/:taskId';
        case Routes.Services:
            return '/services/:taskId';
        case Routes.About:
            return '/about';
        case Routes.RecommendedTopics:
            return '/recommended-topics';
        case Routes.BookmarkedTopics:
            return '/bookmarked-topics';
    }
};

export const routePathWithoutParameter = (route: Routes): string => {
    if (routeHasParameter(route)) {
        throw new Error('The provided route cannot be a parameterized route');
    }

    return routePathDefinition(route);
};

export const routePathWithParameter = (route: Routes, parameter: string): string => {
    if (!routeHasParameter(route)) {
        throw new Error('The provided route must be a parameterized route');
    }

    return routePathDefinition(route).replace(/:.*/, parameter);
};

export const goToRouteWithoutParameter = (route: Routes, history: History): () => void => {
    const path = routePathWithoutParameter(route);
    // tslint:disable-next-line:no-expression-statement
    return (): void => history.push(path);
};

export const goToRouteWithParameter = (route: Routes, parameter: string, history: History): () => void => {
    const path = routePathWithParameter(route, parameter);
    // tslint:disable-next-line:no-expression-statement
    return (): void => history.push(path);
};

export const goBack = (history: History): void => (
    history.goBack()
);

export const pathMatchesRoute = (path: string, route: Routes): boolean => {
    return !! matchPath(path, { path: routePathDefinition(route), exact: true });
};

const routeHasParameter = (route: Routes): boolean => (
    routePathDefinition(route).indexOf(':') !== -1
);

export const isOnStartScreen = (path: string): boolean => {
    return pathMatchesRoute(path, Routes.Welcome);
};

export const isOnParentScreen = (path: string): boolean => {
    const isOnHomeScreen = pathMatchesRoute(path, Routes.Home);
    const isOnHelpScreen = pathMatchesRoute(path, Routes.Help);
    const isOnMyPlanScreen = pathMatchesRoute(path, Routes.MyPlan);
    const isOnLearnScreen = pathMatchesRoute(path, Routes.Learn);
    const isOnQuestionnaireScreen = pathMatchesRoute(path, Routes.Questionnaire);
    const isOnAboutScreen = pathMatchesRoute(path, Routes.About);
    const isOnRecommendedTopicsScreen = pathMatchesRoute(path, Routes.RecommendedTopics);
    const isOnBookmarkedTopicsScreen = pathMatchesRoute(path, Routes.BookmarkedTopics);

    return isOnHomeScreen || isOnHelpScreen || isOnMyPlanScreen ||
           isOnLearnScreen || isOnQuestionnaireScreen || isOnAboutScreen ||
           isOnRecommendedTopicsScreen || isOnBookmarkedTopicsScreen;
};

export const isOnChildScreen = (path: string): boolean => {
    const isOnTaskDetailScreen = pathMatchesRoute(path, Routes.TaskDetail);
    const isOnServicesScreen = pathMatchesRoute(path, Routes.Services);
    const isOnLearnDetailScreen = pathMatchesRoute(path, Routes.LearnDetail);

    return isOnTaskDetailScreen || isOnServicesScreen || isOnLearnDetailScreen;
};
