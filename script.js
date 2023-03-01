//Array for MODE options [add, select, shop] available in application.
const mode = ['add', 'select', 'shop'];

//App will start on SHOP MODE.
let currentMode = mode[2];

//Setting DOM elements into variables to further manipulation
const items = document.querySelectorAll('.list-item');
const addItemsButton = document.getElementById('add-items');
const selectItemsButton = document.getElementById('select-items');
const makeShopButton = document.getElementById('make-shop');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');
const categorySelect = document.getElementById('category-select');
const itemInput = document.getElementById('item-input');
const snackbar = document.getElementById('snackbar');

//Setting visibility of buttons according with chosen mode.
const toggleElements = (elementName, classIn, classOut) => {
  document.getElementsByName(elementName).forEach((el, key) => {
    document
      .getElementsByName(elementName)
      [key].classList.replace(classOut, classIn);
  });
};

//------------------------------------------------------------
//ADD ITEMS MODE
//------------------------------------------------------------

//Add button actions
addItemsButton.addEventListener('click', () => {
  currentMode = mode[0];
  vibration();
  addItemsButton.classList.add('dark-color');
  toggleElements('settings-button', 'settings-invisible', 'settings');
  toggleElements('delete-button', 'delete', 'delete-invisible');
  toggleElements('left-icon', 'list-category-0-invisible', 'list-category-0');
  toggleElements('right-icon', 'amount-invisible', 'amount');

  slidedown.play();
  showSnackbar('Modo: Adicionando itens');
});

//Clear button actions
clearButton.addEventListener('click', () => {
  categorySelect.value = itemInput.value = '';
});

let slidedown = anime({
  targets: '.list-add-item',
  translateY: ['-150px', '0px'],
  duration: 1000,
  autoplay: false,
  begin: function () {
    document.querySelector('.list-add-item').classList.remove('invisible');
  },
});

let slideup = anime({
  targets: '.list-add-item',
  translateY: ['0px', '-150px'],
  duration: 1000,
  autoplay: false,
  begin: function () {
    document.querySelector('.list-add-item').classList.add('invisible');
  },
});

//------------------------------------------------------------
//SELECT ITEMS MODE
//------------------------------------------------------------

selectItemsButton.addEventListener('click', () => {
  currentMode = mode[1];
  slideup.play();
  vibration();
  toggleElements('settings-button', 'settings', 'settings-invisible');
  toggleElements('delete-button', 'delete-invisible', 'delete');
  toggleElements('left-icon', 'list-category-0', 'list-category-0-invisible');
  toggleElements('left-icon', 'bx-checkbox', 'bx-cart');
  toggleElements('right-icon', 'amount', 'amount-invisible');
  showSnackbar('Modo: Selecionando itens');
});

//------------------------------------------------------------
//MAKE SHOP MODE
//------------------------------------------------------------

const makeShop = function () {
  currentMode = mode[2];
  slideup.play();
  vibration();
  toggleElements('settings-button', 'settings', 'settings-invisible');
  toggleElements('delete-button', 'delete-invisible', 'delete');
  toggleElements('left-icon', 'list-category-0', 'list-category-0-invisible');
  toggleElements('left-icon', 'bx-cart', 'bx-checkbox');
  toggleElements('right-icon', 'amount-invisible', 'amount');
  showSnackbar('Modo: Fazendo compras');
  console.log('makeShop call...');
};

makeShopButton.addEventListener('click', makeShop);

//------------------------------------------------------------

//Setting MakeShop mode as main view at starting up.
window.document.addEventListener('DOMContentLoaded', makeShop);

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navbar-bottom').style.bottom = '0';
  } else {
    document.getElementById('navbar-bottom').style.bottom = '-110px';
  }
  prevScrollpos = currentScrollPos;
};

//Swipe items for execute actions
// items.forEach((item) => {
//   item.addEventListener('touchstart', (e) => {
//     e.target.dataset.x =
//       Number(e.touches[0].pageX) + Number(e.target.dataset.move) || 0;
//   });

//   item.addEventListener('touchmove', (e) => {
//     let moveX = Number(e.target.dataset.x) - e.touches[0].pageX;

//     moveX > 130 ? (moveX = 130) : null;
//     moveX < -130 ? (moveX = -130) : null;

//     e.target.dataset.move = moveX;

//     anime({
//       targets: e.target,
//       translateX: -Number(e.target.dataset.move),
//       duration: 300,
//     });
//   });

//   item.addEventListener('touchend', (e) => {
//     let elementMove = e.target.dataset.move;

//     if (elementMove > 100) elementMove = 100;
//     else if (elementMove < -100) elementMove = -100;
//     else elementMove = 0;

//     items.forEach((item) => {
//       let content = item.querySelector('.list-content');

//       if (content === e.target) {
//         return null;
//       }

//       content.dataset.x = 0;
//       content.dataset.move = 0;

//       anime({
//         targets: content,
//         translateX: 0,
//       });
//     });

//     setTimeout(() => {
//       anime({
//         targets: e.target,
//         translateX: -Number(elementMove),
//       });
//     }, 1);
//   });
// });

//Trying Hammer...

// create a simple instance
// by default, it only adds horizontal recognizers

items.forEach((item) => {
  var mc = new Hammer(item);
  // listen to events...
  mc.on('swipeleft swiperight tap', function (ev) {
    // mc.on('swipe panleft panright tap press', function (ev) {
    console.log(ev.type + ' gesture detected.' + ev.deltaX);
    console.log(ev, currentMode);
    if (ev.deltaX <= -25) {
      // ev.target.style.transform = 'translateX(-100px)';
      anime({
        targets: ev.target,
        translateX: -100,
        duration: 300,
      });
    }
    /* if (ev.deltaX >= 25 && currentMode === 'add') {
      // ev.target.style.transform = 'translateX(100px)';
      anime({
        targets: ev.target,
        translateX: 100,
        duration: 300,
      });
    } else if (
      ev.deltaX <= -25 &&
      (currentMode === 'select' || currentMode === 'shop')
    ) {
      // ev.target.style.transform = 'translateX(-100px)';
      anime({
        targets: ev.target,
        translateX: -100,
        duration: 300,
      });
    } */

    items.forEach((item) => {
      let content = item.querySelector('.list-content');

      if (content === ev.target) {
        return null;
      }

      anime({
        targets: content,
        translateX: 0,
      });
    });

    if (ev.type === 'tap' || ev.type === 'swiperight') {
      // ev.target.style.transform = 'translateX(0)';
      anime({
        targets: ev.target,
        translateX: 0,
        duration: 300,
      });
    }
  });
});

//Vibrating for 200ms.
const vibration = function () {
  if (navigator.vibration) {
    window.navigator.vibrate(200);
  }
};

//Snackbar
const showSnackbar = function (msg) {
  //Ad text message to div.
  snackbar.innerText = msg;

  // Add the "show" class to DIV
  snackbar.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
};

//Registering serviveWorker.js.

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
