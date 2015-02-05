millimas-album
======
[アイドルマスター ミリオンライブ！](http://www.bandainamcogames.co.jp/cs/list/idolmaster/million_live/)用のアルバム達成状況を確認するためのbookmarkletです。

現在、『勇敢な桃姫さま 周防桃子』まで対応しています。

## 使い方
1. [GREE](http://gree.jp/?mode=login)にログイン後、[アプリのページ](http://imas.gree-apps.net/app/index.php)に移動します。
    - PCからのアクセスは弾かれるようになっておりますが、そこはよしなに解決してください。
1. 下記のコードをアドレスバーにコピペします(`javascript:`の部分が勝手に消えることがあるので注意)。

```
javascript:(function(){var d=document;var s=d.createElement('script');s.src='https://rawgithub.com/millimas/millimas-album/master/js/app.js'; d.body.appendChild(s)})();
```

上のコードは通常のURLと同じくブックマークできるので、登録しておくと便利（かも）。

## 注意点
ミリマスの一ファンとしてこのbookmarkletを使うことで同僚間でのコミュニケーションが活発になってくれればいいなと思い公開しております。

チートしようだとか営業自動化しようだとか決して考えていないのですが、本来の方法でアクセスしていないという点では非常にセンシティブな部分もあると思います。万が一、何かあった場合は提供を中止することもありますのでご了承ください。

なお、お約束ですが、あくまでbookmarkletを利用される際は__自己責任__でお願いします。

## Special thanks
カードデータの取得やロジック作成にあたり、以下のサイト様を参考にさせていただきました。この場を借りてお礼申し上げます。ありがとうございました。

- [アイドルマスター ミリオンライブ！@wiki](http://www50.atwiki.jp/imas_ml/)
  - カードデータはこちらから拝借しております。
- [いままでいくらAmazonで買い物したか合計するブックマークレット書いた - モロ屋](http://moroya.hatenablog.jp/entry/2013/06/03/225935)
  - bookmarkletの仕組みを非常に参考にさせていただきました。

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
