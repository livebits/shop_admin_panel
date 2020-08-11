'use strict';

var crudRequest = require('@nestjsx/crud-request');
var reactAdmin = require('react-admin');

export default (apiUrl: any, httpClient = reactAdmin.fetchUtils.fetchJson) => {
  const composeFilter = (paramsFilter: any) => {

    if (paramsFilter === '' || (typeof paramsFilter.q !== 'undefined' && paramsFilter.q === '')) {
      paramsFilter = {};
    }

    const flatFilter = reactAdmin.fetchUtils.flattenObject(paramsFilter);
    const filter = Object.keys(flatFilter).map(key => {
      const splitKey = key.split('||');
      const ops = splitKey[1] ? splitKey[1] : 'cont';
      let field = splitKey[0];

      if (field.indexOf('_') === 0 && field.indexOf('.') > -1) {
        field = field.split(/\.(.+)/)[1];
      }
      return { field, operator: ops, value: flatFilter[key] };
    });
    return filter;
  };

  const convertDataRequestToHTTP = (type:any, resource:string, params:any) => {
    let url = '';
    const options:any = {};
    switch (type) {
      case reactAdmin.GET_LIST: {
        const { page, perPage } = params.pagination;

        const query = crudRequest.RequestQueryBuilder
          .create({
            filter: composeFilter(params.filter),
          })
          .setLimit(perPage)
          .setPage(page)
          .sortBy(params.sort)
          .setOffset((page - 1) * perPage)
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case reactAdmin.GET_ONE: {
        url = `${apiUrl}/${resource}/${params.id}`;

        break;
      }
      case reactAdmin.GET_MANY: {
        const query = crudRequest.RequestQueryBuilder
          .create()
          .setFilter({
            field: 'id',
            operator: crudRequest.CondOperator.IN,
            value: `${params.ids}`,
          })
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case reactAdmin.GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const filter = composeFilter(params.filter);

        filter.push({
          field: params.target,
          operator: crudRequest.CondOperator.EQUALS,
          value: params.id,
        });

        const query = crudRequest.RequestQueryBuilder
          .create({
            filter,
          })
          .sortBy(params.sort)
          .setLimit(perPage)
          .setOffset((page - 1) * perPage)
          .query();

        url = `${apiUrl}/${resource}?${query}`;

        break;
      }
      case reactAdmin.UPDATE: {
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        break;
      }
      case reactAdmin.CREATE: {
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      }
      case reactAdmin.DELETE: {
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  const convertHTTPResponse = (response:any, type:any, resource:string, params:any) => {
    const { headers, json } = response;    
    switch (type) {
      case reactAdmin.GET_LIST:
      case reactAdmin.GET_MANY_REFERENCE:
        return {
          data: json.data,
          total: json.total,
        };
      case reactAdmin.CREATE:
        return { data: { ...params.data, id: json.id } };
      case reactAdmin.DELETE:
        return { data: { id: params.id } };
      default:
        return { data: json };
    }
  };

  return (type:any, resource:string, params:any) => {

    // Translate resources
    if (resource === 'managers' || resource === 'customers') {
      resource = 'users';
    }

    if (type === reactAdmin.UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id:any) => httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })),
      )
        .then(responses => ({
          data: responses.map((response:any) => response.json),
        }));
    }
    if (type === reactAdmin.DELETE_MANY) {
      return Promise.all(
        params.ids.map((id:any) => httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })),
      ).then(responses => ({
        data: responses.map((response:any) => response.json),
      }));
    }

    const { url, options } = convertDataRequestToHTTP(
      type,
      resource,
      params,
    );
    return httpClient(url, options).then(
      (response:any) => convertHTTPResponse(response, type, resource, params),
    );
  };
};