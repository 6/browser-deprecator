(function() {
  var BROWSER_INFO, browser_info_hash, default_cb, version_compare;
  BROWSER_INFO = {
    mozilla: {
      to_s: 'Mozilla Firefox',
      url: 'http://www.firefox.com'
    },
    msie: {
      to_s: 'Internet Explorer',
      url: 'http://www.microsoft.com/ie/'
    },
    opera: {
      to_s: 'Opera',
      url: 'http://www.opera.com/download/'
    },
    chrome: {
      to_s: 'Google Chrome',
      url: 'http://www.google.com/chrome'
    },
    safari: {
      to_s: 'Safari',
      url: 'http://www.apple.com/safari/download/'
    }
  };
  version_compare = function(v1, v2) {
    var i, _ref;
    v1 = $.map(v1.split('.'), function(s, i) {
      return parseInt(s, 10);
    });
    v2 = $.map(v2.split('.'), function(s, i) {
      return parseInt(s, 10);
    });
    for (i = 0, _ref = v1.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      if (i === v2.length) {
        return -1;
      }
      if (v1[i] === v2[i]) {
        continue;
      }
      if (v1[i] > v2[i]) {
        return -1;
      } else {
        return 1;
      }
    }
    if (v1.length < v2.length) {
      return 1;
    } else {
      return 0;
    }
  };
  browser_info_hash = function() {
    var browser, v, version, _ref;
    browser = {
      ua: navigator.userAgent.toLowerCase(),
      version: $.browser.version
    };
    if ($.browser.mozilla) {
      browser.flag = 'mozilla';
    }
    if ($.browser.msie) {
      browser.flag = 'msie';
    }
    if ($.browser.opera) {
      browser.flag = 'opera';
    }
    if (!(browser.flag != null) && /chrome/.test(browser.ua)) {
      browser.flag = 'chrome';
    }
    if (!(browser.flag != null) && /safari/.test(browser.ua)) {
      browser.flag = 'safari';
    }
    if ((_ref = browser.flag) === 'chrome' || _ref === 'safari') {
      v = browser.flag === 'chrome' ? 'chrome' : 'version';
      version = browser.ua.substring(browser.ua.indexOf("" + v + "/") + v.length + 1);
      browser.version = version.split(" ")[0];
    }
    return browser;
  };
  default_cb = function(browser, content, min_version) {
    var info;
    info = BROWSER_INFO[browser.flag];
    if (content == null) {
      content = "<h1>Please upgrade your browser.</h1><h2>This site requires " + info.to_s + " " + min_version + " or higher.</h2><h3><a href='" + info.url + "' target='_blank'>Download the newest " + info.to_s + " &rarr;</a></h3>";
    }
    return $("<div class='jqmWrap'><div class=jqmInner>" + content + "</div></div>").appendTo("body").jqm({
      trigger: false,
      modal: true
    }).jqmShow();
  };
  $.extend({
    deprecate: function(opts, cb) {
      var browser;
      browser = browser_info_hash();
      if (cb == null) {
        cb = default_cb;
      }
      return $.each(opts, function(flag, min_version) {
        if (browser.flag !== flag) {
          return true;
        }
        if (version_compare(min_version, browser.version) < 0) {
          return cb(browser, opts.content, min_version);
        }
      });
    }
  });
}).call(this);
