let formCount = 1;

function agregarDispositivo(event) {
    event.preventDefault();

    formCount++;

    const originalForm = document.getElementById("infoDonacion1");
    const nuevoDispositivo = originalForm.cloneNode(true);
    
    nuevoDispositivo.id = `infoDonacion${formCount}`;

    const elements = nuevoDispositivo.querySelectorAll("input, select, div, u1, h2");
    elements.forEach((element) => {
        if (element.id) {
            const oldId = element.id;
            element.id = `${oldId.replace(/\d+$/, '')}${formCount}`;
        }
        if (element.name) {
            element.name = `${element.name.replace(/\d+$/, '')}`;
        }
        if (element.tagName === "INPUT") {
            element.value = ""; // Limpiar los campos input
        }

    });
    



    document.querySelector(".main-container").appendChild(nuevoDispositivo);
}


