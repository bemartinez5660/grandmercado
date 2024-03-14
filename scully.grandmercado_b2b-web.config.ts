import { ScullyConfig, RouteTypes } from '@scullyio/scully';

import { taxonomySlugs } from './scully/plugins/taxonomySlugs';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'grandmercado_b2b-web',
  distFolder: './dist/grandmercado_b2b-web',
  outDir: './dist/static',
  defaultPostRenderers: [],
  puppeteerLaunchOptions: {
    args: ['--no-sandbox'],
  },
  routes: {
    '/products/:departament-slug': {
      type: RouteTypes.json,
      'departament-slug': {
        url: 'https://api.grandmercado.com/api/v1/departaments/?province=2',
        property: 'slug',
      },
    },

    '/products/:departament-slug/:category-slug': {
      type: taxonomySlugs,
      url: 'https://api.grandmercado.com/api/v1/departaments/?province=2',
    },

    '/product/:id': {
      type: RouteTypes.json,
      id: {
        url: 'https://api.grandmercado.com/api/v1/products/',
        property: 'id',

        resultsHandler: (response: any) => response.results,
      },
    },
  },
};
