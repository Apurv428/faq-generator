from flask import Flask, jsonify, request
from faqGenerator import main as faq_generator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

# This route is used to generate the FAQ from the text input
@app.route('/api/generate-faq', methods=['POST', 'GET'])
def generate_faq_route():   
    if request.method == 'POST':
        text = request.json.get('text')  # Extract text from the request JSON payload
        if text:
            try:               
                faq = faq_generator(text)
                if faq == -1:
                    return jsonify({'error': 'Invalid text input.'}), 400
                
                return jsonify({'faq': faq})
            
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'error': 'Text input not provided'}), 400
    else:
        return jsonify({'error': 'Method Not Allowed'}), 405
    
if __name__ == '__main__':
    app.run()