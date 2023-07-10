import axios from 'axios'

export type Source = {
  id: string
  name: string
}

export type Article = {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export type ResponseError = {
  status: 'error'
  code: string
  message: string
}

export type ResponseSuccess = {
  status: 'ok'
  totalResults: number
  articles: Article[]
}

export type Response = ResponseError | ResponseSuccess

export type SearchType = 'title' | 'description' | 'content'

export type Languege =
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

export type Params = {
  q: string
  searchIn?: SearchType
  sources?: string
  domains?: string
  excludeDomains?: string
  from?: Date
  to?: Date
  language?: Languege
  sortBy?: SortBy
  pageSize?: number
  page?: number
}

export default class HttpService {
  private instance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
      apiKey: '46c1fe6391a34cd4b098cb5298778361'
    }
  })

  getAllArticles = (params: Params) => {
    return this.instance.get<Response>('/everything', {
      params
    })
  }

  getTopHeadlinesArticles = (params: Params): Promise<Response> => {
    return this.instance.get('/top-headlines', {
      params
    })
  }
}
