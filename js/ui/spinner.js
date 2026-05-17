export function changeSpinner(command) {
  const spinnerElement = document.querySelector('.spinner');
  switch (command) {
    case 'show':
      spinnerElement.classList.add('show');
      break;
    case 'hide':
      spinnerElement.classList.remove('show');
      break;
  }
}