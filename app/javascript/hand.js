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

  $("#submit-btn-hand").click(function(e) {
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
      debugger;
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