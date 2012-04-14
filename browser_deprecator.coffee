BROWSER_INFO =
  mozilla:
    to_s: 'Mozilla Firefox'
    url: 'http://www.firefox.com'
  msie:
    to_s: 'Internet Explorer'
    url: 'http://www.microsoft.com/ie/'
  opera:
    to_s: 'Opera'
    url: 'http://www.opera.com/download/'
  chrome:
    to_s: 'Google Chrome'
    url: 'http://www.google.com/chrome'
  safari:
    to_s: 'Safari'
    url: 'http://www.apple.com/safari/download/'

# Based on natural-order sort:
# http://blog.jcoglan.com/2008/01/04/natural-order-sort-in-javascript/
version_compare = (v1, v2) ->
  valueOf = (t) -> if isNaN(t) then t.charCodeAt(0) else Number(t) - Math.pow(2,32)
  values = [v1 ,v2].map (s) -> s.toString().toLowerCase().match(/([a-z]|[0-9]+(?:\.[0-9]+)?)/ig)
  a = values[0]
  b = values[1]
  for i in [0..Math.min(a.length, b.length)]
    p = valueOf(a[i])
    q = valueOf(b[i])
    return p - q if p != q
  return a.length - b.length

browser_info_hash = ->
  browser =
    ua: navigator.userAgent.toLowerCase()
    version: $.browser.version
  browser.flag = 'mozilla' if $.browser.mozilla
  browser.flag = 'msie' if $.browser.msie
  browser.flag = 'opera' if $.browser.opera
  browser.flag = 'chrome' if not browser.flag? and /chrome/.test browser.ua
  browser.flag = 'safari' if not browser.flag? and /safari/.test browser.ua
  if browser.flag in ['chrome', 'safari']
    v = if browser.flag is 'chrome' then 'chrome' else 'version'
    version = browser.ua.substring(browser.ua.indexOf("#{v}/") + v.length + 1)
    browser.version = version.split(" ")[0]
  browser

default_cb = (browser, content, min_version) ->
  info = BROWSER_INFO[browser.flag]
  content ?= "<h1>Please upgrade your browser.</h1><h2>This site requires #{info.to_s} #{min_version} or higher.</h2><h3><a href='#{info.url}' target='_blank'>Download the newest #{info.to_s} &rarr;</a></h3>"
  $("<div class='jqmWrap'><div class=jqmInner>#{content}</div></div>").appendTo("body").jqm(trigger:no, modal:yes).jqmShow()

$.extend
  deprecate: (opts, cb) ->
    browser = browser_info_hash()
    cb ?= default_cb
    $.each opts, (flag, min_version) ->
      return true if browser.flag isnt flag # continue
      return cb(browser, opts.content, min_version) if version_compare(min_version, browser.version) > 0
