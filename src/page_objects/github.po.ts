import { $ } from '../utils';

export class GithubPage {
  url(): string {
    return 'https://github.com/';
  }

  searchBox(): Selector {
    return $('.header-search-input');
  }

  firstSearchResult(): Selector {
    return $('.repo-list-item').nth(0);
  }

  loginButton(): Selector {
    return $('.btn.btn-primary.btn-block');
  }

  loginErrorMessage(): Selector {
    return $('#js-flash-container > div > div');
  }

  searchButton(): Selector {
    return $('.header-search-input');
  }
}
