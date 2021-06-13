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
          let paiList = Array.prototype.slice.call($(".pai"));
          let paiEditClassTr = $(".hand-table-tr");
          let paiEditClassTd = "hand-table-td"
          let paiEditId = "pai"
          sortHand(paiList, paiEditClassTr, paiEditId, paiEditClassTd);
          //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
          $(".hand-table-td:empty").remove();
          break;
        }; 
      };
    };
    //ポン入力モード
    if (document.getElementById("mode2").checked){
      for(let x=1; x<=12; x++){
        if (!$(`#pai${800+x}`).attr("src")) {
          $(`#pai${800+x}`).attr({src: paiSrc, name: paiName});
          let huroCount = Math.floor((x+2)/3);
          let ponList = Array.prototype.slice.call($(`.huro-pai${huroCount}`));
          let ponEditClassTr = $(`.huro-table${huroCount}-tr`);
          let ponEditClassTd = `huro-table${huroCount}-td`;
          let ponEditId = `pon${huroCount}-`
          sortHand(ponList, ponEditClassTr, ponEditId, ponEditClassTd);
          //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
          $(`.huro-table${huroCount}-td:empty`).remove();
          //ポン入力時は同じ牌が３牌揃っていなければならない
          if ($(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("src")){
            if (!((ponList[0].name == ponList[1].name && ponList[1].name == ponList[2].name) ||
                 (ponList[0].name == 5 && ponList[1].name == 5 && ponList[2].name == 5.5) ||
                 (ponList[0].name == 15 && ponList[1].name == 15 && ponList[2].name == 15.5) ||
                 (ponList[0].name == 15 && ponList[1].name == 25 && ponList[2].name == 25.5) )){
                  alert(`Error ：同じ牌を選択してください`);
                  $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
                  paiId = $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
                  $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
                  return
            };
          };
          // if ($(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("src")){
          //   if (paiName == 5.5 || paiName == 15.5 || paiName == 25.5 ) {
          //     if (!($(`#pon${huroCount}-1 > .huro-pai${huroCount}`).attr("name") == $(`#pon${huroCount}-2 > .huro-pai${huroCount}`).attr("name") == (paiName-0.5))) {
          //       alert(`Error ：同じ牌を選択してください`);
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
          //       paiId = $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
          //       return
          //     };
          //   } else if(paiName == 5 || paiName == 15 || paiName == 25 ) {
          //     if (!(paiName==$(`#pon${huroCount}-1 > .huro-pai${huroCount}`).attr("name") && paiName==$(`#pon${huroCount}-2 > .huro-pai${huroCount}`).attr("name"))||
          //       (paiName==$(`#pon${huroCount}-1 > .huro-pai${huroCount}`).attr("name") && (paiName+0.5)==$(`#pon${huroCount}-2 > .huro-pai${huroCount}`).attr("name"))||
          //       ((paiName+0.5)==$(`#pon${huroCount}-1 > .huro-pai${huroCount}`).attr("name") && paiName==$(`#pon${huroCount}-2 > .huro-pai${huroCount}`).attr("name"))){
          //       alert(`Error ：同じ牌を選択してください`);
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
          //       paiId = $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
          //       return
          //     };
          //   } else {
          //     if (!(paiName==$(`#pon${huroCount}-1 > .huro-pai${huroCount}`).attr("name") && paiName==$(`#pon${huroCount}-2 > .huro-pai${huroCount}`).attr("name"))){
          //       alert(`Error ：同じ牌を選択してください`);
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).removeAttr("src");
          //       paiId = $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("id").replaceAll("pai", "")
          //       $(`#pon${huroCount}-3 > .huro-pai${huroCount}`).attr("name", paiId)
          //       return
          //     };
          //   };
          // };
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
    let paiList = Array.prototype.slice.call($(".pai"));
    let paiEditClassTr = $(".hand-table-tr");
    let paiEditClassTd = "hand-table-td"
    let paiEditId = "pai"
    sortHand(paiList, paiEditClassTr, paiEditId, paiEditClassTd);
    //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
    $(".hand-table-td:empty").remove();
  });
  //ドラ削除
  $(".dora").click(function() {
    $(this).removeAttr("src")
  })
  //副露削除
  for (let x=1; x<=4; x++) {
    $(`.huro-pai${x}`).click(function() {
      $(this).removeAttr("src")
      paiId = $(this).attr("id").replaceAll("pai", "")
      $(this).attr("name", paiId)
      let ponList = Array.prototype.slice.call($(`.huro-pai${x}`));
      let ponEditClassTr = $(`.huro-table${x}-tr`);
      let ponEditClassTd = `huro-table${x}-td`;
      let ponEditId = `pon${x}-`
      sortHand(ponList, ponEditClassTr, ponEditId, ponEditClassTd);
      //鼻腔欄の空のtdを削除してtdタグの総数を3に保つ
      $(`.huro-table${x}-td:empty`).remove();
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

    for (let y=0; y<List.length; y++) {
      //for文で理牌順になっているpaiListの要素を１つずつ順番に入手
      const ListId = List[y].id;
      //paiListIdと同様のidをもつ手牌表示欄の要素を１つ削除
      let detached = $(`#${ListId}`).detach();
      //削除した要素を手牌表示欄の最後尾に追加
      editClassTr.append($('<td />', {id: `${editId}${y+1}`, class: `${editClassTd}`}).append(detached));
    }
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