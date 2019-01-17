import { isString } from 'lodash-es';

export function parseEvent(event) {

  if (event.data && isString(event.data)) {

    const matches = event.data.match(/(fs-iframe):(.*)/);

    if (matches) {

      try {

        return JSON.parse(matches[2]);

      } catch (e) {}
    }
  }

  return { name: null, value: null };
}
