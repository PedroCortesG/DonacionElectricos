const validateName = (name) => {
    if (!name) return false;
    let minLengthValid = name.trim().length >= 3;
    let maxLengthValid = name.trim().length <= 80;
    return minLengthValid && maxLengthValid;
}

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length >= 10;
    // validamos el formato
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);

    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
}

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return true       //Para que sea opcional
    else{
    // validación de longitud
    let lengthValid = phoneNumber.length >= 8;
  
    // validación de formato
    let re = /^\+569 \d{8}$/; //Solo Chile, por lo tanto solo numeros +569
    let formatValid = re.test(phoneNumber);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
    };
}

const validateSelect = (select) => {
    return select !== "";
}

const validateDeviceName = (deviceName) => {
    if (!deviceName) return false;
    let minLengthValid = deviceName.trim().length >= 3;
    let maxLengthValid = deviceName.trim().length <= 80;
    return minLengthValid && maxLengthValid;
}

const validateDescription = (description) => {
    if (!description) return true;
    let maxLengthValid = description.length <= 200;
    return maxLengthValid;
}

const validateComment = (comment) => {
    if (!comment) return false
    else{
    let maxLengthValid = comment.length <= 200;
    return maxLengthValid;
    };
}

const validateTipo = (tipo) => {
    return validateSelect(tipo); 
}

const validateYears = (years) => {
    if (!years || years == 0) return false;
    // validación de longitud
    let lengthValid = years.length <= 2;
  
    // validación de formato
    let re = /^[0-9]+$/;
    let formatValid = re.test(years);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
}

const validateState = (state) => {
    return validateSelect(state);
}

const validateFiles = (files) => {
    if (!files) return false;
  
    // validación del número de archivos
    let lengthValid = 1 <= files.length && files.length <= 3;
  
    // validación del tipo de archivo
    let typeValid = true;
  
    for (const file of files) {
        // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
        let fileFamily = file.type.split("/")[0];
        typeValid &&= fileFamily === "image" || file.type === "application/pdf";
    }
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && typeValid;
};

const validateDonador = () => {
    // obtener elementos del DOM usando el nombre del formulario.
    let infoDonante = document.forms["informacionDonante"];
    let emailDonante = infoDonante["emailDonante"].value;
    let numeroCelular = infoDonante["numeroCelular"].value;
    let nombreDonante = infoDonante["nombreDonante"].value;
    let Region = infoDonante["Region"].value;
    let Comuna = infoDonante["Comuna"].value;

  
    // variables auxiliares de validación y función.
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid = false;
    };
  
    // lógica de validación
    if (!validateName(nombreDonante)) {
        setInvalidInput("Nombre Donante");
    }
    if (!validateEmail(emailDonante)) {
        setInvalidInput("Email");
    }
    if (!validatePhoneNumber(numeroCelular)) {
        setInvalidInput("Número");
    }
    if (!validateSelect(Region)) {
        setInvalidInput("Region");
    }
    if (!validateSelect(Comuna)) {
        setInvalidInput("Comuna");
    }
  
    // finalmente mostrar la validación
    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
  
    if (!isValid) {
        validationListElem.textContent = "";
        // agregar elementos inválidos al elemento val-list.
        for (let input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        // establecer val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";
  
        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
  
        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    } else {
        validationBox.hidden = true
    }
    return isValid
};

const validateDonaciones = () => {
    let formDonacion = document.querySelectorAll("form[id^='infoDonacion']"); // para tomar todos los forms creados de donacion
    let allValid = true;
    let validationListElem = document.getElementById("val-listDonacion");
    validationListElem.textContent = "";
    let contador = formCount;

    formDonacion.forEach(form => {
        contador--;
        let nombreDispositivo = form.elements["nombreDispositivo"].value;
        let descripcionDispositivo = form.elements["descripcionDispositivo"].value; // Asegúrate de que el name sea correcto
        let tipoDispositivo = form.elements["tipoDispositivo"].value;
        let annosDispositivo = form.elements["annosDispositivo"].value;
        let estadoDispositivo = form.elements["estadoDispositivo"].value;
        let fotosDispositivo = form.elements["fotosDispositivo"].files;

        let invalidInputs = [];
        let isValid = true;
        const setInvalidInput = (inputName) => {
            invalidInputs.push(inputName);
            isValid = false;
        };

        if (!validateDeviceName(nombreDispositivo)) {
            setInvalidInput(`Nombre del Dispositivo ${formCount - contador}`);
        }
        if (!validateDescription(descripcionDispositivo)) {
            setInvalidInput(`Descripción del Dispositivo ${formCount - contador}`);
        }
        if (!validateTipo(tipoDispositivo)) {
            setInvalidInput(`Tipo del Dispositivo ${formCount - contador}`);
        }
        if (!validateYears(annosDispositivo)) {
            setInvalidInput(`Años de uso del Dispositivo ${formCount - contador}`);
        }
        if (!validateState(estadoDispositivo)) {
            setInvalidInput(`Estado de funcionamiento del Dispositivo ${formCount - contador}`);
        }
        if (!validateFiles(fotosDispositivo)) {
            setInvalidInput(`Fotos del Dispositivo ${formCount - contador}`);
        }

        let validationBox = document.getElementById("val-boxDonacion");
        let validationMessageElem = document.getElementById("val-msgDonacion");
        let validationListElem = document.getElementById("val-listDonacion");

        if (!isValid) {
            for (let input of invalidInputs) {
                let listElement = document.createElement("li");
                listElement.innerText = input;
                validationListElem.append(listElement);
            }
            validationMessageElem.innerText = "Los siguientes campos son inválidos:";
            validationBox.style.backgroundColor = "#ffdddd";
            validationBox.style.borderLeftColor = "#f44336";
            validationBox.hidden = false;

            allValid = false;
        } else {
            validationBox.hidden = true;
        }

    });

    return allValid;
}
const validateComentario = () =>{
    let infoComentario = document.forms["agregarComentario"];
    let nombreComentario = infoComentario["nombreComentario"].value;
    let descripcionComentario = infoComentario["descripcionComentario"].value;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid = false;
    };
    
    if (!validateName(nombreComentario)){
        setInvalidInput("Nombre de Comentarista")
    }
    if (!validateComment(descripcionComentario)){
        setInvalidInput("Comentario")
    }
    
    let validationBox = document.getElementById("val-boxComentario");
    let validationMessageElem = document.getElementById("val-msgComentario");
    let validationListElem = document.getElementById("val-listComentario");
  
    if (!isValid) {
        validationListElem.textContent = "";
        // agregar elementos inválidos al elemento val-list.
        for (let input of invalidInputs) {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        }
        // establecer val-msg
        validationMessageElem.innerText = "Los siguientes campos son inválidos:";
  
        // aplicar estilos de error
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
  
        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    } else {
        validationListElem.textContent = "";
        validationMessageElem.innerText = "Se ha agregado el comentario";
        validationBox.style.backgroundColor = "#6ffc53";
        validationBox.style.borderLeftColor = "#88fd71";
        validationBox.hidden = false
    }
    return isValid

};

const validateAllForms = () => {
    // Validar ambos formularios
    let donanteFormValid = validateDonador();
    let donacionesFormValid = validateDonaciones();

    if (donanteFormValid && donacionesFormValid) {
        let validationBox = document.getElementById("valBoxValid");
        let validationMessageElem = document.getElementById("valMsgValid");
        let validationListElem = document.getElementById("valListValid");

        validationMessageElem.innerText = "¿Confirma que desea publicar esta donación?";
        validationListElem.textContent = "";

        validationBox.style.backgroundColor = "#ddffdd";
        validationBox.style.borderLeftColor = "#4CAF50";

        let submitButton = document.createElement("button");
        submitButton.innerText = "Sí, confirmo";
        submitButton.style.marginRight = "10px";
        submitButton.id = "confirm";
        submitButton.addEventListener("click", () => {
            validationBox.hidden = true;
            let validatedBox = document.getElementById("informacionRecibida");
            validatedBox.hidden = false;
        });
  
        let backButton = document.createElement("button");
        backButton.innerText = "No, quiero volver al formulario";
        backButton.id = "back";
        backButton.addEventListener("click", () => {
            // Mostrar el formulario nuevamente
            validationBox.hidden = true;
        });
  
        validationListElem.appendChild(submitButton);
        validationListElem.appendChild(backButton);
  
        // hacer visible el mensaje de validación
        validationBox.hidden = false;
    } else{
        if (!donacionesFormValid){
        let validationBox = document.getElementById("val-boxDonacion");
        validationBox.hidden = false;}
    }
};



  
let submitBtn = document.getElementById("submit-btn");
if (submitBtn !=null){
    submitBtn.addEventListener("click", validateAllForms);
};
let enviarComentario = document.getElementById("enviarComentario");
if (enviarComentario !=null){
    enviarComentario.addEventListener("click", validateComentario);
};



