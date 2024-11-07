import re
from flask import request
from db.db import getRegiones, getComunas, getConnection
from werkzeug.utils import secure_filename
import filetype

def validateName(name):
    if not name: return False
    minLengthValid = len(name.strip()) >= 3
    maxLengthValid = len(name.strip()) <= 80
    return minLengthValid and maxLengthValid

def validateMail(email):
    if not email: return False
    lengthValid = len(email) >= 10
    pattern = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
    formatValid = bool(re.match(pattern, email))
    return lengthValid and formatValid

def validatePhoneNumber(phoneNumber):
    if not phoneNumber: return True
    lengthValid = len(str(phoneNumber)) >= 8
    pattern = r'^\+569 \d{8}$'
    formatValid = bool(re.match(pattern, str(phoneNumber)))
    return formatValid and lengthValid


def validateRegion(region):
    if not region: return False
    try:
        region = int(region)
        return (int(region),) in getRegiones(getConnection())
    except:
        return False

def validateComuna(comuna, region):
    return (comuna,) in getComunas(getConnection(), region)

def validateDeviceName(deviceName):
    if not deviceName: return False
    minLengthValid = len(deviceName.strip()) >= 3
    maxLengthValid = len(deviceName.strip()) <= 80
    return minLengthValid and maxLengthValid

def validateDescription(description):
    if not description: return True
    maxLengthValid = len(description) <= 200
    return maxLengthValid

def validateComment(comment):
    if not comment: return False
    maxLengthValid = len(comment) <= 200
    return maxLengthValid

def validateTipo(tipo):
    return tipo in ["Pantalla",
        "Notebook", "Tablet", "Celular",
        "Consola", "Mouse", "Teclado",
        "Impresora", "Parlante",
        "Audífonos", "Otro"
    ],

def validateYears(years):
    if not years: return False
    try:
        years = int(years)
        return 2 <= years <= 99
    except:
        return False



def validate_state(state):
    return state in ["Funciona perfecto", "Funciona a medias", "No funciona"]

def validateFiles(files):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "pdf"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif", "archive/pdf"}
    if len(files) >3 or len(files) <1: return False

    if not files: return False
    for i in range(len(files)-1):
        if files[i].filename == "": return False

        ftype_guess = filetype.guess(files[i])
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
    return True


def validate_donador():
    # Obtener datos del formulario
    info_donante = request.form
    email_donante = info_donante.get("emailDonante")
    numero_celular = info_donante.get("numeroCelular")
    nombre_donante = info_donante.get("nombreDonante")
    region = info_donante.get("Region")
    comuna = info_donante.get("Comuna")

    # Variables auxiliares de validación
    invalid_inputs = []
    is_valid = True

    # Lógica de validación
    if not validateName(nombre_donante):
        invalid_inputs.append("Nombre Donante")
        is_valid = False
    if not validateMail(email_donante):
        invalid_inputs.append("Email")
        is_valid = False
    if not validatePhoneNumber(numero_celular):
        invalid_inputs.append("Número")
        is_valid = False
    if not validateRegion(region):
        invalid_inputs.append("Región")
        is_valid = False
    if not validateComuna(comuna, region):
        invalid_inputs.append("Comuna")
        is_valid = False

    # Mostrar resultados de la validación
    if not is_valid: return (False, invalid_inputs)
    
    return (True, '')

def validate_donaciones():
    form = request.form
    all_valid = True

    numero_disp = 0


    numero_disp =+ 1
    # Obtener datos de cada formulario
    nombre_dispositivo = form.get("nombreDispositivo1")
    descripcion_dispositivo = form.get("descripcionDispositivo1")
    tipo_dispositivo = form.get("tipoDispositivo1")
    annos_dispositivo = form.get("annosDispositivo1")
    estado_dispositivo = form.get("estadoDispositivo1")
    fotos_dispositivo = request.files.getlist("fotosDispositivo1")

    invalid_inputs = []
    is_valid = True

    # Lógica de validación
    if not validateDeviceName(nombre_dispositivo):
        invalid_inputs.append("Nombre del Dispositivo" + str(numero_disp))
        is_valid = False
    if not validateDescription(descripcion_dispositivo):
        invalid_inputs.append("Descripción del Dispositivo" + str(numero_disp))
        is_valid = False
    if not validateTipo(tipo_dispositivo):
        invalid_inputs.append("Tipo del Dispositivo" + str(numero_disp))
        is_valid = False
    if not validateYears(annos_dispositivo):
        invalid_inputs.append("Años de uso del Dispositivo" + str(numero_disp))
        is_valid = False
    if not validate_state(estado_dispositivo):
        invalid_inputs.append("Estado de funcionamiento del Dispositivo" + str(numero_disp))
        is_valid = False
    if not validateFiles(fotos_dispositivo):
        invalid_inputs.append("Fotos del Dispositivo" + str(numero_disp))
        is_valid = False

    # Mostrar resultados de la validación
    if not is_valid:
        all_valid = False

    
    if all_valid:
        return (True, '')
    return (False, invalid_inputs)
