const hand = () => {
  //クリックした牌を入力
  $(".pais").click(function () {
    //クリックした牌の牌画と牌名を取得
    let paiSrc = $(this).attr("src");
    let paiName = $(this).attr("name");
    for(let x=1; x<=14; x++){
      //手牌表示欄に左詰めで入力
      if (!$(`#pai${900+x}`).attr("src")) {
        $(`#pai${900+x}`).attr({src: paiSrc, name: paiName});
        sortHand();
        break;
      }  
    };
  });
  //クリックした牌を削除
  $(".pai").click(function() {
    $(this).removeAttr("src")
    $(this).attr("name", 915)
    sortHand();
  });
  
  function sortHand() {
    //手牌表示欄の牌姿を配列paiListとして抜きだす
    let paiList = Array.prototype.slice.call($(".pai"));
    //牌名順に並び替え（理牌）
    paiList.sort(function(a, b) {
      if (a.name - b.name > 0) {
      return 1;
      }
      else {
        return -1;
      }
    });

    for (let y=0; y<=13; y++) {
      //for文で理牌順になっているpaiListの要素を１つずつ順番に入手
      const paiListId = paiList[y].id;
      //paiListIdと同様のidをもつ手牌表示欄の要素を１つ削除
      let detached = $(`#${paiListId}`).detach();
      //削除した要素を手牌表示欄の最後尾に追加
      $(".hand-table-tr").append($('<td />', {id: `pai${y+1}`, class: "hand-table-td"}).append(detached));
    }
    //手牌表示欄の空のtdを削除してtdタグの総数を14に保つ
    $(".hand-table-td:empty").remove();
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