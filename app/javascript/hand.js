const hand = () => {
  $(".pais").click(function () {
    let paiSrc = $(this).attr("src");
    let paiName = $(this).attr("name");
    for(let x=1; x<=14; x++){
      if (!$(`#pai${x}`).attr("src")) {
        $(`#pai${x}`).removeAttr("name");
        $(`#pai${x}`).attr({src: paiSrc, name: paiName});
        const paiList = Array.prototype.slice.call($(".pai"));
        paiList.sort(function(a, b) {
          if (a.name - b.name > 0) {
          return 1;
          }
          else {
            return -1;
          }
        });
        
        // console.log(Object.values($(".pais")))
        // console.log(paiList)
        console.log(paiList[0].name)
        console.log(Object.values(paiList)[0].name)
        // $(".pai").removeAttr("src name");
        for (let y=0; y<paiList.length; y++) {
          var paiListNum = paiList[y].name;
          var paiNameNum = ($(`img[name="${paiListNum}"].pais`));
          var paiListSrc = paiNameNum.attr("src")
          $(`#pai${y+1}`).removeAttr("src name");
          $(`#pai${y+1}`).attr({src: paiListSrc, name: paiListNum});
        }
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