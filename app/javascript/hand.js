const hand = () => {
  //クリックした牌を入力
  $(".pais").click(function () {
    //クリックした牌の牌画と牌名を取得
    let paiSrc = $(this).attr("src");
    let paiName = $(this).attr("name");
    //手牌入力モード
    if (document.getElementById("mode1").checked){
      for(let x=1; x<=14; x++){
        //手牌表示欄に左詰めで入力
        if (!$(`#pai${900+x}`).attr("src")) {
          $(`#pai${900+x}`).attr({src: paiSrc, name: paiName});
          //手牌表示欄の牌姿を配列paiListとして抜きだす
          var paiList = Array.prototype.slice.call($(".pai"));
          var paiEditClassTr = $(".hand-table-tr");
          var paiEditClassTd = "hand-table-td"
          var paiEditId = "pai"
          sortHand(paiList, paiEditClassTr, paiEditId, paiEditClassTd);
          //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
          $(".hand-table-td:empty").remove();
          break;
        }; 
      };
    };
    //ポン・チー入力モード
    if (document.getElementById("mode2").checked || document.getElementById("mode3").checked){
      for(let y=1; y<=12; y++){
        if (!$(`#pai${800+y}`).attr("src")) {
          $(`#pai${800+y}`).attr({src: paiSrc, name: paiName});
          var huroCount = Math.floor((y+2)/3);
          var huroList = Array.prototype.slice.call($(`.huro-pai${huroCount}`));
          var huroEditClassTr = $(`.huro-table${huroCount}-tr`);
          var huroEditClassTd = `huro-table${huroCount}-td`;
          document.getElementById("mode2").checked ? huroEditId = `pon${huroCount}-` : huroEditId = `chii${huroCount}-`
          sortHand(huroList, huroEditClassTr, huroEditId, huroEditClassTd);
          //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
          $(`.huro-table${huroCount}-td:empty`).remove();
          //ポン・チーのvalidation設定
          //ポン入力時は同じ牌が３牌揃っていなければならない
          if ($(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("src")){
            if (!((huroList[0].name == huroList[1].name && huroList[1].name == huroList[2].name) ||
                (huroList[0].name == 5 && huroList[1].name == 5 && huroList[2].name == 5.1) ||
                (huroList[0].name == 15 && huroList[1].name == 15 && huroList[2].name == 15.1) ||
                (huroList[0].name == 25 && huroList[1].name == 25 && huroList[2].name == 25.1) )){
                  alert(`Error ：同じ牌を３つ選択してください`);
                  $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
                  paiId = $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
                  $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
                  return
            };
          };
          //チー入力時は３つの牌が連続していなければならない
          if ($(`#chii${huroCount}-3 > .huro-pai${huroCount}`).attr("src")){
            if (!((0.1 < huroList[1].name - huroList[0].name) && (huroList[1].name - huroList[0].name < 2) && 
                  (0.1 < huroList[2].name - huroList[1].name) && (huroList[2].name - huroList[1].name < 2))) {
                  alert(`Error ：連続する牌を３つを選択してください`);
                  $(`#chii${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
                  paiId = $(`#chii${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
                  $(`#chii${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
                  return
            };
          };
          break;
        }; 
      };
    };
    //暗カン・明カン入力モード
    if (document.getElementById("mode4").checked || document.getElementById("mode5").checked){
      for(let z=1; z<=12; z++){
        if (!$(`#pai${800+z}`).attr("src")) {
          var huroCount = Math.floor((z+2)/3);
          //入力済の牌を削除
          for (let w=1; w<=3; w++){
            if ($(`#huro-pai${huroCount}-${w} > .huro-pai${huroCount}`).length){
              var obstaclePai = $(`#huro-pai${huroCount}-${w} > .huro-pai${huroCount}`)
            }
            else if ($(`#pon${huroCount}-${w} > .huro-pai${huroCount}`).length){
              var obstaclePai = $(`#pon${huroCount}-${w} > .huro-pai${huroCount}`)
            }
            else if ($(`#chii${huroCount}-${w} > .huro-pai${huroCount}`).length){
              var obstaclePai = $(`#chii${huroCount}-${w} > .huro-pai${huroCount}`)
            }
            else if ($(`#ankan${huroCount}-${w} > .huro-pai${huroCount}`).length){
              var obstaclePai = $(`#ankan${huroCount}-${w} > .huro-pai${huroCount}`)
            }
            else if ($(`#minkan${huroCount}-${w} > .huro-pai${huroCount}`).length){
              var obstaclePai = $(`#minkan${huroCount}-${w} > .huro-pai${huroCount}`)
            };
            obstaclePai.removeAttr("src");
            paiId = obstaclePai.attr("id").replaceAll("pai", "");
            obstaclePai.attr("name", paiId);
          };
          //クリックした牌を３つ自動入力
          $(`.huro-pai${huroCount}`).attr({src: paiSrc, name: paiName});
          //手牌表示欄の牌姿を配列paiListとして抜きだす
          var huroList = Array.prototype.slice.call($(`.huro-pai${huroCount}`));
          var huroEditClassTr = $(`.huro-table${huroCount}-tr`);
          var huroEditClassTd = `huro-table${huroCount}-td`;
          document.getElementById("mode4").checked ? huroEditId = `ankan${huroCount}-` : huroEditId = `minkan${huroCount}-`
          sortHand(huroList, huroEditClassTr, huroEditId, huroEditClassTd);
          //見た目ではポンと区別がつかないので、暗カンor明カンを文字で表記
          if (document.getElementById("mode4").checked){
            $(`#ankan${huroCount}-1`).append("<p>暗</p>");
            $(`#ankan${huroCount}-2`).append("<p>カ</p>");
            $(`#ankan${huroCount}-3`).append("<p>ン</p>");
          }
          else{
            $(`#minkan${huroCount}-1`).append("<p>明</p>");
            $(`#minkan${huroCount}-2`).append("<p>カ</p>");
            $(`#minkan${huroCount}-3`).append("<p>ン</p>");
            $(`.huro-table${huroCount}-td > p`).css('background-color','gray');
          };
          //手牌表示欄の空のtdを削除してtdタグの総数を3に保つ
          $(`.huro-table${huroCount}-td:empty`).remove();
          break;
        }; 
      };
    };
    //ドラ入力モード
    if (document.getElementById("mode6").checked){
      $("#dora").attr({src: paiSrc, name: paiName});
    };
  });
  
  //削除機能
  //手牌削除
  $(".pai").click(function() {
    $(this).removeAttr("src")
    paiId = $(this).attr("id").replaceAll("pai", "")
    $(this).attr("name", paiId)
    var paiList = Array.prototype.slice.call($(".pai"));
    var paiEditClassTr = $(".hand-table-tr");
    var paiEditClassTd = "hand-table-td"
    var paiEditId = "pai"
    sortHand(paiList, paiEditClassTr, paiEditId, paiEditClassTd);
    //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
    $(".hand-table-td:empty").remove();
  });
  //ドラ削除
  $(".dora").click(function() {
    $(this).removeAttr("src")
  })
  //副露削除
  for (let i=1; i<=4; i++) {
    $(`.huro-pai${i}`).click(function() {
      $(this).removeAttr("src")
      $(`.huro-pai${i}`).next().remove();
      paiId = $(this).attr("id").replaceAll("pai", "")
      $(this).attr("name", paiId)
      var huroList = Array.prototype.slice.call($(`.huro-pai${i}`));
      var huroEditClassTr = $(`.huro-table${i}-tr`);
      var huroEditClassTd = `huro-table${i}-td`;
      var huroEditId = `huro-pai${i}-`
      sortHand(huroList, huroEditClassTr, huroEditId, huroEditClassTd);
      //副露表示欄の空のtdを削除してtdタグの総数を3に保つ
      $(`.huro-table${i}-td:empty`).remove();
    })
  }
  
  //理牌メソッド
  function sortHand(List, editClassTr, editId, editClassTd) {
    //牌名順に並び替え（理牌）
    List.sort(function(a, b) {
      if (a.name - b.name > 0) {
      return 1;
      }
      else {
        return -1;
      }
    });

    for (let j=0; j<List.length; j++) {
      //for文で理牌順になっているpaiListの要素を１つずつ順番に入手
      const ListId = List[j].id;
      //paiListIdと同様のidをもつ手牌表示欄の要素を１つ削除
      let detached = $(`#${ListId}`).detach();
      //削除した要素を手牌表示欄の最後尾に追加
      editClassTr.append($('<td />', {id: `${editId}${j+1}`, class: `${editClassTd}`}).append(detached));
    }
  };
  //打牌候補結果表示ボタンクリック時の処理
  $("#submit-btn-hand").click(function() {
    const handPaiArea = $('.pai, .huro-pai1, .huro-pai2, .huro-pai3, .huro-pai4');
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
      const syantenCountOutput = document.getElementById("syanten-count-wrap")
      syantenCountOutput.innerHTML = "";
      $('.wish-pai').attr({src: "", name: ""});
      const handPaiArea = $('.pai, .huro-pai1, .huro-pai2, .huro-pai3, .huro-pai4');
      let handPaiArray = Array.prototype.slice.call(handPaiArea);
      wishPaiCheck(syantenCheck(handPaiArray),handPaiArray);
    };
  });
  
  //シャンテン数算出
  function syantenCheck(handPaiArray) {
    var toitsuCount = 0;
    var zanteiSyantenCount = 0;
    var syantenCount=8;
    
    var manTatsuCount;
    var pinTatsuCount;
    var souTatsuCount;
    var jiTatsuCount;
    var koutsuCount=0;
   
    //マンズ関連
    var manMentsuMax=0;
    var manTatsuMax=0;

    //ピンズ関連
    var pinMentsuMax=0;
    var pinTatsuMax=0;

    //ソーズ関連
    var souMentsuMax=0;
    var souTatsuMax=0;

	  //字牌関連（ターツのみ）
    var jiTatsuMax=0;
    
    var huroMentsuCount = 0;
    var isolationKoutsuCount = 0;
    var isolationSyuntsuCount = 0;
    var isolationPaiCount = 0;
    
    //孤立メンツ、孤立牌はあらかじめ抜いておく
    var huroMentsuCount = huroMentsuCheck();
    var isolationKoutsuCount = isolationKoutsuCheck();
    var isolationSyuntsuCount = isolationSyuntsuCheck();
    var isolationPaiCount = isolationPaiCheck();
    
    //孤立のメンツ数をカウント
    var isolateMentsuCount = huroMentsuCount + isolationKoutsuCount + isolationSyuntsuCount;
    
    //孤立トイツの有無をチェック(ある場合は「1」、無い場合は「0」が格納)
    var isolationToitsuExistence = isolationToitsuCheck();

    //マンズピンズソーズ字牌の各々の有無をチェック(ある場合は「牌数」、無い場合は「0」が格納)
    var manExistence = 0;
    var pinExistence = 0;
    var souExistence = 0;
    var jiExistence = 0;
    [manExistence, pinExistence, souExistence, jiExistence] = existenceCheck();
    
    //ヘッドがある場合の処理
    for (var k=0;k<handPaiArray.length;k++) {
      //トイツの抜き出し
      if (k<handPaiArray.length-1 && Math.round(handPaiArray[k].name) == Math.round(handPaiArray[k+1].name)) {
        var zanteiToitsu = handPaiArray.splice(k,2);
        toitsuCount++;
      };
      var handPaiArrayCopy = $.extend(true, [], handPaiArray);
      //マンズがある場合のみ実行
      if (manExistence > 0) {
        [ manHandPaiArrayCopyCopy1, manMentsuTatsu1, manMentsu1, manTatsu1 ] = manMentsuTatsuCheck(1,handPaiArrayCopy);
        [ manHandPaiArrayCopyCopy2, manMentsuTatsu2, manMentsu2, manTatsu2 ] = manMentsuTatsuCheck(2,handPaiArrayCopy);
        if (manMentsuTatsu1 >= manMentsuTatsu2) {
          manMentsuMax = manMentsu1
          manTatsuMax = manTatsu1
          handPaiArrayCopy = manHandPaiArrayCopyCopy1
        }
        else {
          manMentsuMax = manMentsu2
          manTatsuMax = manTatsu2
          handPaiArrayCopy = manHandPaiArrayCopyCopy2
        };
      };
      //ピンズがある場合のみ実行
      if (pinExistence > 0) {
        [ pinHandPaiArrayCopyCopy1, pinMentsuTatsu1, pinMentsu1, pinTatsu1 ] = pinMentsuTatsuCheck(1,handPaiArrayCopy);
        [ pinHandPaiArrayCopyCopy2, pinMentsuTatsu2, pinMentsu2, pinTatsu2 ] = pinMentsuTatsuCheck(2,handPaiArrayCopy);
        if (pinMentsuTatsu1 >= pinMentsuTatsu2) {
          pinMentsuMax = pinMentsu1
          pinTatsuMax = pinTatsu1
          handPaiArrayCopy = pinHandPaiArrayCopyCopy1
        }
        else {
          pinMentsuMax = pinMentsu2
          pinTatsuMax = pinTatsu2
          handPaiArrayCopy = pinHandPaiArrayCopyCopy2
        };
      };
      //ソーズがある場合のみ実行
      if (souExistence > 0) {
        [ souHandPaiArrayCopyCopy1, souMentsuTatsu1, souMentsu1, souTatsu1 ] = souMentsuTatsuCheck(1,handPaiArrayCopy);
        [ souHandPaiArrayCopyCopy2, souMentsuTatsu2, souMentsu2, souTatsu2 ] = souMentsuTatsuCheck(2,handPaiArrayCopy);
        if (souMentsuTatsu1 >= souMentsuTatsu2) {
          souMentsuMax = souMentsu1
          souTatsuMax = souTatsu1
          handPaiArrayCopy = souHandPaiArrayCopyCopy1
        }
        else {
          souMentsuMax = souMentsu2
          souTatsuMax = souTatsu2
          handPaiArrayCopy = souHandPaiArrayCopyCopy2
        };
      };
      //字牌がある場合のみ実行
      if (jiExistence > 0) {
        [ handPaiArrayCopy, jiTatsuMax ] = jiTatsuCheck(handPaiArrayCopy);
      };
      //シャンテン数の算出
			zanteiSyantenCount = syantenHantei(toitsuCount, isolateMentsuCount);
			if (syantenCount > zanteiSyantenCount){syantenCount = zanteiSyantenCount};
      //アガリ状態なら即座に戻り値を返す
      if (syantenCount == -1) {return -1;};
      //抜き出していた暫定トイツを元に戻す
      if (zanteiToitsu) {
        handPaiArray.splice( k, 0, zanteiToitsu[0], zanteiToitsu[1] );
        toitsuCount--;
        zanteiToitsu = 0;
      };
    };
    //シャンテン数を結果表示画面に表示
    const syantenCountOutput = document.getElementById("syanten-count-wrap")
    syantenCountOutput.innerHTML = syantenCount;
    //シャンテン数と打牌候補を戻り値として返す
    return syantenCount;

    //シャンテン数算出関数
    function syantenHantei(toitsuCount, isolateMentsuCount) {
      var zanteiSyantenCount = 0;
      var blockCount = 0;
      blockCount = (manMentsuMax + pinMentsuMax + souMentsuMax + isolateMentsuCount) + (manTatsuMax + pinTatsuMax + souTatsuMax + jiTatsuMax + toitsuCount);
      if (blockCount > 4) {
        zanteiSyantenCount = 8 - (manMentsuMax + pinMentsuMax + souMentsuMax + isolateMentsuCount)*2 - (manTatsuMax + pinTatsuMax + souTatsuMax + jiTatsuMax) - toitsuCount*2 + (blockCount - 4);
      } 
      else {
        zanteiSyantenCount = 8 - (manMentsuMax + pinMentsuMax + souMentsuMax + isolateMentsuCount)*2 - (manTatsuMax + pinTatsuMax + souTatsuMax + jiTatsuMax) - toitsuCount;
      };
      return zanteiSyantenCount;
    };
    //字牌ターツを抜き出してカウント
    function jiTatsuCheck() {
      let handPaiArrayCopyCopy = $.extend(true, [], handPaiArrayCopy);
      var jiTatsuCount = 0;
      for (var j=0;j<handPaiArrayCopyCopy.length-1;j++) {
        if (handPaiArrayCopyCopy[j].name>=61 && handPaiArrayCopyCopy[j].name<=67 &&
          Math.round(handPaiArrayCopyCopy[j].name) == Math.round(handPaiArrayCopyCopy[j+1].name)) {
          handPaiArrayCopyCopy.splice(j,2);
          j--;
          jiTatsuCount++;
        };
      };
      return [handPaiArrayCopyCopy, jiTatsuCount];
    };
    //マンズのコーツ・シュンツ・ターツを抜き出してカウント
    //g=1:コーツ→シュンツ→ターツの順に抜く
    //g=2:シュンツ→コーツ→ターツの順に抜く
    function manMentsuTatsuCheck(g,handPaiArrayCopy) {
      let handPaiArrayCopyCopy = $.extend(true, [], handPaiArrayCopy);
      var manMentsuTatsuMax = 0;
      var manMentsu = 0;
      var manTatsu = 0;
      //マンズコーツを抜き出してカウント
      function manKoutsuCheck() {
        var manKoutsuCount =0;
        for (var f=0;f<handPaiArrayCopyCopy.length-2;f++) {
          if (handPaiArrayCopyCopy[f].name>=1 && handPaiArrayCopyCopy[f].name<=9 &&
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+1].name) && 
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+2].name)) {
            handPaiArrayCopyCopy.splice(f,3);
            f--;
            manKoutsuCount++;
          };
        };
        return manKoutsuCount;
      };
      if(g==1) {manMentsu += manKoutsuCheck();};
      //マンズシュンツを抜き出してカウント
      for (var h=0;h<handPaiArrayCopyCopy.length;h++) {
        if (handPaiArrayCopyCopy[h].name>=1 && handPaiArrayCopyCopy[h].name<=9 ) {
          function findFunc1(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1+0.1) {
              return elen.name;
            };
          };
          function findFunc2(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2+0.1) {
              return elen.name;
            };
          };
          //シュンツが存在する場合、その３枚を抜き出す
          if ((handPaiArrayCopyCopy.findIndex(findFunc2) != -1) && (handPaiArrayCopyCopy.findIndex(findFunc1) != -1) ) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc2),1);
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc1),1);
            handPaiArrayCopyCopy.splice(h,1);
            h--;
            manMentsu++;
          };
        };
      };
      if(g==2) {manMentsu += manKoutsuCheck();};
      //マンズのターツを抜き出してカウント
      for (var i=0;i<handPaiArrayCopyCopy.length;i++) {
        outer:
        if (handPaiArrayCopyCopy[i].name>=1 && handPaiArrayCopyCopy[i].name<=9) {
          //トイツの抜き出し
          if (i<handPaiArrayCopyCopy.length-1 && (Math.round(handPaiArrayCopyCopy[i].name) == Math.round(handPaiArrayCopyCopy[i+1].name))) { 
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            manTatsu++;
            break outer;
          };
          //リャンメン、ペンチャンの抜き出し
          function findFunc3(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc3) != -1) {
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            manTatsu++;
            break outer;
          };
          //カンチャンの抜き出し
          function findFunc4(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc4) != -1) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc4),1);
            handPaiArrayCopyCopy.splice(i,1);
            i--;
            manTatsu++;
            break outer;
          };
        };
      };
      //10の位にメンツ数、１の位にターツ数を格納し、manMentsuTatsuが大きい方の処理（g値）を採用
			manMentsuTatsuMax = manMentsu*10 + manTatsu;
      return [ handPaiArrayCopyCopy, manMentsuTatsuMax, manMentsu, manTatsu ];
    };
    //ピンズのコーツ・シュンツ・ターツを抜き出してカウント
    //g=1:コーツ→シュンツ→ターツの順に抜く
    //g=2:シュンツ→コーツ→ターツの順に抜く
    function pinMentsuTatsuCheck(g) {
      let handPaiArrayCopyCopy = $.extend(true, [], handPaiArrayCopy);
      var pinMentsuTatsuMax = 0;
      var pinMentsu = 0;
      var pinTatsu = 0;
      //ピンズコーツを抜き出してカウント
      function pinKoutsuCheck() {
        var pinKoutsuCount =0;
        for (var f=0;f<handPaiArrayCopyCopy.length-2;f++) {
          if (handPaiArrayCopyCopy[f].name>=21 && handPaiArrayCopyCopy[f].name<=29 &&
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+1].name) && 
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+2].name)) {
            handPaiArrayCopyCopy.splice(f,3);
            f--;
            pinKoutsuCount++;
          };
        };
        return pinKoutsuCount;
      };
      
      if(g==1) {pinMentsu += pinKoutsuCheck();};
      //ピンズシュンツを抜き出してカウント
      for (var h=0;h<handPaiArrayCopyCopy.length;h++) {
        if (handPaiArrayCopyCopy[h].name>=21 && handPaiArrayCopyCopy[h].name<=29 ) {
          function findFunc1(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1+0.1) {
              return elen.name;
            };
          };
          function findFunc2(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2+0.1) {
              return elen.name;
            };
          };
          //シュンツが存在する場合、その３枚を抜き出す
          if ((handPaiArrayCopyCopy.findIndex(findFunc2) != -1) && (handPaiArrayCopyCopy.findIndex(findFunc1) != -1) ) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc2),1);
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc1),1);
            handPaiArrayCopyCopy.splice(h,1);
            h--;
            pinMentsu++;
          };
        };
      };
      if(g==2) {pinMentsu += pinKoutsuCheck();};
      //ピンズのターツを抜き出してカウント
      for (var i=0;i<handPaiArrayCopyCopy.length;i++) {
        outer:
        if (handPaiArrayCopyCopy[i].name>=21 && handPaiArrayCopyCopy[i].name<=29) {
          //トイツの抜き出し
          if (i<handPaiArrayCopyCopy.length-1 && (Math.round(handPaiArrayCopyCopy[i].name) == Math.round(handPaiArrayCopyCopy[i+1].name))) { 
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            pinTatsu++;
            break outer;
          };
          //リャンメン、ペンチャンの抜き出し
          function findFunc3(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc3) != -1) {
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            pinTatsu++;
            break outer;
          };
          //カンチャンの抜き出し
          function findFunc4(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc4) != -1) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc4),1);
            handPaiArrayCopyCopy.splice(i,1);
            i--;
            pinTatsu++;
            break outer;
          };
        };
      };
      //10の位にメンツ数、１の位にターツ数を格納し、pinMentsuTatsuが大きい方の処理（g値）を採用
			pinMentsuTatsuMax = pinMentsu*10 + pinTatsu;
      return [ handPaiArrayCopyCopy, pinMentsuTatsuMax, pinMentsu, pinTatsu ];
    };
    //ソーズのコーツ・シュンツ・ターツを抜き出してカウント
    //g=1:コーツ→シュンツ→ターツの順に抜く
    //g=2:シュンツ→コーツ→ターツの順に抜く
    function souMentsuTatsuCheck(g) {
      let handPaiArrayCopyCopy = $.extend(true, [], handPaiArrayCopy);
      var souMentsuTatsuMax = 0;
      var souMentsu = 0;
      var souTatsu = 0;
      //ソーズコーツを抜き出してカウント
      function souKoutsuCheck() {
        var souKoutsuCount =0;
        for (var f=0;f<handPaiArrayCopyCopy.length-2;f++) {
          if (handPaiArrayCopyCopy[f].name>=41 && handPaiArrayCopyCopy[f].name<=49 &&
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+1].name) && 
            Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+2].name)) {
            handPaiArrayCopyCopy.splice(f,3);
            f--;
            souKoutsuCount++;
          };
        };
        return souKoutsuCount;
      };
      
      if(g==1) {souMentsu += souKoutsuCheck();};
      //ソーズシュンツを抜き出してカウント
      for (var h=0;h<handPaiArrayCopyCopy.length;h++) {
        if (handPaiArrayCopyCopy[h].name>=41 && handPaiArrayCopyCopy[h].name<=49 ) {
          function findFunc1(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1+0.1) {
              return elen.name;
            };
          };
          function findFunc2(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2+0.1) {
              return elen.name;
            };
          };
          //シュンツが存在する場合、その３枚を抜き出す
          if ((handPaiArrayCopyCopy.findIndex(findFunc2) != -1) && (handPaiArrayCopyCopy.findIndex(findFunc1) != -1) ) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc2),1);
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc1),1);
            handPaiArrayCopyCopy.splice(h,1);
            h--;
            souMentsu++;
          };
        };
      };
      if(g==2) {souMentsu += souKoutsuCheck();};
      //ソーズのターツを抜き出してカウント
      for (var i=0;i<handPaiArrayCopyCopy.length;i++) {
        outer:
        if (handPaiArrayCopyCopy[i].name>=41 && handPaiArrayCopyCopy[i].name<=49) {
          //トイツの抜き出し
          if (i<handPaiArrayCopyCopy.length-1 && (Math.round(handPaiArrayCopyCopy[i].name) == Math.round(handPaiArrayCopyCopy[i+1].name))) { 
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            souTatsu++;
            break outer;
          };
          //リャンメン、ペンチャンの抜き出し
          function findFunc3(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+1+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc3) != -1) {
            handPaiArrayCopyCopy.splice(i,2);
            i--;
            souTatsu++;
            break outer;
          };
          //カンチャンの抜き出し
          function findFunc4(elen) {
            if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2) {
              return elen.name;
            }
            else if (elen.name == Math.round(handPaiArrayCopyCopy[i].name)+2+0.1) {
              return elen.name;
            };
          };
          if (handPaiArrayCopyCopy.findIndex(findFunc4) != -1) {
            handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc4),1);
            handPaiArrayCopyCopy.splice(i,1);
            i--;
            souTatsu++;
            break outer;
          };
        };
      };
      //10の位にメンツ数、１の位にターツ数を格納し、souMentsuTatsuが大きい方の処理（g値）を採用
			souMentsuTatsuMax = souMentsu*10 + souTatsu;
      return [ handPaiArrayCopyCopy, souMentsuTatsuMax, souMentsu, souTatsu ];
    };

    //副露数算出
    function huroMentsuCheck() {
      huroMentsuCount += $('.huro-pai1, .huro-pai2, .huro-pai3, .huro-pai4').filter('img[src]').not('img[src=""]').length / 3; 
      //手牌配列から副露牌を削除
      handPaiArray.splice(0,12);
      return huroMentsuCount;
    };
    //完全孤立コーツ数算出
    function isolationKoutsuCheck(){
      //自牌の孤立コーツカウント(門前)
      for (var t=0;t<handPaiArray.length;t++) {
        if (handPaiArray[t].name>=61 && handPaiArray[t].name<=67 &&
          $(`img[name="${Math.round(handPaiArray[t].name)}"].pai`).length >= 3) {
          handPaiArray.splice(t,3);
          t--;
          isolationKoutsuCount++;
        };
      };
      //数牌の孤立コーツカウント(門前）
      for (var u=0;u<handPaiArray.length;u++) {
        if ($(`img.pai`).filter(`[name="${Math.round(handPaiArray[u].name)}"],[name="${Math.round(handPaiArray[u].name)+0.1}"]`).length >= 3 &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[u].name)-1}"],[name="${Math.round(handPaiArray[u].name)-1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[u].name)-2}"],[name="${Math.round(handPaiArray[u].name)-2+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[u].name)+1}"],[name="${Math.round(handPaiArray[u].name)+1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[u].name)+2}"],[name="${Math.round(handPaiArray[u].name)+2+0.1}"]`).length)) {
          handPaiArray.splice(u,3);
          u--;
          isolationKoutsuCount++;
        };
      };
      return isolationKoutsuCount;
    };
    //完全孤立シュンツ数算出
    function isolationSyuntsuCheck(){
      for (var v=0;v<handPaiArray.length;v++) {
        if (handPaiArray[v].name < 61  ) {
          if ((!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)-1}"],[name="${Math.round(handPaiArray[v].name)-1+0.1}"]`).length) &&
            (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)-2}"],[name="${Math.round(handPaiArray[v].name)-2+0.1}"]`).length) &&
            (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+3}"],[name="${Math.round(handPaiArray[v].name)+3+0.1}"]`).length) &&
            (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+4}"],[name="${Math.round(handPaiArray[v].name)+4+0.1}"]`).length)) {
            //一盃口でない場合
            if($(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)}"],[name="${Math.round(handPaiArray[v].name)+0.1}"]`).length == 1 &&
              $(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+1}"],[name="${Math.round(handPaiArray[v].name)+1+0.1}"]`).length == 1 &&
              $(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+2}"],[name="${Math.round(handPaiArray[v].name)+2+0.1}"]`).length == 1) {
              handPaiArray.splice(v,3);
              v--;
              isolationSyuntsuCount++;
            }
            //一盃口の場合
            else if($(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)}"],[name="${Math.round(handPaiArray[v].name)+0.1}"]`).length == 2 &&
              $(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+1}"],[name="${Math.round(handPaiArray[v].name)+1+0.1}"]`).length == 2 &&
              $(`img.pai`).filter(`[name="${Math.round(handPaiArray[v].name)+2}"],[name="${Math.round(handPaiArray[v].name)+2+0.1}"]`).length == 2) {
              handPaiArray.splice(v,6);
              v--;
              isolationSyuntsuCount+=2;
            };
          };
        };
      };
      return isolationSyuntsuCount;
    };
    //完全孤立牌数算出
    function isolationPaiCheck(){
      //自牌の孤立牌カウント
      for (var a=0;a<handPaiArray.length;a++) {
        if (handPaiArray[a].name>=61 && handPaiArray[a].name<=67 &&
          $(`img[name="${Math.round(handPaiArray[a].name)}"].pai`).length == 1) {
          handPaiArray.splice(a,1);
          a--;
          isolationPaiCount++;
        };
      };
      // 数牌の孤立牌カウント
      for (var b=0;b<handPaiArray.length;b++) {
        if ($(`img.pai`).filter(`[name="${Math.round(handPaiArray[b].name)}"],[name="${Math.round(handPaiArray[b].name)+0.1}"]`).length == 1 &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[b].name)-1}"],[name="${Math.round(handPaiArray[b].name)-1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[b].name)-2}"],[name="${Math.round(handPaiArray[b].name)-2+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[b].name)+1}"],[name="${Math.round(handPaiArray[b].name)+1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[b].name)+2}"],[name="${Math.round(handPaiArray[b].name)+2+0.1}"]`).length)) {
          handPaiArray.splice(b,1);
          b--;
          isolationPaiCount++;
        };
      };
      return isolationPaiCount;
    };
    //完全孤立トイツの有無チェック(有：return1  無：return0)
    function isolationToitsuCheck() {
      //自牌の孤立トイツチェック
      for (var c=0;c<handPaiArray.length;c++) {
        if (handPaiArray[c].name>=61 && handPaiArray[c].name<=67 &&
          $(`img[name="${Math.round(handPaiArray[c].name)}"].pai`).length == 2) {
          return 1;
        };
      };
      // 数牌の孤立トイツチェック
      for (var d=0;d<handPaiArray.length;d++) {
        if ($(`img.pai`).filter(`[name="${Math.round(handPaiArray[d].name)}"],[name="${Math.round(handPaiArray[d].name)+0.1}"]`).length == 2 &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[d].name)-1}"],[name="${Math.round(handPaiArray[d].name)-1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[d].name)-2}"],[name="${Math.round(handPaiArray[d].name)-2+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[d].name)+1}"],[name="${Math.round(handPaiArray[d].name)+1+0.1}"]`).length) &&
          (!$(`img.pai`).filter(`[name="${Math.round(handPaiArray[d].name)+2}"],[name="${Math.round(handPaiArray[d].name)+2+0.1}"]`).length)) {
          return 1;    
        };
      };
      return 0;
    };
    //マンズピンズソーズ字牌の有無チェック
    function existenceCheck() {
      for (var e=0;e<handPaiArray.length;e++) {
        if (handPaiArray[e].name>=1 && handPaiArray[e].name<=9) {
          manExistence++
        }
        else if (handPaiArray[e].name>=21 && handPaiArray[e].name<=29) {
          pinExistence++
        }
        else if (handPaiArray[e].name>=41 && handPaiArray[e].name<=49) {
          souExistence++
        }
        else if (handPaiArray[e].name>=61 && handPaiArray[e].name<=67) {
          jiExistence++
        };
      };
      return [manExistence, pinExistence, souExistence, jiExistence];
    };
  };
  //有効牌算出機能
  function wishPaiCheck(syantenResult,handPaiArray) {
    //14枚牌姿の時：シャンテン数を最小化する打牌候補それぞれに対し有効牌算出
    if (handPaiArray.length % 3 == 2 ) {
      
    }
    //13枚牌姿の時：有効牌算出
    else if (handPaiArray.length % 3 == 1 ) {
      //テンパイ字の和了牌算出
      if (syantenResult[0] == 0) {
        var machiTatsu = []
        for (var k=0;k<handPaiArray.length;k++) {
          //トイツの抜き出し
          if (k<handPaiArray.length-1 && Math.round(handPaiArray[k].name) == Math.round(handPaiArray[k+1].name)) {
            var zanteiToitsu = handPaiArray.splice(k,2);
          };
          let handPaiArrayCopy = $.extend(true, [], handPaiArray);
          //残ターツの抜き出し
          machiTatsu1 = agariPaiCheck(1,handPaiArrayCopy);
          machiTatsu2 = agariPaiCheck(2,handPaiArrayCopy);
          //machiTatsu1とmachiTatsu2の重複を排除しmachiTatsu2へ統合
          for (z=0;z<machiTatsu1.length;z++) {
            outer:
            for (a=0;a<machiTatsu2.length;a++) {
              if (machiTatsu1[z].length == 1 && machiTatsu2[a].length == 1 &&
                  Math.round(machiTatsu1[z][0].name) == Math.round(machiTatsu2[a][0].name)) {
                  machiTatsu1.splice(z,1);
                  z--;
                  break outer;
              }
              else if (machiTatsu1[z].length == 2 && machiTatsu2[a].length == 2 &&
                  Math.round(machiTatsu1[z][0].name) == Math.round(machiTatsu2[a][0].name) &&
                  Math.round(machiTatsu1[z][1].name) == Math.round(machiTatsu2[a][1].name)) {
                  machiTatsu1.splice(z,1);
                  z--;
                  break outer;
              };
            };
          };
          Array.prototype.push.apply(machiTatsu2, machiTatsu1);
          //machiTatsuとmachiTatsu2の重複を排除しmachiTatsuへ統合
          for (b=0;b<machiTatsu2.length;b++) {
            outer:
            for (c=0;c<machiTatsu.length;c++) {
              if (machiTatsu2[b].length == 1 && machiTatsu[c].length == 1 &&
                Math.round(machiTatsu2[b][0].name) == Math.round(machiTatsu[c][0].name)) {
                machiTatsu2.splice(b,1);
                b--;
                break outer;
              }
              else if (machiTatsu2[b].length == 2 && machiTatsu[c].length == 2 &&
                  Math.round(machiTatsu2[b][0].name) == Math.round(machiTatsu[c][0].name) &&
                  Math.round(machiTatsu2[b][1].name) == Math.round(machiTatsu[c][1].name)) {
                  machiTatsu2.splice(b,1);
                  b--;
                  break outer;
              };
            };
          };
          Array.prototype.push.apply(machiTatsu, machiTatsu2);
          //抜き出していた暫定トイツを元に戻す
          if (zanteiToitsu) {
            handPaiArray.splice( k, 0, zanteiToitsu[0], zanteiToitsu[1] );
            zanteiToitsu = 0;
          };
        };
        var machiPaiArray = [];
        for (d=0;d<machiTatsu.length;d++) {
          //単騎の待ち牌
          if (machiTatsu[d].length == 1) {
            Array.prototype.push.apply(machiPaiArray, machiTatsu[d]);
          }
          //単騎以外の待ち牌
          else if (machiTatsu[d].length == 2) {
            //シャンポン等トイツの待ち牌
            if (Math.round(machiTatsu[d][0].name) == Math.round(machiTatsu[d][1].name)) {
              // Array.prototype.push.apply(machiPaiArray, machiTatsu[d][0])は使えない
              machiPaiArray.push(machiTatsu[d][0]);
            }
            else if (Math.round(machiTatsu[d][0].name) + 1 == Math.round(machiTatsu[d][1].name )) {
              //ペンチャンの待ち牌
              if ( Math.round(machiTatsu[d][0].name) == 1 ) {
                Array.prototype.push.apply(machiPaiArray, $(`img.pais`).filter(`[name="${Math.round(machiTatsu[d][0].name)+2}"]`))
              }
              else if ( Math.round(machiTatsu[d][1].name) == 9 ) {
                Array.prototype.push.apply(machiPaiArray, $(`img.pais`).filter(`[name="${Math.round(machiTatsu[d][1].name)-2}"]`))
              }
              //リャンメンの待ち牌
              else  {
                Array.prototype.push.apply(machiPaiArray, $(`img.pais`).filter(`[name="${Math.round(machiTatsu[d][0].name)-1}"]`))
                Array.prototype.push.apply(machiPaiArray, $(`img.pais`).filter(`[name="${Math.round(machiTatsu[d][1].name)+1}"]`))
              };
            }
            //カンチャンの待ち牌
            else if (Math.round(machiTatsu[d][0].name) + 2 == Math.round(machiTatsu[d][1].name )) {
              Array.prototype.push.apply(machiPaiArray, $(`img.pais`).filter(`[name="${Math.round(machiTatsu[d][0].name)+1}"]`))
            }
          };
        };
        //machiPaiArrayの重複を削除
        machiPaiArray = machiPaiArray.filter((elem, index, array) => 
        array.findIndex(e => 
          e.src === elem.src && e.name === elem.name
          ) === index
          );
        //machiPaiArrayを理牌
        machiPaiArray.sort(function(a, b) {
          if (a.name - b.name > 0) {
          return 1;
          }
          else {
            return -1;
          }
        });
        //machiPaiArrayをアガリ牌一覧に表示
        for(x=0; x<machiPaiArray.length; x++) {
          var paiSrc = $('img.pais').filter(`[name="${Math.round(machiPaiArray[x].name)}"]`).attr("src");
          var paiName = $('img.pais').filter(`[name="${Math.round(machiPaiArray[x].name)}"]`).attr("name");
          $(`#pai${701+x}`).attr({src: paiSrc, name: paiName});
        };
      };
    };
    //和了牌を算出
    //g=1:コーツ→シュンツ順に抜く
    //g=2:シュンツ→コーツ順に抜く
    function agariPaiCheck(g,handPaiArrayCopy) {
      var zanteiMachiTatsu = []
      for (var x=0;x<handPaiArrayCopy.length;x++) {
        let handPaiArrayCopyCopy = $.extend(true, [], handPaiArrayCopy);
        //マンピンソーのコーツを抜き出してカウント
        for (var y=0;y<=40;y+=20) {
          function manKoutsuCheck() {
            for (var f=0;f<handPaiArrayCopyCopy.length-2;f++) {
              if (handPaiArrayCopyCopy[f].name>=y+1 && handPaiArrayCopyCopy[f].name<=y+9 &&
                Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+1].name) && 
                Math.round(handPaiArrayCopyCopy[f].name) == Math.round(handPaiArrayCopyCopy[f+2].name)) {
                handPaiArrayCopyCopy.splice(f,3);
                f--;
              };
            };
          };
          if(g==1) {manKoutsuCheck();};
          //マンピンソーのシュンツを抜き出してカウント
          for (var h=0;(h+x)<handPaiArrayCopyCopy.length;h++) {
            if (handPaiArrayCopyCopy[h+x].name>=y+1 && handPaiArrayCopyCopy[h+x].name<=y+9 ) {
              function findFunc1(elen) {
                if (elen.name == Math.round(handPaiArrayCopyCopy[h+x].name)+1) {
                  return elen.name;
                }
                else if (elen.name == Math.round(handPaiArrayCopyCopy[h+x].name)+1+0.1) {
                  return elen.name;
                };
              };
              function findFunc2(elen) {
                if (elen.name == Math.round(handPaiArrayCopyCopy[h+x].name)+2) {
                  return elen.name;
                }
                else if (elen.name == Math.round(handPaiArrayCopyCopy[h+x].name)+2+0.1) {
                  return elen.name;
                };
              };
              //シュンツが存在する場合、その３枚を抜き出す
              if ((handPaiArrayCopyCopy.findIndex(findFunc2) != -1) && (handPaiArrayCopyCopy.findIndex(findFunc1) != -1) ) {
                handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc2),1);
                handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc1),1);
                handPaiArrayCopyCopy.splice(h+x,1);
                h--;
              };
            };
          };
          //マンピンソーのシュンツを抜き出してカウント2
          if (x>=3) {
            for (var h=0;(h)<handPaiArrayCopyCopy.length;h++) {
              if (handPaiArrayCopyCopy[h].name>=y+1 && handPaiArrayCopyCopy[h].name<=y+9 ) {
                function findFunc1(elen) {
                  if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1) {
                    return elen.name;
                  }
                  else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+1+0.1) {
                    return elen.name;
                  };
                };
                function findFunc2(elen) {
                  if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2) {
                    return elen.name;
                  }
                  else if (elen.name == Math.round(handPaiArrayCopyCopy[h].name)+2+0.1) {
                    return elen.name;
                  };
                };
                //シュンツが存在する場合、その３枚を抜き出す
                if ((handPaiArrayCopyCopy.findIndex(findFunc2) != -1) && (handPaiArrayCopyCopy.findIndex(findFunc1) != -1) ) {
                  handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc2),1);
                  handPaiArrayCopyCopy.splice(handPaiArrayCopyCopy.findIndex(findFunc1),1);
                  handPaiArrayCopyCopy.splice(h,1);
                  h--;
                };
              };
            };
          };
          if(g==2) { manKoutsuCheck();};
        };
        //待ちになるターツ候補を追加
        for (z=0;z<zanteiMachiTatsu.length;z++) {
          if (handPaiArrayCopyCopy.length >= 3) {
            break;
          }
          else if (handPaiArrayCopyCopy.length == 1 && zanteiMachiTatsu[z].length == 1 &&
             Math.round(handPaiArrayCopyCopy[0].name) == Math.round(zanteiMachiTatsu[z][0].name)) {
             handPaiArrayCopyCopy.splice(z,1)
             break;
          }
          else if (handPaiArrayCopyCopy.length == 2 && zanteiMachiTatsu[z].length == 2 &&
                   Math.round(handPaiArrayCopyCopy[0].name) == Math.round(zanteiMachiTatsu[z][0].name) &&
                   Math.round(handPaiArrayCopyCopy[1].name) == Math.round(zanteiMachiTatsu[z][1].name)) {
                   handPaiArrayCopyCopy.splice(z,2)
                   break;
          };
        };
        if (handPaiArrayCopyCopy.length == 1 ) {
            zanteiMachiTatsu.push(handPaiArrayCopyCopy)
        }
        else if (handPaiArrayCopyCopy.length == 2) {
          if (Math.round(handPaiArrayCopyCopy[0].name) == Math.round(handPaiArrayCopyCopy[1].name) ||
              Math.round(handPaiArrayCopyCopy[0].name )+ 1 == Math.round(handPaiArrayCopyCopy[1].name) || 
              Math.round(handPaiArrayCopyCopy[0].name) + 2 == Math.round(handPaiArrayCopyCopy[1].name)) {
              zanteiMachiTatsu.push(handPaiArrayCopyCopy)
          };
        };
      };
      return zanteiMachiTatsu;
    };
  };
};

window.addEventListener("load", hand );

//jqueryを使わずに全牌種の要素を取得する場合
// for(let i=0; i<=9; i++) {
//   const mani = document.getElementById(`man${i}`);
//   const soui = document.getElementById(`sou${i}`); 
//   const pini = document.getElementById(`pin${i}`);
// };
// for(let i=1; i<=7; i++) {
//   const jii = document.getElementById(`man${i}`);
// };