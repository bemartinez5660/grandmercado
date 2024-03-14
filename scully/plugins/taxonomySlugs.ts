import { routeSplit, registerPlugin, httpGetJson } from '@scullyio/scully';

export const taxonomySlugs = 'taxonomySlugs';

interface Departament {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  departament: number;
}

const newsSamplePlugin = async (route, config) => {
  const { createPath } = routeSplit(route);
  const taxonomies = (await httpGetJson(config.url)) as Departament[];
  const handledRoutes = [];
  for (let item of taxonomies) {
    for (let category of item.categories) {
      handledRoutes.push({
        route: createPath(item.slug, category.slug),
        title: category.title,
        description: category.description,
      });
    }
  }
  return handledRoutes;
};

registerPlugin('router', taxonomySlugs, newsSamplePlugin);
