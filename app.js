import { data } from "./testData";
const resWrap = document.querySelector("#result-list");
const matching = document.querySelector(".calc-matching");

function showResult(text) {
  resWrap.innerHTML = "";
  matching.textContent = 0;
  if (text !== " " && text.length !== 0) {
    let res = data.features.filter(item => {
      const fdata = item.info.search(text);
      if (fdata !== -1) {
        return item;
      }
    });
    matching.textContent = res.length;
    res.map(item => {
      const resItem = document.createElement("li");
      resItem.textContent = item.info;
      resWrap.appendChild(resItem);
    });
  }
}

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

document.querySelector("input").addEventListener(
  "input",
  debounce(function() {
    showResult(this.value);
  }, 1500)
);
