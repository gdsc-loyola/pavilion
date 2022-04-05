/**
 *
 * @description Appends to formdata if value exists
 * @param {FormData} fd
 * @param {string} key
 * @param {any} value
 * @param {(any) => boolean} cb
 */
export const safeFormDataAppend = (fd, key, value, cb) => {
  if (cb && !cb(value)) return;

  if (typeof value !== 'boolean' && value) {
    fd.append(key, value);
    return;
  }

  if (typeof value === 'boolean') {
    fd.append(key, value);
    return;
  }
};
