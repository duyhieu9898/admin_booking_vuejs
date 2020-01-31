/* global AppVue */

export const checkStatusError = (response) => {
  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }

  if (response && response.status && response.status === 401) {
    localStorage.clear()
    AppVue.$router.push({ name: 'login' })
  }

  // const error = new Error(response.statusText);
  // error.response = response;

  // return Promise.reject(error);
}
