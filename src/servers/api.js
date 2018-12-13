import {basePath} from '@@/config'
const NODE_EVN = process.env.NODE_ENV
const baseURL = NODE_EVN === "development" ? basePath : '//www.jd.com'
export const API = {
  test: baseURL + '/getConfig'
}
