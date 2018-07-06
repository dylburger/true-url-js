export default () => {
  try {
    return window.self !== window.top;
  } catch (err) {
    return true;
  }
};
