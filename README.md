### True URL JS

Often you find yourself nested within one or more `<iframe>`s when executing JavaScript on a site you do not control. In certain contexts, it's useful to understand not just the URL of the current frame, i.e. the value of `window.location.href`, but also the tree of parent frame URLs in which you're nested. Primarily, you probably want to know the "true" URL on which you're executing code: the URL of the highest level page.

Not all browsers support retrieval of this "true" URL when you're nested in `<iframe>`s. These nuances are discussed in the **Browser Support** section of this document below. The code in this repo attempts to retrieve the URL at the highest possible level in each case.

#### High-level logic

First, we must check if we're in any iframes to begin with.

If we're not framed, `window.location.href` returns the true URL.

If we _are_ framed, it's possible that the domain of the parent frames is the same as the domain of our current frame. In this case, we can traverse parent frames to retrieve the true URL.

If this isn't the case, and the domain of parent frames is different than the domain of the current frame, we attempt to get the tree of parent frames using [`window.location.ancestorOrigins`](https://github.com/chromium/chromium/blob/d2429f7cf43028af27e7c4e2768f556296880830/third_party/blink/renderer/core/frame/location.cc#L97). In rendering engines that support it, this technique reliably retrieves the true URL (and all intermediate parent frames), and works in a cross-domain context (i.e. it is not subject to the [Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)). See the **Browser Support** section for more information about browser support for this property.

If these techniques fail, we cannot reliably retrieve the true URL. However, we attempt to retrieve the URL of the highest-possible parent frame, since this is better than just returning the URL of the current frame. In certain browsers, `document.referrer` returns the URL of the parent frame (the URL only one-level up). In the case in which this parent frame is the only frame, this _could_ be the true URL, but we have no way to know. We expose this uncertainty through the use of a boolean property in the returned object, `guaranteedTrueURL`, which would hold a value of `false` here.

#### Usage

The core logic of this code is exposed through a `getTrueURL()` function, which returns an object with the following properties:

* `url`: String, the highest-level URL we can retrieve, given the framing environment and browser support
* `guaranteedTrueURL`: Boolean, a flag indicating whether this is the true URL or not, given what we know about the current framing environment.

#### Browser Support

Two major browsers - Chrome and Safari - use the [Blink rendering engine](https://www.chromium.org/blink). Blink exposes a property that allows us to retrieve the tree of parent frame URLs: (`window.location.ancestorOrigins`)[https://github.com/chromium/chromium/blob/d2429f7cf43028af27e7c4e2768f556296880830/third_party/blink/renderer/core/frame/location.cc#L97].


| Browser    | Able to retrieve true URL? | 
