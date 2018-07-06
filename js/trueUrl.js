import inIframe from './inIframe';
import returnAncestorOriginsTopURL from './returnAncestorOriginsTopURL';
import returnCurrentURL from './returnCurrentURL';
import returnReferrerURL from './returnReferrerURL';
import returnTopURL from './returnTopURL';

const getTrueURL = () => {
  if (!inIframe()) {
    // If we're not in an iframe, the current URL is the top URL!
    return returnCurrentURL();
  }

  // Even if we are framed, the top domain could be on the same
  // origin as the current frame, so try to return that. This
  // will fail with a SecurityError if the top domain is on a
  // different domain than the child
  try {
    return returnTopURL();
  } catch (err) {
    console.log(`Failed to return top URL: ${err}`);
  }

  // If we still can't get a true URL, let's try to retrieve
  // parent domains using ancestorOrigins
  if (window.location.hasOwnProperty('ancestorOrigins')) {
    return returnAncestorOriginsTopURL();
  }

  // At this point, we have no way to reliably retrieve the true
  // top URL, but we can return the referrer for the current frame,
  // which in certain browsers is the URL of the parent frame
  return returnReferrerURL();
};

console.log('True URL:', getTrueURL());
