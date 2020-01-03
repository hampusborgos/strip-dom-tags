# strip-dom-tags
Safely strip all DOM tags from a string to prevent XSS attacks

This module exposes a single functions, that strips a HTML string from tags. It uses the browser DOMParser API ([https://caniuse.com/#search=domparser](caniuse)) internally to do the parsing and stripping. It has no dependencies.

You can whitelist different tags and attributes that are allowed, but `javascript:` attribute values will always be stripped.

# Usage

    stripTags(html : string, whitelistedTags = [] : string[], whitelistedAttributes = [] : string[], visitNode?: (node: Node) : Node) : string
    
* `html` - The string to strip from HTML tags. 
* `whitelistedTags` - A list of HTML tags that are allowed, like `a` and `img`. This is case-insensitive. The default is no tags are allowed.
* `whitelistedAttributes` - A list of HTML attributes that are allwed, like `href` and `src`. The passed attributes will be allowed on *any* tag that is whitelisted. So it is possible for a `a` tag to get a `src` attribute. Note that attribute values starting with `javascript:` or containing `\n` will **always** be stripped.
* `visitNode` - A function that will be invoked on every resulting DOM node after it has been stripped. You can use this to remove invalid attribute, or add `target` attribute to `a` tags for example. You can also return a different node (maybe replace `img` with `picture`).

## Return value

The function returns a HTML string, that is stripped of all the listed tags.

# Examples

