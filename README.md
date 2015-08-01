million-albumchecker
======

[Japanese README](https://github.com/imas/million-albumchecker/blob/master/README.ja.md)

A bookmarklet for card album achievement status of [IDOLM@STER MILLION LIVE!!](http://www.bandainamcogames.co.jp/cs/list/idolmaster/million_live/).

Currently we support card until『決死のレシーブ！ 七尾百合子』.

## How to use
1. Log in [GREE](http://gree.jp/?mode=login), and go to [app page](http://imas.gree-apps.net/app/index.php).
1. Use bookmarklet below (<a href="javascript:(function(){var d=document;var s=d.createElement('script');s.src='https://rawgithub.com/imas/million-albumchecker/master/js/app.js'; d.body.appendChild(s)})();">link</a>)

```
javascript:(function(){var d=document;var s=d.createElement('script');s.src='https://rawgithub.com/imas/million-albumchecker/master/js/app.js'; d.body.appendChild(s)})();
```

## Special thanks
To develop this bookmarklet, we referred pages below. Thanks!!

- [IDOLM@STER MILLION LIVE!! @wiki](http://www50.atwiki.jp/imas_ml/)
  - Resource of card list.
- [A bookmarklet to check how much you've paid for Amazon](http://moroya.hatenablog.jp/entry/2013/06/03/225935)
  - Base of bookmarklet structure.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
