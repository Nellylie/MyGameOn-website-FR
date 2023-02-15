function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const btnClose = document.querySelector('.close')
const form = document.querySelector('.bground')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
btnClose.addEventListener('click', () => {
  form.style.display = 'none'
})

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}
//lancer le formulaire

const btnValidate = document.querySelector('#validate')

//verifier le formulaire
btnValidate.addEventListener('click', validateForm)

//Gestion de la vérification des inputs
function validateForm(e) {
  const first = document.querySelector('#first')
  const last = document.querySelector('#last')
  const email = document.querySelector('#email')
  const birthdate = document.querySelector('#birthdate')
  const quantity = document.querySelector('#quantity')
  const location = document.querySelectorAll("input[name='location']")
  const condition = document.getElementById('checkbox1')
  const newsletter = document.getElementById('checkbox2')
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
    firstGestion(first),
    lastGestion(last),
    emailGestion(email),
    birthdateGestion(birthdate),
    quantityTourGestion(quantity),
    localGestion(location),
    conditionGestion(condition),
    newsletterGestion(newsletter),
  ]
  let countFalse = 0;
  for (let validator of trueOrFalse) {
    if (validator === false) {
      countFalse++;
    }
  }
  if ((countFalse === 0)) {
    alert(
      'Vous êtes : ' +
        first.value +
        ' - ' +
        last.value +
        '- Votre email : ' +
        email.value +
        '- votre date de naissance : ' +
        birthdate.value +
        '- vos tournois : ' +
        quantity.value +
        '- votre choix de ville pour le futur tournoi : ' +
        localGestion(location)+
        '- vous avez acceptez les conditions - ' + 
        '- Est ce que vous voulez être au courant des évènements? '+newsletterGestion(newsletter),
    )
  }
}

function firstGestion(first) {
  if (first.value === '') {
    errorEvent(first, 'le champ est vide!')
    return false
  } else if (!checkInput(first.value)) {
    errorEvent(
      first,
      "Les lettres de l'alphabet sont à eux-seuls autorisés et minimum 2 caractères",
    )
    return false
  } else {
    succesEvent(first, first.value)
    return true
  }
}

function lastGestion(last) {
  if (last.value === '') {
    errorEvent(last, 'le champ est vide!')
    return false
  } else if (!checkInput(last.value)) {
    errorEvent(
      last,
      "Les lettres de l'alphabet sont à eux-seuls autorisés et minimum 2 caractères",
    )
    return false
  } else {
    succesEvent(last, last.value)
    return true
  }
}

function emailGestion(email) {
  if (email.value === '') {
    errorEvent(email, 'le champ est vide!')
    return false
  } else if (!checkEmail(email.value)) {
    errorEvent(email, 'votre adresse email est invalide!')
    return false
  } else {
    succesEvent(email, email.value)
    return true
  }
}

function birthdateGestion(birthdate) {
  if (birthdate.value === '') {
    errorEvent(birthdate, 'le champ est vide!')
    return false
  } else if (checkBirthday(birthdate.value) == false) {
    errorEvent(birthdate, "Vous ne pouvez pas être né(e) au-delà d'aujourd'hui")
    return false
  } else {
    succesEvent(birthdate, birthdate.value)
    return true
  }
}

function quantityTourGestion(quantity) {
  if (quantity.value === '') {
    errorEvent(quantity, 'le champ est vide!')
    return false
  } else {
    succesEvent(quantity, quantity.value)
    return true
  }
}

function localGestion(location) {
  let locationValue = ''
  // une boucle pour selectionner le check coché de la localisation choisie du tournoi par l'utilisateur
  for (let checkBox of location) {
    if (checkBox.checked) {
      locationValue = checkBox.value;
    }
  }
  if (locationValue !== '') {
    console.log(locationValue) //gestion des réussites avec l'affichage de la ville selectionnée
    return true, locationValue
  } else {
    console.log('Choisissez votre ville!')
    return false
  } //gestion des inputs unchecked
}

function conditionGestion(condition) {
  if (condition.checked) {
    let conditionCheck = condition.checked
    succesEvent(condition, conditionCheck)
    return true, 'conditions acceptées';
  } else {
    errorEvent(condition, "Veuillez accepter les conditions d'utilisation");
    return false
  }
}

function newsletterGestion(newsletter) {
  if (!newsletter.checked) {
    let newsletterCheck = newsletter.checked
    succesEvent(newsletter, newsletterCheck);
    return true, 'vous ne serez pas averti(e) des futurs évènements';
  } else {
    return true, 'vous serez averti(e) des futurs évènements';
  }
}

// les fonctions pour la gestion des erreurs et des réussites
function errorEvent(input, message) {
  input.parentElement.setAttribute('data-error', message) //selectionne le parent de l'element de la variable et installe l'attribut data-error reperé dans le css
  input.parentElement.setAttribute('data-error-visible', true) // affiche un contour rouge à l'input
  input.parentElement.setAttribute('data-succes-visible', false) //efface le contour vert à l'input
  console.log(message)
}

function succesEvent(inputTag, input) {
  inputTag.parentElement.removeAttribute('data-error') //efface l'attribut
  inputTag.parentElement.removeAttribute('data-error-visible') //efface l'attribut qui permet le contour rouge
  inputTag.parentElement.setAttribute('data-succes-visible', true) //affiche un contour vert
  console.log(input + ' enregistré !')
}

function checkEmail(checkEmailInput) {
  return /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z.]{2,15}$/.test(checkEmailInput) //filtre email
}

function checkInput(text) {
  return /^([a-zA-Z]{2,})+$/.test(text) //limiter les champs de A jusqu'à Z, 2 lettres minimums
}
//pour ne pas que la date de naissance choisie par l'utilisateur soit plus récente que la date du jour
function checkBirthday(birthdateInput) {
  const date = new Date() //verifie la date
  const yearNow = date.getFullYear()
  const monthNow = date.getMonth() + 1
  const dayNow = date.getDate()
  const dateJ =
    yearNow + '-' + ('0' + monthNow).slice(-2) + '-' + ('0' + dayNow).slice(-2)
  if (birthdateInput >= dateJ) {
    return false
  }
}
