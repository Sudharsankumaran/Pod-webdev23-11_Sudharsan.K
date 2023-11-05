import "/style.css";
//buttob as button
const button = document.querySelector('button');

// divclass box as box
const box = document.querySelector('.box');

//button onclick
button.addEventListener('click', buttonclick)

//adding function to the button
function buttonclick() {

  // Create a progress bar container
  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = 'progressBarContainer';


  //adding div progress bar inside div box
  const div = document.createElement('div');
  div.className = 'progressBar';
  box.appendChild(div);

  //adding div progressLoading  inside div bar
  const progressLoading = document.createElement('div');
  progressLoading.className = 'loading';
  div.appendChild(progressLoading);


  // Create pause and resume buttons
  const pauseButton = document.createElement('button');
  pauseButton.innerText = 'Pause';
  progressBarContainer.appendChild(pauseButton);

  const resumeButton = document.createElement('button');
  resumeButton.innerText = 'Resume';
  progressBarContainer.appendChild(resumeButton);

  box.appendChild(progressBarContainer);

  // Button click handlers
  pauseButton.addEventListener('click', () => {
    clearInterval(loadingTime);
  });

  resumeButton.addEventListener('click', () => {
    loadingTime = setInterval(loading, 50);
  });

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
      progressLoading.innerHTML = width + "%";
    };
  };
  loadingTime = setInterval(loading, 50);
};




