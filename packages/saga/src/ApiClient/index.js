import Prismic from "prismic-javascript"
import ExtendableError from "es6-error"
import pagination from "./pagination"

export class ResponseError extends ExtendableError {
  constructor({ status, statusText }) {
    super(`HTTP Error: [${status}] ${statusText}`)
    this.status = status
    this.statusText = statusText
  }
}

function handleResponse(response) {
  if(response.results_size === 0) {
    throw new ResponseError({ status: 404, statusText: "Not Found" })
  }
  return response.results
}

export default class ApiClient {
  constructor(repo, { req } = {}) {
    this.url = `https://${repo}.prismic.io/api/v2`
    this.req = req
  }

  get previewCookie() {
    return Prismic.previewCookie
  }

  get api() {
    if(!this.client) {
      this.client = Prismic.getApi(this.url, { req: this.req })
    }
    return this.client
  }

  predicates = p => Object.keys(p).map(type => (
    Prismic.Predicates.at(type, p[type])
  ))

  all = (type, options = {}, search = {}) => this.api.then(api => (
    api.query(this.predicates({ "document.type": type, ...search }), options)
  )).then(response => ({
    pagination: pagination(response),
    results: response.results
  }))

  one = (type, uid, options = {}) => {
    if(!uid) return this.single(type, options)
    return this.api.then(api => (
      api.query(Prismic.Predicates.at(`my.${type}.uid`, uid), options)
    )).then(handleResponse)
      .then(results => results[0])
  }

  single = (type, options = {}) => this.api.then(api => (
    api.query(Prismic.Predicates.at("document.type", type), { pageSize: 1, page: 1, ...options })
  )).then(handleResponse)
    .then(results => results[0])
}
