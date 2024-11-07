from flask import Flask, request, render_template, redirect, url_for, flash
from utils.validations import *
from utils.grabar_donacion import grabar

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("base.html")


@app.route('/agregar-donacion', methods=['GET', 'POST'])
def goAgregarDonacion():
    if request.method == 'POST':
        # Validar donante
        donante_errors = validate_donador()
        error_donante = ""
        error_donacion = ""
        error = ""

        if donante_errors[0] == False:
            for i in range(len(donante_errors[1])):
                error_donante += donante_errors[1][i]
                error_donante += ', '
                error = error_donante
        # Validar donaciones
        donaciones_errors = validate_donaciones()
        if donaciones_errors[0] == False:
            for i in range(len(donaciones_errors[1])):
                error_donacion += donaciones_errors[1][i]
                error_donacion += ', '
                error = error_donacion
        if donaciones_errors[0] == False and donante_errors[0] == False:
            error = error_donante + error_donacion
        if donaciones_errors[1] == True and donante_errors[1] == True:
            grabar()
            error = ""
        if error == "":
            return render_template('base.html')
        return render_template('html/agregar-donacion.html', error = error)

    if request.method == 'GET':
        return render_template('html/agregar-donacion.html')

@app.route('/informacion-dispositivo')
def goInfoDispositivo():
    return render_template('html/informacion-dispositivo.html')

@app.route('/ver-dispositivos')
def goVerDispositivos():
    return render_template('html/ver-dispositivos.html')



if __name__ == '__main__':
    app.run(debug=True)



if __name__ == "__main__":
    app.run(debug=True)
