const hand = () => {
  $(".pai-list").click(function () {
    console.log(this.id);
  });
  // const paiList = document.getElementsByClassName("pais");
  // paiList.addEventListener('click', function() {
  //   console.log("hello");
  //   console.log(this)
  //   // let paiName = this.getElementByName("name")
  //   // console.log(paiName)
  // });
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