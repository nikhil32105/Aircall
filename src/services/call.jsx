import axios from 'axios';
import { baseUrl, endPoint } from '../config/url';

export function getCallList() {
    let _url = baseUrl.baseUrl+endPoint.activities;
    return axios.get(_url)
}

export function archiveCall(id,params) {
  console.log(id,params,'PARAMS')
  let _url = `${baseUrl.baseUrl}${endPoint.activities}/${id}`;
  return axios.patch(_url,params)
}