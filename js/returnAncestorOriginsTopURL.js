import formatTrueURLObj from './formatTrueURLObj';

export default () => {
  const ao = window.location.ancestorOrigins;
  const topURL = ao[ao.length - 1];
  return formatTrueURLObj(topURL, true);
};
