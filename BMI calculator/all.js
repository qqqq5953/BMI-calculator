//輸入區變數
let addHeight = document.querySelector(".addHeight");
let addWeight = document.querySelector(".addWeight");
const resultBtn = document.querySelector(".resultBtn");
let data = JSON.parse(localStorage.getItem("BMI Detail")) || [];

//記錄區資料渲染
function renderData() {
  let str = "";
  let table = document.querySelector(".table");
  table.innerHTML = "";
  data.forEach(function (item, index) {
    let tableRow = document.createElement("tr");
    let spaceRow = document.createElement("tr"); //用空的tr創造與下一行tr的間距
    str = `<th class="type">${item.bodyType}</th>
			<td><span class="bmi">BMI</span><span class="bmiNum">${item.bmi}</span></td>
			<td><span class="weight">weight</span><span class="weightNum">${item.weight}</span></td>
			<td><span class="height">height</span><span class="heightNum">${item.height}</span></td>
			<td class="date">${item.today}</td>`;
    if (str === "") {
      return;
    } else {
      tableRow.innerHTML = str;
    }

    //<tr>的border-left顏色改變
    tableRow.classList.add("table-row");
    spaceRow.classList.add("space-row");
    if (item.bodyType === "過輕") {
      tableRow.style.borderLeft = "6px solid #31BAF9";
    } else if (item.bodyType === "理想") {
      tableRow.style.borderLeft = "6px solid #86D73F";
    } else if (item.bodyType === "過重") {
      tableRow.style.borderLeft = "6px solid #FF982D";
    } else if (item.bodyType === "輕度肥胖" || item.bodyType === "中度肥胖") {
      tableRow.style.borderLeft = "6px solid #FF6C03";
    } else {
      tableRow.style.borderLeft = "6px solid #FF1200";
    }
    table.appendChild(tableRow);
    table.appendChild(spaceRow);
  });
}
renderData();

let resultShow = document.querySelector(".resultBtn-show");
const bmiText = document.querySelector(".bmiText");
let bmiResult = document.querySelector(".bmiResult");
let refresh = document.querySelector(".refresh");
let bodyTypeDes = document.querySelector(".bodyTypeDes");

//不同BMI不同顏色
function resultColorChange(bmi, color) {
  resultShow.style.border = `6px solid ${color}`;
  resultShow.style.color = `${color}`;
  bodyTypeDes.style.color = `${color}`;
  refresh.style.backgroundColor = `${color}`;
  bmiResult.textContent = bmi.toFixed(2);
}

//看結果
resultBtn.addEventListener("click", function () {
  if (addHeight.value === "" || addWeight.value === "") {
    alert("欄位不可空白");
    return;
  };

  let obj = {};
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let calcBMI =
    parseFloat(addWeight.value) / parseFloat((addHeight.value / 100) ** 2);
  let bodyType = "";

  resultBtn.style.display = "none";
  resultShow.style.display = "block";
  bodyTypeDes.style.display = "block";

  //BMI分類及按鈕變色功能
  if (calcBMI < 18.5) {
    bodyType = "過輕";
    bodyTypeDes.textContent = "過輕";
    resultColorChange(calcBMI, "#31BAF9");
  } else if (18.5 <= calcBMI && calcBMI < 24) {
    bodyType = "理想";
    bodyTypeDes.textContent = "理想";
    resultColorChange(calcBMI, "#86D73F");
  } else if (24 <= calcBMI && calcBMI < 27) {
    bodyType = "過重";
    bodyTypeDes.textContent = "過重";
    resultColorChange(calcBMI, "#FF982D");
  } else if (27 <= calcBMI && calcBMI < 30) {
    bodyType = "輕度肥胖";
    bodyTypeDes.textContent = "輕度肥胖";
    resultColorChange(calcBMI, "#FF6C03");
  } else if (30 <= calcBMI && calcBMI < 35) {
    bodyType = "中度肥胖";
    bodyTypeDes.textContent = "中度肥胖";
    resultColorChange(calcBMI, "#FF6C03");
  } else {
    bodyType = "重度肥胖";
    bodyTypeDes.textContent = "重度肥胖";
    resultColorChange(calcBMI, "#FF1200");
  }
  //將資料儲存至obj
  obj.bodyType = bodyType;
  obj.bmi = calcBMI.toFixed(2);
  obj.weight = addWeight.value;
  obj.height = addHeight.value;
  obj.today = `${month}-${date}-${year}`;
  data.push(obj);
  renderData();
  localStorage.setItem("BMI Detail", JSON.stringify(data));
});

//刪除紀錄
let recordDelete = document.querySelector(".recordDelete");
recordDelete.addEventListener("click", function (event) {
  event.preventDefault();
  data = [];
  localStorage.setItem("BMI Detail", JSON.stringify(data));
  renderData();
})

//按鈕切換
resultShow.addEventListener("click", function () {
  resultBtn.style.display = "block";
  resultShow.style.display = "none";
  bodyTypeDes.style.display = "none";
});

