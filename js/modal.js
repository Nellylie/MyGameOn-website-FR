function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const content = document.querySelector('.content');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const formMerci = document.querySelector('#body-merci');
const btnClose = document.querySelector('.close');
const fermer = document.querySelector('#fermer');
const btnValidate = document.querySelector('#validate'); //bouton principal de validation

// lancer le formulaire avec le bouton inscription placé au coté responsive et desktop
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

//fermer le formulaire avec la croix
btnClose.addEventListener('click', () => {
  modalbg.style.display = 'none';
})

formMerci.style.display = 'none'; //visibilite par defaut

//fermer le formulaire apres la confirmation avec le bouton fermer
function fermerValidation() {
  fermer.addEventListener('click', () => {
    formMerci.style.display = 'none'; //gestion des affichages
    modalbg.style.display = 'none';

    document.querySelector("form[name='reserve']").reset(); //on réinitialise toutes les valeurs des inputs a vide
  })
  document.querySelector('.close2').addEventListener('click', () => {
    //fermer le formulaire apres la confirmation avec la croix
    formMerci.style.display = 'none'; //gestion des affichages
    modalbg.style.display = 'none';

    document.querySelector("form[name='reserve']").reset(); //on réinitialise toutes les valeurs des inputs a vide
  })
}

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'; //gestion des affichages
  content.style.display = 'block';
  window.scrollTo(0, 0);
}

//verifier les champs du formulaire en envoyant les données au clique du bouton inscription
btnValidate.addEventListener('click', validateForm);

//Gestion de la vérification des inputs
//recuperer les ids des inputs et appeler la fonction "validateinput" à l'interieur de validateform
//pour verification des inputs
function validateForm(e) {
  const first = document.querySelector('#first'); //associe l'id des inputs a des constantes
  const last = document.querySelector('#last');
  const email = document.querySelector('#email');
  const birthdate = document.querySelector('#birthdate');
  const quantity = document.querySelector('#quantity');
  const location = document.querySelectorAll("input[name='location']"); //selection tous les inputs pour regarder s'il seront checke ou non
  const condition = document.getElementById('checkbox1');
  const newsletter = document.getElementById('checkbox2');
  e.preventDefault() // élimine le comportement par défaut de l'evenement du click

  validateInput(
    first,
    last,
    email,
    birthdate,
    quantity,
    location,
    condition,
    newsletter,
  )
}

// mis en place de la fonction validateinput pour filtrer
function validateInput(
  first,
  last,
  email,
  birthdate,
  quantity,
  location,
  condition,
  newsletter,
) {
  const trueOrFalse = [
    //tableau pour rassembler chaque valeur a filtrer des fonctions autour des inputs recuperer en argument
    firstGestion(first),
    lastGestion(last),
    emailGestion(email),
    birthdateGestion(birthdate),
    quantityTourGestion(quantity),
    localGestion(location),
    conditionGestion(condition),
    newsletterGestion(newsletter),
  ];

  let countFalse = 0; //initialisation d'un compteur pour compter les falses

  for (let validator of trueOrFalse) {
    //une boucle for pour chaque element du tableau trueOrfalse
    if (validator === false) {
      //compare le retour de leur fonction a false, si vrai le compteur s'incremente
      countFalse++;
    };
  }
  if (countFalse === 0) {
    //si le compteur est a zero, ca veut dire qu'il n y a pas de false, donc on recuperer et en travail avec les valeurs dans les inputs
    console.log(
      'Vous êtes : ' +
      first.value.toLowerCase() +
      ' - ' +
      last.value.toLowerCase() +
      '- Votre email : ' +
      email.value +
      '- votre date de naissance : ' +
      birthdate.value +
      '- vos tournois : ' +
      quantity.value +
      '- votre choix de ville pour le futur tournoi : ' +
      localGestion(location) +
      '- vous avez acceptez les conditions - ' +
      '- Est ce que vous voulez être au courant des évènements? ' +
      newsletterGestion(newsletter),
    );
    // une fois filtré et validé, on affiche la page de remerciement et on desactive la page d'inscription
    content.style.display = 'none';
    formMerci.style.display = 'flex';

    fermerValidation();//on active la fonction pour la fermeture de la page avec le bouton fermer ou la croix
  }
}

function firstGestion(first) {
  //on filtre chacune des valeurs recupérée on les compare et on execute l'action a réaliser selon la nature de l'erreur
  if (first.value === '') {
    //si la valeur est vide
    errorEvent(first, 'le champ est vide!');
    return false;
  } else if (!checkInput(first.value)) {
    //si la valeur comparée au regex de la fonction appelée retourne faux
    errorEvent(
      first,
      "Les lettres de l'alphabet sont à eux-seuls autorisés et minimum 2 caractères",
    );
    return false;
  } else {
    succesEvent(first, first.value); //toutes les autres situations sont validés et retourne vrai
    return true;
  }
}

function lastGestion(last) {
  if (last.value === '') {
    errorEvent(last, 'le champ est vide!');
    return false;
  } else if (!checkInput(last.value)) {
    //recupere la valeur de la fonction qui compare la valeur du nom au pattern regex
    errorEvent(
      last,
      "Les lettres de l'alphabet sont à eux-seuls autorisés et minimum 2 caractères",
    )
    return false;
  } else {
    succesEvent(last, last.value);
    return true;
  }
}

function emailGestion(email) {
  if (email.value === '') {
    errorEvent(email, 'le champ est vide!');
    return false;
  } else if (!checkEmail(email.value)) {
    //recupere la valeur de la fonction qui compare la valeur du nom au pattern regex
    errorEvent(email, 'votre adresse email est invalide!');
    return false;
  } else {
    succesEvent(email, email.value);
    return true;
  }
}

function birthdateGestion(birthdate) {
  if (birthdate.value === '') {
    errorEvent(birthdate, 'le champ est vide!');
    return false;
  } else if (checkBirthday(birthdate.value) == false) {
    //recupere la valeur de la fonction qui compare la date de naissance avec celle du jour actuel pour avoir une date pausible
    errorEvent(birthdate, 'Vous ne pouvez pas être né(e) au-delà de ce jour');
    return false;
  } else {
    succesEvent(birthdate, birthdate.value);
    return true;
  }
}

function quantityTourGestion(quantity) {
  if (!checkNumber(quantity.value)) {
    errorEvent(quantity, 'Entrez un chiffre!');
    return false;
  } else {
    succesEvent(quantity, quantity.value);
    return true;
  }
}

function localGestion(location) {
  let locationValue = '';
  // une boucle pour selectionner le check coché de la localisation choisie du tournoi par l'utilisateur
  for (let checkBox of location) {
    if (checkBox.checked) {
      locationValue = checkBox.value;
    }
  }
  if (locationValue !== '') {
    console.log(locationValue) //gestion des réussites avec l'affichage de la ville selectionnée
    succesEvent(location[0], locationValue);
    return true, locationValue;
  } else {
    errorEvent(location[0], 'Choisissez votre ville!'); //precision entre crochet pour savoir quel input de la ville traiter puisque sa selection vient d'un selectorAll
    return false;
  } //gestion des inputs unchecked
}

function conditionGestion(condition) {
  //verifie si les conditions sont checkées ou non
  if (condition.checked) {
    let conditionCheck = condition.value;
    succesEvent(condition, conditionCheck);
    return 'conditions acceptées', true;
  } else {
    errorEvent(condition, 'Veuillez accepter les conditions')
    return false;
  }
}

function newsletterGestion(newsletter) {
  if (!newsletter.checked) {
    let newsletterCheck = newsletter.checked;//regarde si l'utilisateur veut etre averti des evenements futurs
    succesEvent(newsletter, newsletterCheck);
    return true, 'vous ne serez pas averti(e) des futurs évènements'; //les deux retourneront true et un message pour signaler leurs intentions
  } else {
    return true, 'vous serez averti(e) des futurs évènements';
  }
}

// les fonctions pour la gestion des erreurs et des réussites
function errorEvent(input, message) {
  input.parentElement.setAttribute('data-error', message); //selectionne le parent de l'element de la variable et installe l'attribut data-error reperé dans le css
  input.parentElement.setAttribute('data-error-visible', true); // affiche un contour rouge à l'input
  //input.parentElement.setAttribute('data-succes-visible', false) //efface le contour vert à l'input
  console.log(message);
}

function succesEvent(inputTag, input) {
  inputTag.parentElement.removeAttribute('data-error'); //efface l'attribut
  inputTag.parentElement.removeAttribute('data-error-visible'); //efface l'attribut qui permet le contour rouge
  //inputTag.parentElement.setAttribute('data-succes-visible', true) //affiche un contour vert
  console.log(input + ' enregistré !');
}

function checkEmail(checkEmailInput) {
  return /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z.]{2,15}$/.test(checkEmailInput); //filtre email
}

function checkInput(text) {
  return /^([a-zA-Z]{2,})+$/.test(text); //limiter les champs de A jusqu'à Z, 2 lettres minimums
}

function checkNumber(number) {
  return /^[0-9]{1,2}$/.test(number); //limiter les champs de A jusqu'à Z, 2 lettres minimums
}

//pour ne pas que la date de naissance choisie par l'utilisateur soit plus récente que la date du jour
function checkBirthday(birthdateInput) {
  const date = new Date(); //verifie la date
  const yearNow = date.getFullYear();
  const monthNow = date.getMonth() + 1;
  const dayNow = date.getDate();
  const dateJ =
    yearNow + '-' + ('0' + monthNow).slice(-2) + '-' + ('0' + dayNow).slice(-2);
  if (birthdateInput >= dateJ) {
    return false;
  }
}
