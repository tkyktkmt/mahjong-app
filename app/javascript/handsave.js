const handSave = () => {
    $("#submit-btn-hand-save").click(function(e) {
        e.preventDefault();
        const handFormResult = document.getElementById("hand-form");
        const handPaiArea = $('.pai, .huro-pai1, .huro-pai2, .huro-pai3, .huro-pai4');
        //非表示フォームに手牌を入力
        $(".pai").each(function(k){
        var handPaiSrc = $(this).attr('src');
        $(`#hand_pai${k+1}`).val(`${handPaiSrc}`);
        });
        //非表示フォームに副露牌を入力
        for (let l=1; l<=4; l++) {
        $(`.huro-pai${l}`).each(function(m){
            var huroPaiSrc = $(this).attr('src');
            $(`#hand_huro${l}_${m+1}`).val(`${huroPaiSrc}`);
        });
        };
        //非表示フォームにドラを入力
        var doraPaiSrc = $(".dora").attr("src");
        $("#hand_dora").val(doraPaiSrc);
        
        //validation設定
        //手牌総数カウント変数を定義
        let handPaiCount = handPaiArea.length
        - handPaiArea.not('img[src]').length
        - ($('img[src=""].pai').length)
        - ($('img[src=""].huro-pai1').length) 
        - ($('img[src=""].huro-pai2').length)
        - ($('img[src=""].huro-pai3').length) 
        - ($('img[src=""].huro-pai4').length);
        //手牌の重複カウント用に手牌配列を設定
        let handPaiArray = Array.prototype.slice.call(handPaiArea);
        let handSamePaiCount = {};
        //牌の重複をカウント
        for (var n=0;n< handPaiArray.length;n++) {
        var key = Math.round(handPaiArray[n].name);
        handSamePaiCount[key] = (handSamePaiCount[key])? handSamePaiCount[key] + 1 : 1 ;
        if (handSamePaiCount[key] > 4) { 
        break;
        };
        }
        //赤牌の重複をカウント
        for(var p=0;p< handPaiArray.length;p++) {
        if ((Math.round(handPaiArray[p].name % 1 * 10) / 10 ) == 0.1) {
            var redKey = handPaiArray[p].name;
            handSamePaiCount[redKey] = (handSamePaiCount[redKey])? handSamePaiCount[redKey] + 1 : 1 ;
            if (handSamePaiCount[redKey] > 1) { 
            break;
            };
        };
        }
        //カンの重複をカウント
        outer:
        for (var q=1;q<=4;q++) {
        if ($(`#ankan${q}-1, #minkan${q}-1`).length) {
            for (var r=0;r< handPaiArray.length;r++) {
            if (Math.round(handPaiArray[r].name) == Math.round($(`#ankan${q}-1, #minkan${q}-1`).children(`.huro-pai${q}`).attr("name"))) {
                var kanKey = Math.round(handPaiArray[r].name)
                handSamePaiCount[kanKey] = (handSamePaiCount[kanKey])? handSamePaiCount[kanKey] + 1 : 1 ;
                if (handSamePaiCount[kanKey] > 3) { 
                break outer;
                };
            };
            }
        };
        }
        //手牌の総数は13枚もしくは14枚入力されていなければならない
        if (!(handPaiCount == 13 || handPaiCount == 14)) {
        alert(`Error ：手牌の総数は13枚もしくは14枚選択してください`);
        }
        //１副露あたり３枚入力されていなければならない
        else if (
        !(($('img[src=""].huro-pai1').length + $('.huro-pai1').not('img[src]').length) % 3 == 0 && 
          ($('img[src=""].huro-pai2').length + $('.huro-pai2').not('img[src]').length) % 3 == 0 && 
          ($('img[src=""].huro-pai3').length + $('.huro-pai3').not('img[src]').length) % 3 == 0 && 
          ($('img[src=""].huro-pai4').length + $('.huro-pai4').not('img[src]').length) % 3 == 0 )) {
        alert(`Error ：副露牌に入力漏れがあります`);
        }
        //同じ牌は最大４枚しか入力できない
        else if (handSamePaiCount[key] > 4) {
        alert(`Error ：同じ牌は最大４枚しか存在しません`);
        }
        //赤牌は各１枚しか入力できない
        else if (handSamePaiCount[redKey] > 1) { 
        alert(`Error ：赤牌は１枚ずつしか存在しません`);
        }
        //同じ牌は最大４枚しか入力できない(カンの場合)
        else if (handSamePaiCount[kanKey] > 3) { 
        alert(`Error ：同じ牌は最大４枚しか存在しません`);
        }
        else {
        handFormResult.submit();
        };
    });
};

window.addEventListener("load", handSave );
