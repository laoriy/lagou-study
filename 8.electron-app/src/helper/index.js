/**
 *
 * @param {Array} data
 * @returns
 */
function mapArray(data) {
  return data.reduce((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {});
}

/**
 *
 * @param {Object} obj
 */
function objToArray(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

export { mapArray, objToArray };
