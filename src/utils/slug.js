// src/utils/slug.js
import slugify from 'slugify';

export const createSlug = (id, title) => {
  if (!id || !title) return '';

  const slugTitle = slugify(title, {
    lower: true,      // convert to lower case
    strict: true,     // strip special characters
    remove: /[*+~.()'"!:@]/g // remove characters that slugify doesn't handle
  });

  return `${id}-${slugTitle}`;
};

export const getIdFromSlug = (slug) => {
  if (!slug) return '';
  return slug.split('-')[0];
};