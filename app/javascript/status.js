const status = () => {
  const scoreGapEast = document.getElementById("score-gap-east");
  const eastTsumo = document.getElementById("east-tsumo");
  const eastRonFromEast = document.getElementById("east-ron-from-east");
  const eastRonFromSouth = document.getElementById("east-ron-from-south");
  const eastRonFromWest = document.getElementById("east-ron-from-west");
  const eastRonFromNorth = document.getElementById("east-ron-from-north");
  const scoreGapSouth = document.getElementById("score-gap-south");
  const southTsumo = document.getElementById("south-tsumo");
  const southRonFromSouth = document.getElementById("south-ron-from-south");
  const southRonFromEast = document.getElementById("south-ron-from-east");
  const southRonFromWest = document.getElementById("south-ron-from-west");
  const southRonFromNorth = document.getElementById("south-ron-from-north");
  const scoreGapWest = document.getElementById("score-gap-west");
  const westTsumo = document.getElementById("west-tsumo");
  const westRonFromWest = document.getElementById("west-ron-from-west");
  const westRonFromEast = document.getElementById("west-ron-from-east");
  const westRonFromSouth = document.getElementById("west-ron-from-south");
  const westRonFromNorth = document.getElementById("west-ron-from-north");
  const scoreGapNorth = document.getElementById("score-gap-north");
  const northTsumo = document.getElementById("north-tsumo");
  const northRonFromNorth = document.getElementById("north-ron-from-north");
  const northRonFromEast = document.getElementById("north-ron-from-east");
  const northRonFromSouth = document.getElementById("north-ron-from-south");
  const northRonFromWest = document.getElementById("north-ron-from-west");
  const tsumoHashOya = {"500":2000, "700":2800, "800":3200, "1000":4000, "1300":5200, "1600":6400, "2000":8000, "2600":10400, "3200":12800, "3900":15600, "4000":16000,
                        "6000":24000, "8000":32000, "12000":48000, "16000":64000};
  const tsumoHashToOya = {"300-500":1600, "400-700":2200, "400-800":2400, "500-1000":3000, "700-1300":4000, "800-1600":4800, "1000-2000":6000, "1300-2600":7800, "1600-3200":9600, "2000-3900":11800, "2000-4000":12000,
                         "3000-6000":18000, "4000-8000":24000, "6000-12000":36000, "8000-16000":48000};
  const tsumoHash = {"300-500":1400, "400-700":1900, "400-800":2000, "500-1000":2500, "700-1300":3400, "800-1600":4000, "1000-2000":5000, "1300-2600":6500, "1600-3200":8000, "2000-3900":9900, "2000-4000":10000,
                      "3000-6000":15000, "4000-8000":20000, "6000-12000":30000, "8000-16000":40000}; 
  const ronHashOya = {"1500":3000, "2000":4000, "2400":4800, "2900":5800, "3900":7800, "4800":9600, "5800":11600, "7700":15400, "9600":19200, "11600":23200, "12000":24000,
                      "18000":36000, "24000":48000, "36000":72000, "48000":96000};  
  const ronHash = {"1000":2000, "1300":2600, "1600":3200, "2000":4000, "2600":5200, "3200":6400, "3900":7800, "5200":10400, "6400":12800, "7700":15600, "8000":16000,
                    "12000":24000, "16000":32000, "24000":48000, "32000":64000};   
  //配列の１要素に"value"を２項目ずつ格納したhashを組み込む記述方法。forEachで"value.label"や"value.score"でそれぞれの値を取得できる。
  // const tsumoListsOya = [{ label: "500", score: 2000},{label: "700", score:2800}, {label: "800", score:3200}, {label:"1000", score:4000}, {label:"1300", score:5200}, {label:"1600", score:6400}, {label:"2000", score:8000}, {label:"2600", score:10400}, {label:"3200", score:12800}, {label:"3900", score:15600}, {label:"4000", score:16000},
  //                       {label:"6000", score:24000}, {label:"8000", score:32000}, {label: "12000", score:48000}, {label: "16000", score:64000}];                 
  // console.log((Object.values(tsumoListsOya)).label);
  // console.log(tsumoListsOya[1].score);
  // console.log(tsumoListsOya["500"]);
  
  //hashから要素を取り出す方法
  // console.log(tsumoHashOya[500]);
  // console.log(Object.values(tsumoHashOya)[0]);
  // console.log(Object.keys(tsumoHashOya)[0]);
  // console.log(Object.entries(tsumoHashOya)[0]);
  // console.log(Object.entries(tsumoHashOya).length);
  
  const inputForm = document.getElementById("submit-btn-input");
  
  inputForm.addEventListener("click",(e) => {
    e.preventDefault();
    const formResult = document.getElementById("status-form");
    const formData = new FormData(formResult);

    const stat = {
      round_wind: formData.get("status[round_wind_id]"),
      stacking_bar: formData.get("status[stacking_bar_id]"),
      deposit: formData.get("status[deposit_id]"),
      score_east: formData.get("status[score_east]"),
      score_south: formData.get("status[score_south]"),
      score_west: formData.get("status[score_west]"),
      score_north: formData.get("status[score_north]"),
      seat_wind: formData.get("status[seat_wind]"),
    };
    //合計が100000でない場合はデータ出力しない
    if (!((stat.score_east * 1) + (stat.score_south * 1) + (stat.score_west * 1) + (stat.score_north * 1) + (stat.deposit * 1) == 100000)){
      alert(`Error ：Please make sum of score and deposit 100,000`);
      return
    }
    else {
      //親番の時の必要打点出力
      if (stat.seat_wind === "東"){
        //自家と他家の点数差出力
        scoreGapEast.innerHTML = stat.score_east - stat.score_east
        scoreGapSouth.innerHTML = stat.score_south - stat.score_east
        scoreGapWest.innerHTML = stat.score_west - stat.score_east
        scoreGapNorth.innerHTML = stat.score_north - stat.score_east
        //ツモ時の必要打点
        eastTsumo.innerHTML = "----"
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashOya).length; i++) {
            let result = (Object.values(tsumoHashOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southTsumo.innerHTML = (Object.keys(tsumoHashOya)[i]);
              break;
            };
          };
        }
        else {southTsumo.innerHTML = "----"}
        if (scoreGapWest.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashOya).length; i++) {
            let result = (Object.values(tsumoHashOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westTsumo.innerHTML = (Object.keys(tsumoHashOya)[i]);
              break;
            };
          };
        }
        else {westTsumo.innerHTML = "----"}
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashOya).length; i++) {
            let result = (Object.values(tsumoHashOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northTsumo.innerHTML = (Object.keys(tsumoHashOya)[i]);
              break;
            };
          };
        }
        else {northTsumo.innerHTML = "----"}
        //ロン時の必要打点
        eastRonFromEast.innerHTML = "----"
        eastRonFromSouth.innerHTML = "----"
        eastRonFromWest.innerHTML = "----"
        eastRonFromNorth.innerHTML = "----"
        //ロン時の必要打点（南家をまくる打点）
        southRonFromEast.innerHTML = "----"
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromSouth.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromWest.innerHTML = (Object.keys(ronHashOya)[i]);
              southRonFromNorth.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
        }
        else {
          southRonFromSouth.innerHTML = "----"
          southRonFromWest.innerHTML = "----"
          southRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（西家をまくる打点）
        westRonFromEast.innerHTML = "----"
        if (scoreGapWest.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromWest.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromSouth.innerHTML = (Object.keys(ronHashOya)[i]);
              westRonFromNorth.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
        }
        else {
          westRonFromSouth.innerHTML = "----"
          westRonFromWest.innerHTML = "----"
          westRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（北家をまくる打点）
        northRonFromEast.innerHTML = "----"
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromNorth.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHashOya).length; i++) {
            let result = (Object.values(ronHashOya)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromSouth.innerHTML = (Object.keys(ronHashOya)[i]);
              northRonFromWest.innerHTML = (Object.keys(ronHashOya)[i]);
              break;
            };
          };
        }
        else {
          northRonFromSouth.innerHTML = "----"
          northRonFromWest.innerHTML = "----"
          northRonFromNorth.innerHTML = "----"
        }
      };
      //南家の時の必要打点出力
      if (stat.seat_wind === "南"){
        //自家と他家の点数差出力
        scoreGapEast.innerHTML = stat.score_east - stat.score_south
        scoreGapSouth.innerHTML = stat.score_south - stat.score_south
        scoreGapWest.innerHTML = stat.score_west - stat.score_south
        scoreGapNorth.innerHTML = stat.score_north - stat.score_south
        //ツモ時の必要打点
        southTsumo.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashToOya).length; i++) {
            let result = (Object.values(tsumoHashToOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastTsumo.innerHTML = (Object.keys(tsumoHashToOya)[i]);
              break;
            };
          };
        }
        else {eastTsumo.innerHTML = "----"}
        if (scoreGapWest.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {westTsumo.innerHTML = "----"}
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {northTsumo.innerHTML = "----"}
        //ロン時の必要打点
        southRonFromEast.innerHTML = "----"
        southRonFromSouth.innerHTML = "----"
        southRonFromWest.innerHTML = "----"
        southRonFromNorth.innerHTML = "----"
        //ロン時の必要打点（東家をまくる打点）
        eastRonFromSouth.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              eastRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          eastRonFromEast.innerHTML = "----"
          eastRonFromWest.innerHTML = "----"
          eastRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（西家をまくる打点）
        westRonFromSouth.innerHTML = "----"
        if (scoreGapWest.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              westRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          westRonFromEast.innerHTML = "----"
          westRonFromWest.innerHTML = "----"
          westRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（北家をまくる打点）
        northRonFromSouth.innerHTML = "----"
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              northRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          northRonFromEast.innerHTML = "----"
          northRonFromWest.innerHTML = "----"
          northRonFromNorth.innerHTML = "----"
        }
      };
      //西家の時の必要打点出力
      if (stat.seat_wind === "西"){
        //自家と他家の点数差出力
        scoreGapEast.innerHTML = stat.score_east - stat.score_west
        scoreGapSouth.innerHTML = stat.score_south - stat.score_west
        scoreGapWest.innerHTML = stat.score_west - stat.score_west
        scoreGapNorth.innerHTML = stat.score_north - stat.score_west
        //ツモ時の必要打点
        westTsumo.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashToOya).length; i++) {
            let result = (Object.values(tsumoHashToOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastTsumo.innerHTML = (Object.keys(tsumoHashToOya)[i]);
              break;
            };
          };
        }
        else {eastTsumo.innerHTML = "----"}
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {southTsumo.innerHTML = "----"}
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {northTsumo.innerHTML = "----"}
        //ロン時の必要打点
        westRonFromEast.innerHTML = "----"
        westRonFromSouth.innerHTML = "----"
        westRonFromWest.innerHTML = "----"
        westRonFromNorth.innerHTML = "----"
        //ロン時の必要打点（東家をまくる打点）
        eastRonFromWest.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              eastRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          eastRonFromEast.innerHTML = "----"
          eastRonFromSouth.innerHTML = "----"
          eastRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（南家をまくる打点）
        southRonFromWest.innerHTML = "----"
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              southRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          southRonFromEast.innerHTML = "----"
          southRonFromSouth.innerHTML = "----"
          southRonFromNorth.innerHTML = "----"
        }
        //ロン時の必要打点（北家をまくる打点）
        northRonFromWest.innerHTML = "----"
        if (scoreGapNorth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromNorth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapNorth.innerHTML * 1));
            if (result > 0) {
              northRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              northRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          northRonFromEast.innerHTML = "----"
          northRonFromSouth.innerHTML = "----"
          northRonFromNorth.innerHTML = "----"
        }
      };
      //北家の時の必要打点出力
      if (stat.seat_wind === "北"){
        //自家と他家の点数差出力
        scoreGapEast.innerHTML = stat.score_east - stat.score_north
        scoreGapSouth.innerHTML = stat.score_south - stat.score_north
        scoreGapWest.innerHTML = stat.score_west - stat.score_north
        scoreGapNorth.innerHTML = stat.score_north - stat.score_north
        //ツモ時の必要打点
        northTsumo.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHashToOya).length; i++) {
            let result = (Object.values(tsumoHashToOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastTsumo.innerHTML = (Object.keys(tsumoHashToOya)[i]);
              break;
            };
          };
        }
        else {eastTsumo.innerHTML = "----"}
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {southTsumo.innerHTML = "----"}
        if (scoreGapWest.innerHTML * 1 >= 0) {
          for( let i=0; i<Object.entries(tsumoHash).length; i++) {
            let result = (Object.values(tsumoHash)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westTsumo.innerHTML = (Object.keys(tsumoHash)[i]);
              break;
            };
          };
        }
        else {westTsumo.innerHTML = "----"}
        //ロン時の必要打点
        northRonFromEast.innerHTML = "----"
        northRonFromSouth.innerHTML = "----"
        northRonFromWest.innerHTML = "----"
        northRonFromNorth.innerHTML = "----"
        //ロン時の必要打点（東家をまくる打点）
        eastRonFromNorth.innerHTML = "----"
        if (scoreGapEast.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapEast.innerHTML * 1));
            if (result > 0) {
              eastRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              eastRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          eastRonFromEast.innerHTML = "----"
          eastRonFromSouth.innerHTML = "----"
          eastRonFromWest.innerHTML = "----"
        }
        //ロン時の必要打点（南家をまくる打点）
        southRonFromNorth.innerHTML = "----"
        if (scoreGapSouth.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapSouth.innerHTML * 1));
            if (result > 0) {
              southRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              southRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          southRonFromEast.innerHTML = "----"
          southRonFromSouth.innerHTML = "----"
          southRonFromWest.innerHTML = "----"
        }
        //ロン時の必要打点（西家をまくる打点）
        westRonFromNorth.innerHTML = "----"
        if (scoreGapWest.innerHTML * 1 >= 0) {
          //直撃の場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] + (stat.stacking_bar * 600) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromWest.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
          //直撃ではない場合
          for( let i=0; i<Object.entries(ronHash).length; i++) {
            let result = (Object.values(ronHash)[i] / 2 + (stat.stacking_bar * 300) + (stat.deposit * 1) - (scoreGapWest.innerHTML * 1));
            if (result > 0) {
              westRonFromEast.innerHTML = (Object.keys(ronHash)[i]);
              westRonFromSouth.innerHTML = (Object.keys(ronHash)[i]);
              break;
            };
          };
        }
        else {
          westRonFromEast.innerHTML = "----"
          westRonFromSouth.innerHTML = "----"
          westRonFromWest.innerHTML = "----"
        }
      };
    };
  });
};

window.addEventListener("load", status);