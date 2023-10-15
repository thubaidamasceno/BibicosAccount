import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'api' // window.location.href.replace(new RegExp('^(https:\/\/)([a-z0-9\.\/\-]+)(\/[a-z0-9\-]+)#(\/.*)','gm'), "$2")

var spsite = window.location.href.split('/');


export const SITE = `${spsite[0]}//${spsite[1]}`;

const encode = encodeURIComponent
const responseBody = (res) => res.body

const token = { jwt: '' }
const tokenPlugin = (req) => {
  if (token.jwt) {
    req.set('authorization', `Token ${token.jwt}`)
  }
}

// RequestHead
export const rh = (verb, url, body) => {
  url = url.match(/^http/) ? url : `${API_ROOT}${url}`
  switch (verb) {
    case 'post':
      return superagent.post(url, body)
    case 'put':
      return superagent.put(url, body)
    case 'patch':
      return superagent.patch(url, body)
    case 'del':
      return superagent.del(url)
    case 'head':
      return superagent.head(url)
    case 'get':
      return superagent.get(url)
    default:
      throw Error(`verbo desconhecido ${verb}`)
  }
}
// RequestTail
export const rt = (r) => {
  return r.use(tokenPlugin).then(responseBody)
}

const requests = {
  del: (url) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).timeout(4000).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
}

const Auth = {
  current: () => requests.get('/user/current'),
  login: (username, password) => requests.post('/user/login', { user: { username, password } }),
  register: (user) => requests.post('/user/users', { user }),
  preregister: (user) => requests.post('/user/preusers', { user }),
  recover: ({ email }) =>{
    var spsite = window.location.href.split('/');
    return requests.post('/user/recoverpass', {
      email,
      site: `${spsite[0]}//${spsite[2]}`,
    });
  },
  resetpass: (p) => requests.post('/user/resetpass', p),
  save: (user) => requests.put('/user/user', { user }),
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = (article) => Object.assign({}, article, { slug: undefined })

export const confStore = {
  setConf: (p) => rt(rh('post', `/omieIntegra/v1/confStore/setConf`, p)),
  getConfs: ({ domain }) => rt(rh('get', `/omieIntegra/v1/confStore/getConfs`).query({ domain })),
}

const Profile = {
  follow: (username) => requests.post(`/profiles/${username}/follow`),
  get: (username) => requests.get(`/profiles/${username}`),
  unfollow: (username) => requests.del(`/profiles/${username}/follow`),
}

export function updateRemoteConfs() {
  return;
  confStore.getConfs({ domain: 'gridConf' }).then(
    (r) => {
      if (r && typeof r.reduce === 'function') {
        const items = r.reduce((curr, item, idx) => {
          let [gridId, profileId] = (item.name || '').split('.')
          window.localStorage.setItem(
            `${item.domain}.${gridId}.${profileId || idx}`,
            JSON.stringify(item.data),
          )
          return { ...curr, [gridId]: [...(curr[gridId] || []), profileId || idx.toString()] }
        }, {})
        window.localStorage.setItem(`gridConf`, JSON.stringify(items))
      }
    },
    (err) => console.log(err),
  )
}

export const setToken = (_token) => {
  token.jwt = _token
}

const expd = {
  Auth,
  setToken,
  Profile,
  confStore,
  agent: { superagent: superagent, requests: requests },
  SITE,
}
export default expd
