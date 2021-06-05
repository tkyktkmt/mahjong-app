const hand = () => {
  $(".pais").click(function () {
    let pai = $(this).attr("src");
    for(let x=1; x<=14; x++){
      if (!$(`#pai${x}`).attr("src")) {
        $(`#pai${x}`).attr("src",pai);
        break;
      }
    };
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