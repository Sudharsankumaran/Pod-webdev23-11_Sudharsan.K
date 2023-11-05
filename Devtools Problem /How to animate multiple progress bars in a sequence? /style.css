import "/style.css";
//buttob as button
const button = document.querySelector('button');

// divclass box as box
const box = document.querySelector('.box');

//button onclick
button.addEventListener('click', buttonclick)

//adding function to the button
function buttonclick() {


  //adding div progress bar inside div box
  const div = document.createElement('div');
  div.className = 'progressBar';
  box.appendChild(div);

  //adding div progressLoading  inside div bar
  const progressLoading = document.createElement('div');
  progressLoading.className = 'loading';
  div.appendChild(progressLoading);



  //progress loading time
  var width = 0;
  let loadingTime;


  //loading condition with if-else statement
  function loading() {
    if (width >= 100) {
      clearInterval(loadingTime);
    }
    else {
      width = width + 1;
      progressLoading.style.width = width + '%';
    };
  };
  loadingTime = setInterval(loading, 20);
};
