const total = document.querySelector('.total p');
const container = document.querySelectorAll('.container');
const checkout = document.querySelector('.checkout a');
const limit = 1;

// set initial values for local storage
// keys correspond to data attribute on containers
localStorage.setItem('blue',0);
localStorage.setItem('red',0);
localStorage.setItem('green',0);

container.forEach(function(c){
  const bm = c.querySelector('.minus');
  const bp = c.querySelector('.plus');
  const d = c.querySelector('.display');
  let count = 0;
  bm.addEventListener('click',function(){
    if(count>0){
      count--;
      displayAndCheck();
    }
  })
  bp.addEventListener('click',function(){
    if(count<limit){
      count++;
      displayAndCheck();
    }
  })
  function displayAndCheck(){
    d.innerHTML = `${count} <span>x ${c.dataset.price}.00</span>`;
    bm.disabled = count==0 ? true : false;
    bp.disabled = count<limit ? false : true;
    // sub total element
    const sub = c.querySelector('.sub');
    // sub total count from item price * running count
    const subTotal = c.dataset.price*count;
    // print sub total in HTML (parseInt to convert string to number)
    sub.textContent = parseInt(subTotal);
    // save subtotal to local storage and use item name
    // from data attribute as key name
    localStorage.setItem(c.dataset.item,subTotal);
    // print grand total from all container counts
    // (parseInt to convert string to number)
    total.textContent = parseInt(localStorage.getItem('blue')) + parseInt(localStorage.getItem('red')) 
+ parseInt(localStorage.getItem('green'));
    // enable/disable button based on cart total
    enableCheckout();
  }
})

function enableCheckout(){
  if(parseInt(total.textContent)>0){
    checkout.classList.remove('disabled');
  } else {
    checkout.classList.add('disabled');
  }
}


const form = document.querySelector('form');
const reset = document.querySelector('.reset');
const welcome = document.querySelector('.hi-welcome');

form.addEventListener('submit',function(e){
  e.preventDefault();
  localStorage.setItem('firstname',firstname.value);
  checkValue();
})

reset.addEventListener('click',function(e){
  e.preventDefault();
  if(localStorage.getItem('firstname')){
    localStorage.removeItem('firstname');
  }
  checkValue();
  form.reset();
})

function checkValue(){
  if(localStorage.getItem('firstname')){
    // add hide class to form
    form.classList.add('hide');
    // remove hide class from heading
    welcome.classList.remove('hide');
    // get reference to the span
    const span = welcome.querySelector('h1 span');
    // place the text from localstorage into the span
    span.textContent = localStorage.getItem('firstname');
    // enable the reset button
    reset.disabled = false;
  } else {
    // add hide class to heading
    welcome.classList.add('hide');
    // remove hide class from the form
    form.classList.remove('hide');
    // disable reset button
    reset.disabled = true;
  }
}

checkValue();

// and, just for fun
const input = document.querySelector('input');
input.addEventListener('focus',function(e){
  e.preventDefault();
  document.body.classList.add('dark');
})
input.addEventListener('blur',function(e){
  e.preventDefault();
  document.body.classList.remove('dark');
})