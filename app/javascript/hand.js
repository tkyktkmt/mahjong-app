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
  function wishPaiCheck() {
    
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