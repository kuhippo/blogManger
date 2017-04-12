import { request } from '../utils';


export async function getCatalogues() {
  return request({
    url: '/api/catalogue',
    method: 'get',
  });
}

export async function getArticle() {
  return request({
    url: '/api/getArticle',
    method: 'get',
  });
}
