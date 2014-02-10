(function(){
// 現在対応しているページ数
var MAX_PAGE = 37;

var total = 0;
var pointer = 1;
var card_list;
var unknown_list = new Array();    // 未知のカードリスト

function action(num) {
    if(typeof num !== 'number') {
        num = 0;
        card_list = ___millimas_card_list;
        $('<div/>').css({
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
        }).attr('id', '___overlay').text('アルバム埋まってないのサーチ').appendTo('body');
        action_confirm = 
        total = 0;
        if (!confirm('集計を始めるの')) {
            $('#___overlay').remove();
            return;
        }
    }

    var progress = load(num);
    $('#___overlay').text(num+'ページ目を集計中なの！');
    progress.done(function(page_total){
        total += page_total;

        if (num < MAX_PAGE) {
            action(num+1);
        } else {
            // 集計完了 
            $('#___overlay').text('集計完了なの！');
            alert(unknown_list.length+'枚のカードが埋まってないの！');

            var txt = $('<textarea>').addClass('textarea');
            txt.attr({
                rows : '10',
                style : 'width:280px;'
            });
            var t = '';
            $.each(unknown_list, function(index){
                t += unknown_list[index] +'\r\n';
            });

            txt.val(t);
            $('#wrapper').prepend(txt);
            $('#___overlay').remove();
        }
    }).fail(function(){
        alert('fail:' + total);
        $('#___overlay').remove();
    });
}

function load(num) {
    var df = $.Deferred();
    var page = get(num);
    page.done(function(data){
        var dom = $.parseHTML(data);
        var _total = 0;

        $(dom).find('.s-mb').each(function(i){
            anchor_elm = $('a', $(this)).html();
            if (typeof anchor_elm !== 'undefined') {
                _total++;
            } else {
                if (card_list.hasOwnProperty(pointer)) {
                    unknown_list.push(card_list[pointer][2] + ' ' + card_list[pointer][3]);
                }
            }

            pointer++;
        });

        if(_total === 0) df.reject();
        else df.resolve(_total);
    });

    return df.promise();
}

function get(num) {
    var df = $.Deferred();
    $.ajax({
        url: 'http://imas.gree-apps.net/app/index.php/album/all_card_select/page/'+(num+1),
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
cl.src='//raw.github.com/treby/millimas-album/master/js/card_list_json.js';
jq.onload=function() {
    cl.onload=action;
    d.body.appendChild(cl);
};
d.body.appendChild(jq);

})();
