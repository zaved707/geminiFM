from flask import Flask, jsonify , request
from flask_cors import CORS
import files
import os
import main


app = Flask(__name__)
CORS(app)

@app.route('/api/getAIResponse' , methods=['GET','POST'])
def sendReq():
    data =request.get_json()
    print(data,'this is data')
    prompt=data.get('prompt')
    source_dir = data.get('sourceDir')
    output_dir = data.get('outputDir')
    main.dothething(source_dir,output_dir, 'history','according to type ','file manager')
    response = {
            'status': 'success',
            'message': 'Data received',
            'received_data': {
                'prompt': prompt,
                'sourceDir': source_dir,
                'outputDir': output_dir
            }
        }
    return jsonify(response), 200
    
   

@app.route('/api/getFiles', methods=['GET', 'POST'])
def data():
    string_data = request.data.decode('utf-8')
    
    # Print to console (similar to your JS console.log)
    print(f"Received: {string_data}")
    
    # Do something with the string_data
    # For example, send a response back
    return jsonify(files.list_folders(string_data)), 200

if __name__ == '__main__': 
    app.run(port=5000)