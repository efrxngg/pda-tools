import {MicroJeisRequest} from '../interfaces/eia-components/mjeis.request';
import {Project} from '../interfaces/product-order/project.ts';
import {MicroJeisResponse} from '../interfaces/eia-components/mjeis.response';
import {formatDate} from '../utils/date-utils.ts';

export async function getProjects(startDate: Date, endDate: Date, beginRow: number, endRow: number) {

  const requestBody: MicroJeisRequest = {
    'informationService': 'pda:queryProjectsNotificationRegularization',
    'inputs': [
      {
        'key': 'initDate',
        'value': formatDate(startDate)
      },
      {
        'key': 'endDate',
        'value': formatDate(endDate)
      },
      {
        'key': 'beginRow',
        'value': beginRow.toString()
      },
      {
        'key': 'endinRow',
        'value': endRow.toString()
      }
    ]
  };

  // const headers = {
  //   'Content-type': 'application/json; charset=UTF-8',
  // };

  const body = JSON.stringify(requestBody);

  console.log(body);

  // const requestOptions = {
  //   method: 'POST',
  //   headers,
  //   body
  // };

  // const response = await fetch('', requestOptions);
  // return await response.json() as Promise<MicroJeisResponse<Project>>;
  return Promise.resolve(
    {
      'code': 0,
      'status': 'OK',
      'message': 'Successful Response',
      'response': [],
      'internalCorrelationId': '516202e0-9f23-4157-bbeb-12c9e319feaa'
    }) as Promise<MicroJeisResponse<Project>>;
}


