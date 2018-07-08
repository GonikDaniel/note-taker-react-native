const API_URL = 'https://api.github.com';

const request = endpoint => {
  const url = `${API_URL}/${endpoint}`;
  return fetch(url).then((res) => res.json());
};

export const api = {
  getBio: (username) => request(`users/${username.toLowerCase().trim()}`),
  getRepos: (username) => request(`users/${username.toLowerCase().trim()}/repos`),
};
