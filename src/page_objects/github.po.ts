import { $ } from '../utils';

export class GithubPage {
  url() {
    return 'https://github.com/';
  }

  searchBox() {
    return $('.header-search-input');
  }

  firstSearchResult() {
    return $('.repo-list-item').nth(0);
  }

  loginButton() {
    return $('.btn.btn-primary.btn-block');
  }

  loginErrorMessage() {
    return $('#js-flash-container > div > div');
  }

  searchButton() {
    return $('.header-search-input');
  }
}
