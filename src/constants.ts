export enum AppRoute {
  MAIN = '/',
  SIGN_IN = '/login',
  MY_LIST = '/mylist',
  FILM = '/films/:id',
  FILMS = '/films',
  ADD_REVIEW = '/films/:id/review',
  PLAYER = '/player',
  NOTFOUND = '*',
}

export enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'no_auth',
  UNKNOWN= 'unknown',
}

export const MOVIES_BY_PAGE = 8;
export const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';
export const TIMEOUT_SHOW_ERROR = 2000;

export enum ApiRoute {
  MOVIES = '/films',
  COMMENTS = '/comments',
  FAVORITE_MOVIES = '/favorite',
  PROMO = '/promo',
  LOGIN = '/login',
  LOGOUT = '/logout',
}
