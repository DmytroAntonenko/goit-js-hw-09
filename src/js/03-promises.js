import Notiflix from 'notiflix';
const refs = {
btn: document.querySelector('button'),
firstDelay: document.querySelector('[name=delay]'),
step: document.querySelector('[name=step]'),
amount: document.querySelector('[name=amount]'),
form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onStart);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout (()=> {
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject ({position, delay})
    }
  }, delay);
});
}

function onStart(event) {
  event.preventDefault();
let firstDelayValue = Number(refs.firstDelay.value);
let stepValue = Number(refs.step.value);
let amountValue = Number(refs.amount.value);

for (let index = 1; index <= amountValue; index += 1) {
  createPromise(index, firstDelayValue)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  firstDelayValue += stepValue;
}
}