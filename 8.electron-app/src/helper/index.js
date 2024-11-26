const fs = window.require('fs').promises
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

export const readFile = (path) => {
  return fs.readFile(path, "utf-8");
};

export const writeFile = (path, content) => {
  return fs.writeFile(path, content, "utf-8");
};

export const renameFile = (path, newPath) => {
  return fs.rename(path, newPath);
};

export const deleteFile = (path) => {
  return fs.unlink(path);
};

export { mapArray, objToArray };
