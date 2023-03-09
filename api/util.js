import * as config from './config';

/**
 * Generate directus URL from asset id
 * @param {string} id Id of the assset
 * @returns URL of directs
 */
export const getDirectusAssetUrl = (id) => {
    return `${config.directusUrl}/assets/${id}`;
}