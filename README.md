### True URL JS

Often you find yourself nested within one or more `<iframe>`s when executing JavaScript on a site you do not control. In certain contexts, it's useful to understand not just the URL of the current frame, i.e. the value of `document.location.href`, but also the chain of iframe URLs in which you're nested. Primarily, you probably want to know the "true" URL on which you're executing code: the URL of the highest level page.

Not all browsers support retrieval of this "true" URL when you're nested in `<iframe>`s. These nuances are discussed in the **Browser Support** section of this document below. The code in this repo attempts to retrieve the URL at the highest possible level in each case.

#### Browser Support
