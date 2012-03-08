version_compare = (v1, v2) ->
  v1 = $.map v1.split('.'), (s, i) -> parseInt(s, 10)
  v2 = $.map v2.split('.'), (s, i) -> parseInt(s, 10)
  for i in [0..(v1.length - 1)]
    return -1 if i is v2.length
    continue if v1[i] is v2[i]
    return if v1[i] > v2[i] then -1 else 1
  return if v1.length < v2.length then 1 else 0

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

$.extend
  deprecate: (opts, cb) ->
    browser = browser_info_hash()
    $.each opts, (flag, min_version) ->
      return true if browser.flag isnt flag # continue
      return cb() if version_compare(min_version, browser.version) < 0
