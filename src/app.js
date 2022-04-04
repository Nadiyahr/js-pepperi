const pairInput = document.getElementById('pair');
const errorSpan = document.getElementById('error');
const pairInner = document.getElementById('inner');
const submitBtn = document.getElementById('submit');
const btnSortByName = document.getElementById('name');
const btnSortByValue = document.getElementById('value');
const btnDelete = document.getElementById('delete');
const btnXML = document.getElementById('XML');
const arrFromLi = Array.from(pairInner.getElementsByTagName('li'))
  .map((x) => x.textContent.trim()
    .split('='));
let isOpen = false;

submitBtn.onclick = innerList;
btnSortByName.onclick = sortByName;
btnSortByValue.onclick = sortByValue;
btnDelete.onclick = deleteItem;
btnXML.onclick = displayXML;

pairInput.onkeyup = () => {
  const userInput = pairInput.value;

  if (/^[A-Za-z0-9\s]+={1}[A-Za-z0-9\s]+$/.test(userInput)) {
    errorSpan.innerText = '';
    submitBtn.disabled = false;
  } else {
    errorSpan.innerText = 'Example: Name=Value';
    submitBtn.disabled = true;
  }
};

pairInput.addEventListener('keyup', (event) => {
  if (event.code === 'Enter' && !submitBtn.disabled) {
    innerList();
  }
});

function innerList() {
  arrFromLi.push(pairInput.value.split('='));
  pairInput.value = '';
  // eslint-disable-next-line no-use-before-define
  pairInner.innerHTML = displayList(arrFromLi);
}

function displayList(array) {
  return array.map((el, idx) => `
  <li>
    <input type="checkbox" class="item" id="${idx}">
    <label for="${idx}">${el.join('=')}</label>
    </li>
  `).join('');
}

function sortByName() {
  const sortedByName = arrFromLi.sort((a, b) => a[0].localeCompare(b[0]));

  pairInner.innerHTML = displayList(sortedByName);
}

function sortByValue() {
  const sortedByName = arrFromLi.sort((a, b) => a[1].localeCompare(b[1]));

  pairInner.innerHTML = displayList(sortedByName);
}

function deleteItem() {
  const checkedItems = Array
    .from(document.querySelectorAll('input[type=checkbox]'))
    .filter((checkbox) => checkbox.checked)
    .map((check) => +check.id);

  checkedItems.forEach((item) => arrFromLi.splice(item, 1));

  pairInner.innerHTML = displayList(arrFromLi);
}

function toggleModal() {
  isOpen = !isOpen;

  const visibility = isOpen ? 'visible' : 'hidden';
  const overflow = isOpen ? 'hidden' : 'auto';

  document.getElementById('back').style.visibility = visibility;
  document.getElementById('mod').style.visibility = visibility;
  document.documentElement.style.overflow = overflow;
}

function displayXML() {
  const stringXML = new XMLSerializer().serializeToString(pairInner);
  const backdrop = document.createElement('div');

  backdrop.classList.add('backdrop');
  backdrop.id = 'back';
  const dialog = document.createElement('div');
  dialog.classList.add('modal');
  dialog.id = 'mod';
  dialog.innerHTML = `
    <p id="divMod"></p>
    <button
      class="modalBtn"
      id="rej"
    >
      X
    </button>
  `;
  document.body.appendChild(backdrop);
  backdrop.appendChild(dialog);
  document.getElementById('divMod').innerText = stringXML;
  document.getElementById('rej').onclick = toggleModal;
  toggleModal();
}
