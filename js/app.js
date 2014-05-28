(function() {
var CARD_COUNT_PER_PAGE = 25;

var skip_page_list = new Array();
var completed_page_list = new Array();

var card_list;
var unknown_card_list = new Array();

var page_limit = 0;

function init() {
    card_list = ___millimas_card_list;
    page_limit = card_list.length / CARD_COUNT_PER_PAGE;
    $('<div/>')
    .css({
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,.7)',
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: '5em'
    })
    .attr('id', '___overlay')
    .html(card_list.slice(-1)[0].name + 'までの<br />ミリマスアルバム達成度チェック')
    .appendTo('body');

    var skip_pages = prompt('達成しているページ(オプション):', '');

    // キャンセルされた場合
    if (skip_pages === null) {
        $('#___overlay').remove();
        return;
    }

    // 入力文字列の解析
    skip_pages.split(',').forEach(function(skip_page) {
        if (skip_page_list.indexOf(skip_page) >= 0) {
            return;
        }

        var page_num = parseInt(skip_page.trim());
        if (isNaN(page_num) || page_num < 1 || page_num > page_limit) {
            return;
        }
        skip_page_list.push(page_num);
    });

    if (!confirm((page_limit - skip_page_list.length) + '回のアクセスが発生します。実行しますか？')) {
        $('#___overlay').remove();
        return;
    }

    action(1);
}

function action(num) {
    if (skip_page_list.indexOf(num) > -1) {
        $('#___overlay').text(num + ' / ' + page_limit + 'ページ目をスキップ');
        completed_page_list.push(num);
        next(num);
        return;
    }

    $('#___overlay').text(num + ' / ' + page_limit + 'ページ目をチェック中...');
    var progress = load(num);
    progress.done(
        next
    ).fail(function() {
        alert('エラーが発生しました:' + unknown_card_list.length);
        console.log(unknown_card_list);
        $('#___overlay').remove();
    });
}

function load(num) {
    var df = $.Deferred();

    var page = get(num);
    page.done(function(data) {
        check(num, data);
        df.resolve(num);
    });

    return df.promise();
}

function check(page_num, content) {
    var dom = $.parseHTML(content);
    var _completed_flag = true;
    var p = CARD_COUNT_PER_PAGE * (page_num - 1);

    $(dom).find('.s-mb').each(function(i) {
        anchor_elm = $('a', $(this)).html();
        if (typeof anchor_elm === 'undefined') {
            _completed_flag = false;
            if (card_list.hasOwnProperty(p)) {
                unknown_card_list.push(card_list[p]['rare'] + ' ' + card_list[p]['name']);
            }
        }

        p++;
    });

    if (_completed_flag) {
        completed_page_list.push(page_num);
    }
}

function next(num) {
    if (num < page_limit) {
        action(num+1);
        return;
    }

    finish();
}

function finish() {
    $('#___overlay').text('チェック完了');
    alert(card_list.slice(-1)[0].name + 'までの' + card_list.length + '枚中、' + unknown_card_list.length + '枚のカードが埋まっていませんでした。');

    var txt = $('<textarea>').addClass('textarea');
    txt.attr({
        rows : '10',
        style : 'width:280px;'
    });

    var today = new Date();
    var t = today.toLocaleDateString() + '時点\r\n';
    t += '埋まっていないカード数：' + unknown_card_list.length + '枚\r\n';
    t += '達成しているページ：' + completed_page_list.join(',') + '\r\n';
    t += '-----\r\n\r\n';

    $.each(unknown_card_list, function(index){
        t += unknown_card_list[index] + '\r\n';
    });

    txt.val(t);
    $('#wrapper').prepend(txt);
    $('#___overlay').remove();
}

function get(num) {
    var df = $.Deferred();
    $.ajax({
        url: 'http://imas.gree-apps.net/app/index.php/album/all_card_select/page/'+num,
        success: function(data){
            df.resolve(data);
        }
    });
    return df.promise();
}

var d=document;
var jq=d.createElement('script');
jq.src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
var cl=d.createElement('script');
cl.src='//rawgithub.com/treby/millimas-album/master/js/card_list_json.js';
jq.onload=function() {
    cl.onload=init;
    d.body.appendChild(cl);
};
d.body.appendChild(jq);

})();
