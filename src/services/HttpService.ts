import axios from 'axios'

export interface Source {
  id: string
  name: string
}

export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface ResponseError {
  status: 'error'
  code: string
  message: string
}

export interface ResponseSuccess {
  status: 'ok'
  totalResults: number
  articles: Article[]
}

export type Response = ResponseError | ResponseSuccess

export type SearchType = 'title' | 'description' | 'content'

export type Language =
  | 'ar'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'he'
  | 'it'
  | 'nl'
  | 'no'
  | 'pt'
  | 'ru'
  | 'sv'
  | 'ud'
  | 'zh'

export type SortBy = 'relevancy' | 'popularity' | 'publishedAt'

export interface Params {
  q: string
  searchIn?: SearchType
  sources?: string
  domains?: string
  excludeDomains?: string
  from?: Date
  to?: Date
  language?: Language
  sortBy?: SortBy
  pageSize?: number
  page?: number
}

export default class HttpService {
  private instance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
      apiKey: '46c1fe6391a34cd4b098cb5298778361',
    },
  })

  getAllArticles = (params: Params) => {
    return this.instance.get<Response>('/everything', {
      params,
    })
  }

  getTopHeadlinesArticles = (params: Params): Promise<Response> => {
    return this.instance.get('/top-headlines', {
      params,
    })
  }
}
