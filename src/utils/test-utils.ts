import type { Article } from '../services/HttpService'

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum esse placeat ipsa nam animi accusamus possimus aspernatur mollitia expedita veniam quas, exercitationem modi dicta? Labore nesciunt voluptates veniam, autem quae, voluptatem alias aliquam explicabo quos optio natus perferendis sit expedita soluta beatae pariatur hic suscipit nam aperiam dicta. Provident placeat veniam rem reiciendis sint, dicta, laboriosam praesentium sed accusantium voluptatibus voluptates saepe facere repellat odit! Perspiciatis nemo consequatur pariatur voluptatum dolore sapiente beatae voluptas non. Ex, fugit. Voluptatum omnis perspiciatis eos reiciendis minus cumque debitis ullam quod suscipit culpa expedita, nostrum cum quae, repudiandae aliquid quos sint inventore! Quisquam, corporis.'

export function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min + 1) + min
}

export function generateRandomString(length?: number) {
  const random = generateRandomNumber(1, 100)
  const newStr = [...LOREM_IPSUM]
  newStr.splice(0, length || random)
  return newStr.join('')
}

export function generateArticle(args?: Partial<Article>): Article {
  return {
    source: {
      id: 'id',
      name: generateRandomString(5),
    },
    author: generateRandomString(10),
    title: 'Article',
    description: generateRandomString(),
    url: 'https://www.engadget.com/amazon-prime-day-airpods-deals-175142056.html',
    urlToImage: 'https://s.yimg.com/uu/api/res/1.2/.JQHnpmgIB2uWWfFRC_.sg--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-07/119235f0-19af-11ee-bfdf-d2d22375f6a9.cf.jpg',
    publishedAt: new Date().toISOString(),
    content: generateRandomString(),
    ...args,
  }
}

export function getArticles(quantity = 0): Article[] {
  return [...Array(quantity)].map(i => generateArticle({ title: `Article ${i + 1}` }))
}

export default {
  generateRandomNumber,
  generateRandomString,
  generateArticle,
  getArticles,
}
