function irALink(path){
    window.location.href = "../html/" + path;
  }
function activarImagen(){
  let imagen = document.getElementById("imagenAgrandada");
  if(imagen.hidden == true){
    imagen.hidden = false;
  } else{
    imagen.hidden = true;
  }

}