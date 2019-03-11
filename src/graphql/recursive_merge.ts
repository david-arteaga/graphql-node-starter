const lodash_merge = require('lodash.merge');
export default function recursive_merge<T>(items: Partial<T>[]): T {
  let object = {};
  items.forEach(item => lodash_merge(object, item));
  return object as any;
}
