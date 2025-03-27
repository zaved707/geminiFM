from google import genai
from dotenv import load_dotenv
import os
import files 
import json
from pydantic import BaseModel
#this defines the scheme{https://ai.google.dev/gemini-api/docs/structured-output?lang=python#define_a_schema_with_a_type} for the output from the ai
class rule(BaseModel):
  file_name: str
  destination_folder: str

def chat(custom_prompt, GEMINI_API_KEY):
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=custom_prompt,
        config={
            'temperature': 0.5,
            
        })
    print(response,'respose arrived')
    return response.text

    


def get_response(files_list,custom_prompt, GEMINI_API_KEY):
    
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=custom_prompt+'here are the files :-'+files_list,
        config={
            'temperature': 0.1,
            'response_mime_type': 'application/json',
            'response_schema': list[rule]
        })
    return response.text




def dothething(source_dir, destination_dir,json_path,custom_prompt,mode):   #source_dir=the place where the program looks for files, destination_dir=the place where the program places the file inside sorted folder,json_path is the path where json_file is stored(json/path/filename.json)
    load_dotenv()
    

    GEMINI_API_KEY = os.environ.get("API_KEY")
    print(mode,'this is mode type')
    if mode=='chat':
        response=chat(custom_prompt, GEMINI_API_KEY)
    elif mode=='file manager':
        files_list=str(files.list_files(source_dir))
        #print('asking for response',files_list,source_dir,custom_prompt)
        response=get_response(files_list,custom_prompt, GEMINI_API_KEY)
    
    

        json_file= json.loads(response)
        if os.path.exists(json_path):
            print(f"The file '{json_path}' already exists. Deleting it...")
        os.remove(json_path)  # Delete the file

        
        files.organize_files(json_file,source_dir,destination_dir)
        if os.path.exists(json_path):
            os.remove(json_path)
            
        else:
            print('cannot delete json, so appending the data')
        try:    
            with open(json_path, "w") as file:
                    json.dump(json_file, file, indent=4)
        except:
            print('cannot append data to json')
    print('response_type=',type(response),response)

    return response


def revert(json_file_path, source_dir, destination_dir):
    files.organize_revert(json_file_path, source_dir, destination_dir)