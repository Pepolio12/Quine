from flask import Flask, render_template, request, jsonify
from Algoritmo import Algoritmo

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enviar', methods=['POST'])
def procesar_lista():
    if request.is_json:
        data = request.get_json() 
        
        Mint = data.get('Minterminos', [])
        Dont = data.get('DontCare', [])
        Minterminos = []
        DontCare = []

        for numero_str in Mint:
          numero_entero = int(numero_str)
          Minterminos.append(numero_entero)

        for numero_str in Dont:
          numero_entero = int(numero_str)
          DontCare.append(numero_entero)

        print(f"Minterminos procesados: {Minterminos}")
        print(f"Minterminos procesados: {DontCare}")
        mensaje = Algoritmo(Minterminos, DontCare)
        print(mensaje)

        return jsonify({"status": "success", "mensaje": mensaje})
    return jsonify({"status": "error", "mensaje": "No es JSON"}), 400

if __name__ == '__main__':
    app.run(debug=False)
