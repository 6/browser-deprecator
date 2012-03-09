Give browser-deprecator a hash of browsers to check for (with minimum version numbers) and a callback for when the visitor's browser does not meet the criteria.

Screenshot:

<img src="https://github.com/6/browser-deprecator/raw/3e44dfa2981cbfb097a46976d2aff2574450c6db/screenshot.png">


Example usage:

```javascript
function on_deprecated() {
  alert("Your browser is not supported!");
}

$(function() {
  $.deprecate({
    msie: '7',
    mozilla: '3.6.6',
    safari: '4.1.3'
  }, on_deprecated);
});
```

Download: [zip](https://github.com/6/browser-deprecator/zipball/master) or [tar.gz](https://github.com/6/browser-deprecator/tarball/master)
