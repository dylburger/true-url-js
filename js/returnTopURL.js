import formatTrueURLObj from './formatTrueURLObj';

export default () => formatTrueURLObj(window.top.location.href, true);
