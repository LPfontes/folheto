import os
import subprocess
import uuid
import tempfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Enable CORS so the React frontend can call this API
CORS(app)

# Create a temporary directory for processing
UPLOAD_FOLDER = tempfile.gettempdir()
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def convert_to_pdf_x1a(input_pdf, output_pdf):
    """
    Core logic from convert_pdf_x1a.py to convert PDF to X-1a.
    """
    gs_cmd = "gswin64c" if os.name == 'nt' else "gs"
    
    command = [
        gs_cmd,
        "-dPDFX=1",
        "-dSAFER",
        "-dNOPAUSE",
        "-dBATCH",
        "-sDEVICE=pdfwrite",
        "-sColorConversionStrategy=CMYK",
        "--permit-file-read=/home/lpfontes/pdf/",
        "-dPrinted=true",
        "-dPDFACompatibilityPolicy=1",
        f"-sOutputFile={output_pdf}",
        "PDFX_def.ps",
        input_pdf
    ]
    
    try:
        print(f"Executing Ghostscript: {' '.join(command)}")
        subprocess.run(command, check=True, capture_output=True, text=True)
        return True, ""
    except subprocess.CalledProcessError as e:
        error_msg = e.stderr if e.stderr else e.stdout
        print(f"Ghostscript Error: {error_msg}")
        return False, error_msg
    except FileNotFoundError:
        return False, "Ghostscript executable not found. Please ensure it is installed and added to PATH."

@app.route('/convert', methods=['POST'])
def convert_pdf():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
        
    file = request.files['file']
    
    # If the user does not select a file
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if file and file.filename.endswith('.pdf'):
        unique_id = str(uuid.uuid4())
        filename = secure_filename(file.filename)
        
        # Paths for processing
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], f"input_{unique_id}_{filename}")
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], f"output_{unique_id}_{filename}")
        
        try:
            # Save the uploaded file
            file.save(input_path)
            
            # Perform conversion
            success, error_msg = convert_to_pdf_x1a(input_path, output_path)
            
            if success and os.path.exists(output_path):
                # Send the converted file back to the client
                response = send_file(
                    output_path,
                    mimetype='application/pdf',
                    as_attachment=True,
                    download_name=f"x1a_{filename}"
                )
                
                # Cleanup will happen implicitly in the background or OS temp clear, 
                # but we could use after_this_request if strict cleanup is needed.
                return response
            else:
                return jsonify({"error": "Failed to convert PDF", "details": error_msg}), 500
                
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            
    return jsonify({"error": "Invalid file format. Only PDF is allowed."}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Servidor rodando e pronto para conversões PDF/X-1a"})

if __name__ == '__main__':
    print("Iniciando servidor Flask de conversão PDF/X-1a na porta 5000...")
    print("Para instalar dependências: pip install flask flask-cors")
    app.run(host='0.0.0.0', port=5000, debug=True)
