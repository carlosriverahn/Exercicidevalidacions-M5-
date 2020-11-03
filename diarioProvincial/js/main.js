const form = document.getElementById("form01")
const inputs = document.querySelectorAll('#form01 input');
let acumErrores = 0;

let expresiones = {
	
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{4,12}$/, // 4 a 12 digitos.
	address: /^.{4,40}$/, // De 4 a 30 caracteres.
	state: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
	zipCode: /^\d{5}$/, // 5 numeros.
	phone: /^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/ // 7 a 14 numeros.
}
let campos = {
	email: false,
	password: false,
	address: false,
	state: false,
	zipCode: false,
	phone: false
}

form.addEventListener('blur', (event) => {
	console.log(event.target.id);
	validarFormulario(event.target.id, event.target.value)
    //registerValidate();
}, true);

const validarFormulario = (id, value) => {
	switch (id) {
		case "email":
			validarCampo(expresiones.email, value, 'email');
		break;
		case "password":
			validarCampo(expresiones.password, value, 'password');
		break;
		case "address":
			validarCampo(expresiones.address, value, 'address');
		break;
		case "state":
			validarCampo(expresiones.state, value, 'state');
		break;
		case "zipCode":
			validarCampo(expresiones.zipCode, value, 'zipCode');
		break;
		case "phone":
			validarCampo(expresiones.phone, value, 'phone');
		break;
	}
}

const validarCampo = (expresion, value, campo) => {
	if(expresion.test(value)){
		document.getElementById(`${campo}`).classList.remove('is-invalid');
		campos[campo] = true;
	} else {
		document.getElementById(`${campo}`).classList.add('is-invalid');
		campos[campo] = false;
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	inputs.forEach(input => { if(input.value ==""){input.classList.add('is-invalid')}	
	});
	const terms = document.getElementById('invalidCheck');
	if(!terms.checked) {
		terms.classList.add("is-invalid");
	}else{
		terms.classList.remove("is-invalid");
	}
	if(campos.email && campos.password && campos.address && campos.state && campos.zipCode && campos.phone && terms.checked ){
		form.reset();
		document.getElementById('message1').classList.add('d-block');
		document.getElementById('message2').classList.remove('d-block');
		setTimeout(() => {
			document.getElementById('message1').textContent = "";
		}, 5000);
	} else {
		document.getElementById('message2').classList.add('d-block');
	}
});
