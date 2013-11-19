millimas-album
======
[アイドルマスター ミリオンライブ！](http://www.bandainamcogames.co.jp/cs/list/idolmaster/million_live/)用のアルバム達成状況を確認するためのbookmarkletです。


## 使い方
1. [GREE](http://gree.jp/?mode=login)にログイン後、[アプリのページ](http://imas.gree-apps.net/app/index.php)に移動します。
1. 下記のコードをアドレスバーにコピペします。

```
javascript:(function(){var d=document;var s=d.createElement('script');s.src='https://raw.github.com/treby/millimas-album/master/js/app.js'; d.body.appendChild(s)})();
```

上のコードは通常のURLと同じくブックマークできるので、登録しておくと便利（かも）。

## 注意点
開発者としてはこのbookmarkletを使ってチートしようだとか営業自動化しようだとか決して考えていないのですが、本来の方法でアクセスしていないという点では非常にセンシティブな部分もあると思います。

ミリマスの一ファンとしてこのbookmarkletを使うことで同僚間でのコミュニケーションが活発になってくれればいいなと思い公開しておりますが、万が一、何かあった場合は提供を中止することもありますのでご了承ください。

あとデータの都合上、現状では『世界を統べる魔王 星井美希』（マオー美希）までに出たカードにしか対応していません。こちらは追々対応していければよいのかな、と考えています。

## Special thanks
カードデータの取得やロジック作成にあたり、以下のサイト様を参考にさせていただきました。この場を借りてお礼申し上げます。ありがとうございました。

- [アイドルマスター ミリオンライブ！@wiki](http://www50.atwiki.jp/imas_ml/)
  - カードデータはこちらから拝借しております。
- [いままでいくらAmazonで買い物したか合計するブックマークレット書いた - モロ屋](http://moroya.hatenablog.jp/entry/2013/06/03/225935)
  - bookmarkletの仕組みを非常に参考にさせていただきました(半コピペ)。
