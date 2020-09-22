'use strict';

var crudRequest = require('@nestjsx/crud-request');
var reactAdmin = require('react-admin');

export default (apiUrl: any, httpClient = reactAdmin.fetchUtils.fetchJson) => {
  const composeFilter = (paramsFilter: any) => {

    if (paramsFilter === '' || (typeof paramsFilter.q !== 'undefined' && paramsFilter.q === '')) {
      paramsFilter = {};
    }

    const flatFilter = reactAdmin.fetchUtils.flattenObject(paramsFilter);
    console.log('>>>', flatFilter);
    
    const filter = Object.keys(flatFilter).map(key => {
      const splitKey = key.split('||');
      const ops = splitKey[1] ? splitKey[1] : 'cont';
      let field = splitKey[0];

      if (field.indexOf('_') === 0 && field.indexOf('.') > -1) {
        // field = field.split(/\.(.+)/)[1];
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

        if (resource === 'category-fields') {
          console.log('param:', params);
          
          url = `${apiUrl}/category/${params.categoryId}/category-fields`;
        } 

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

        switch (resource) {
          case 'banners':
            const data = new FormData();
            data.append('link', params.data.link)
            data.append('priority', params.data.priority)
            data.append('description', params.data.description)
            data.append('file', params.data.filename.rawFile)

            options.body = data;
            break;
        
          default:
            options.body = JSON.stringify(params.data);
            break;
        }

        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
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
    console.log('RESPONSE:', response);
    
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
      case reactAdmin.GET_MANY:
        return {
          data: json.data ? json.data : json,
          total: json.total ? parseInt(json.total, 10) : parseInt(json.length, 10),
        };
      case reactAdmin.GET_ONE:
        if (resource === 'products') {

          if (json.productCategoryFields !== null && json.productCategoryFields !== undefined) {
            json.productCategoryFields.forEach((pcf:any) => {
              json['cf_' + pcf.categoryFieldId + "_" + pcf.categoryField.categoryId] = pcf.value
            })
          }
          
        } else if (resource === 'orders') {

          if (json.logs && json.logs.length > 0) {
            json.status = json.logs[json.logs.length - 1].status
          } else {
            json.status = 'pending'
          }
        }
        return { data: json };
      default:
        return { data: json };
    }
  };

  const convertHTTPErrorToDataProvider = (error:any, type:any, resource:string, params:any) => {
      // const { headers, json } = response;

      console.log('convertHTTPErrorToDataProvider: ', error.error);

      let errors = "";
      // if (error !== undefined && error !== null) {

      //     errors = parseErrors(error);
      // } else {
      //     errors = "خطای سرور رخ داده است";
      // }
      return Promise.reject({ message: errors });
  };

  //helper funcs
  function parseErrors(err:any) {

      //handle error
      // let errors = new Array();

      // if (err.error.statusCode === 401) {

      //     errors[0] = "دسترسی غیر مجاز";
      //     return "دسترسی غیر مجاز";
      // }
      // else if (err.error.statusCode === 422) {

      //     let error_code = err.error.message;
      //     let error_parts = [];

      //     if (error_code.includes(":")) {
      //         error_parts = error_code.split(":");
      //     }

      //     let message = "";

      //     if (error_parts.length > 0) {
      //         message = `ra.validation.${error_parts[1]}`;
      //     } else {
      //         message = `ra.validation.${error_code}`;
      //     }

      //     return message;
      // }
      // else {

      //     errors[0] = "خطای سرور رخ داده است";
      //     return "خطای سرور رخ داده است";
      // }
  };

  return (type:any, resource:string, params:any) => {
console.log('TYPE: ', type, ' RESOURCE: ', resource, ' PARAMS: ', params);

    // Translate resources
    if (resource === 'managers' || resource === 'customers') {
      resource = 'users';
    }
    else if (resource === 'user-addresses') {
      console.log(params);
      
      if (type === reactAdmin.CREATE || type === reactAdmin.UPDATE) {
        resource = `users/${params.data.userId}/user-addresses`;
      } else if (type === reactAdmin.DELETE) {
        resource = `users/${params.previousData.userId}/user-addresses`;
      } else if (type === reactAdmin.GET_LIST || type === reactAdmin.GET_MANY_REFERENCE) {
        resource = `users/${params.filter.userId}/user-addresses`;
        params.filter = {};
      }      
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
    )
    // .catch((error:any) => convertHTTPErrorToDataProvider(error, type, resource, params));
  };
};