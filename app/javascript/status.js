const status = () => {
  const scoreGapEast = document.getElementById("score-gap-east");
  const tsumoEast = document.getElementById("tsumo-east");
  const eastRonFromSouth = document.getElementById("east-ron-from-south");
  const eastRonFromWest = document.getElementById("east-ron-from-west");
  const eastRonFromNorth = document.getElementById("east-ron-from-north");
  const scoreGapSouth = document.getElementById("score-gap-south");
  const tsumoSouth = document.getElementById("tsumo-south");
  const southRonFromEast = document.getElementById("south-ron-from-east");
  const southRonFromWest = document.getElementById("south-ron-from-west");
  const southRonFromNorth = document.getElementById("south-ron-from-north");
  const scoreGapWest = document.getElementById("score-gap-west");
  const tsumoWest = document.getElementById("tsumo-west");
  const westRonFromEast = document.getElementById("west-ron-from-east");
  const westRonFromSouth = document.getElementById("west-ron-from-south");
  const westRonFromNorth = document.getElementById("west-ron-from-north");
  const scoreGapNorth = document.getElementById("score-gap-north");
  const tsumoNorth = document.getElementById("tsumo-north");
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
  const form = document.getElementById("status-form");
  console.log(tsumoHashOya[500]);
  console.log(Object.values(tsumoHashOya)[0]);
  console.log(Object.keys(tsumoHashOya)[0]);
  console.log(Object.entries(tsumoHashOya)[0]);
  console.log(Object.entries(tsumoHashOya).length);
  for( let i=0; i<Object.entries(tsumoHashOya).length; i++) {
    let result = (Object.values(tsumoHashOya)[i] - 10000);
    if (result >= 0) {
    console.log(Object.keys(tsumoHashOya)[i]);
    break;
    };
  };
  form.addEventListener("submit",(e) => {
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
    console.log(stat)
    if (stat.seat_wind === "東"){
      scoreGapEast.innerHTML = Math.ceil(stat.score_east - stat.score_east);
      scoreGapSouth.innerHTML = Math.ceil(stat.score_south - stat.score_east);
      scoreGapWest.innerHTML = Math.ceil(stat.score_west - stat.score_east);
      scoreGapNorth.innerHTML = Math.ceil(stat.score_north - stat.score_east);
      for( let i=0; i<Object.entries(tsumoHashOya).length; i++) {
        let result = (Object.values(tsumoHashOya)[i] + (stat.stacking_bar * 400) + (stat.deposit * 1) + (scoreGapSouth.innerHTML * 1));
        if (result >= 0) {
          tsumoSouth.innerHTML = Math.ceil(Object.keys(tsumoHashOya)[i]);
          break;
        };
      };
      
      // tsumoSouth.innerHTML = Math.ceil();
      tsumoWest.innerHTML = Math.ceil();
      tsumoNorth.innerHTML = Math.ceil();
      eastRonFromSouth.innerHTML = Math.ceil();
      eastRonFromWest.innerHTML = Math.ceil();
      eastRonFromNorth.innerHTML = Math.ceil();
    };
  });
};

window.addEventListener("load", status);