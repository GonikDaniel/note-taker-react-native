const GITHUB_API_URL = 'https://api.github.com';
const FIREBASE_API_URL = 'https://note-taker-react-native.firebaseio.com';

const request = (host, endpoint, payload) => {
  const url = `${host}/${endpoint}`;
  const promise = payload ? fetch(url, payload) : fetch(url);

  return promise.then((res) => res.json());
};

export const api = {
  getBio: (username) => request(GITHUB_API_URL, `users/${username.toLowerCase().trim()}`),
  getRepos: (username) => request(GITHUB_API_URL, `users/${username.toLowerCase().trim()}/repos`),
  getNotes: (username) => request(
    FIREBASE_API_URL,
    `${username.toLowerCase().trim()}.json?auth=aJzFMWdjF54OqaoSxntQ314VKRYLnNsxiMcF6CE2`
  ),
  addNote: (username, note) => request(
    FIREBASE_API_URL,
    `${username.toLowerCase().trim()}.json?auth=aJzFMWdjF54OqaoSxntQ314VKRYLnNsxiMcF6CE2`, {
      method: 'POST',
      body: JSON.stringify(note)
    }
  ),
};
