export function postMessage(data) {
  window.parent.postMessage('fs-iframe:' + JSON.stringify(data), '*');
}
