import $ from 'jquery';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request2(url, options) {
  let ret = [];
  $.ajax({
    type: 'get',
    async: false,
    url,
    success(res) {
      // console.log(res);
      ret = res;
    },
  });
  return ret;
}
