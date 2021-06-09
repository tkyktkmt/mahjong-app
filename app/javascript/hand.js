const hand = () => {
  $(".pais").click(function () {
    let paiSrc = $(this).attr("src");
    let paiName = $(this).attr("name");
    for(let x=1; x<=14; x++){
      if (!$(`#pai${900+x}`).attr("src")) {
        $(`#pai${900+x}`).attr({src: paiSrc, name: paiName});
        let paiList = Array.prototype.slice.call($(".pai"));
        paiList.sort(function(a, b) {
          if (a.name - b.name > 0) {
          return 1;
          }
          else {
            return -1;
          }
        });
        for (let y=0; y<=13; y++) {
          const paiListId = paiList[y].id;
          let detached = $(`#${paiListId}`).detach();
          $(".hand-table-tr").append($('<td />', {id: `pai${y+1}`, class: "hand-table-td"}).append(detached));
        }
        $(".hand-table-td:empty").remove();
        break;
      }  
    };
  });
  
  $(".pai").click(function() {
    $(this).removeAttr("src")
  });

  //jqueryを使わずに全牌種の要素を取得する場合
  // for(let i=0; i<=9; i++) {
  //   const mani = document.getElementById(`man${i}`);
  //   const soui = document.getElementById(`sou${i}`); 
  //   const pini = document.getElementById(`pin${i}`);
  // };
  // for(let i=1; i<=7; i++) {
  //   const jii = document.getElementById(`man${i}`);
  // };
};

window.addEventListener("load", hand );