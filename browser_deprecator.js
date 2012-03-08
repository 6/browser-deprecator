(function() {
  var browser_info_hash, version_compare;
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
  $.extend({
    deprecate: function(opts, cb) {
      var browser;
      browser = browser_info_hash();
      return $.each(opts, function(flag, min_version) {
        if (browser.flag !== flag) {
          return true;
        }
        if (version_compare(min_version, browser.version) < 0) {
          return cb();
        }
      });
    }
  });
}).call(this);
