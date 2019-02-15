/* eslint-disable lines-around-comment */
import { h } from 'preact';
import Foods from '~/app/pages/Foods';

/**
 * Async route functions
 */
const getSports = () => import(
  './app/pages/Sports'
  /* webpackChunkName: "sports" */
  /* webpackPrefetch: true */
);
const getError = () => import(
  './app/pages/Error'
  /* webpackChunkName: "error" */
);

/**
 * Route tree
 */
const routes = [
  { path: '/', component: Foods },
  { path: '/sports/:id', getComponent: getSports },
  { getComponent: getError }
];

export default routes;
