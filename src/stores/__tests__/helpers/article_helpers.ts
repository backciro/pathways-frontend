// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { LocalizedTextBuilder } from './locale_helpers';
import { TaxonomyTermReference } from '../../../selectors/taxonomies';
import { Id, Article } from '../../articles';
import { Id as TaskId } from '../../tasks';

export class ArticleBuilder {
    localeCode: string = aString();
    id: Id = aString();
    title: string = aString();
    description: string = aString();
    taxonomyTerms: TaxonomyTermReference[] = [];
    relatedTasks: ReadonlyArray<TaskId> = [aString(), aString()];
    relatedArticles: ReadonlyArray<Id> = [aString(), aString()];
    isRecommendedToAllUsers: boolean = aBoolean();
    starred: boolean = aBoolean();

    withLocaleCode(localeCode: string): ArticleBuilder {
        this.localeCode = localeCode;
        return this;
    }

    withId(id: string): ArticleBuilder {
        this.id = id;
        return this;
    }

    withTitle(title: string): ArticleBuilder {
        this.title = title;
        return this;
    }

    withDescription(description: string): ArticleBuilder {
        this.description = description;
        return this;
    }

    withTaxonomyTerm(taxonomyTerm: TaxonomyTermReference): ArticleBuilder {
        this.taxonomyTerms = [...this.taxonomyTerms, taxonomyTerm];
        return this;
    }

    withRelatedTasks(relatedTasks: ReadonlyArray<TaskId>): ArticleBuilder {
        this.relatedTasks = relatedTasks;
        return this;
    }

    withRelatedArticles(relatedArticles: ReadonlyArray<Id>): ArticleBuilder {
        this.relatedArticles = relatedArticles;
        return this;
    }

    withStarred(starred: boolean): ArticleBuilder {
        this.starred = starred;
        return this;
    }

    build(): Article {
        return {
            id: this.id,
            title: new LocalizedTextBuilder(this.localeCode, this.title).build(),
            description: new LocalizedTextBuilder(this.localeCode, this.description).build(),
            relatedTasks: this.relatedTasks,
            relatedArticles: this.relatedArticles,
            isRecommendedToAllUsers: this.isRecommendedToAllUsers,
            starred: this.starred,
            taxonomyTerms: this.taxonomyTerms,
        };
    }

}