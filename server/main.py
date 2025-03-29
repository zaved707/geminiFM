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
       

        
        files.organize_files(json_file,source_dir,destination_dir)

      

    # Assume json_path is the directory, and we need to create a file in it
        json_dir = json_path  # Directory where JSON files will be stored
        base_filename = "jsonfile"  # Base name for the JSON file
        extension = ".json"

        # Ensure the directory exists
        if not os.path.exists(json_dir):
            os.makedirs(json_dir)

        # Start with the base file path
        file_path = os.path.join(json_dir, f"{base_filename}1{extension}")
        counter = 2

        # Check for existing files and increment the name if necessary
        while os.path.exists(file_path):
            print(f"The file '{file_path}' already exists. Creating a new one...")
            file_path = os.path.join(json_dir, f"{base_filename}{counter}{extension}")
            counter += 1

        # Write the JSON data to the new file
        try:
            with open(file_path, "w") as file:
                json.dump(json_file, file, indent=4)  # Assuming json_file is your data
            print(f"Successfully created '{file_path}'")
        except Exception as e:
            print(f"Error writing to '{file_path}': {e}")

    return response


def revert( source_dir, destination_dir,json_folder_path,num):
    if num==0:
        for i in range(1,11):
            files.organize_revert( source_dir, destination_dir, json_folder_path, i)
    else:
        files.organize_revert( source_dir, destination_dir, json_folder_path, num)
print(os.getcwd())
# dothething('testing','testing','history','according to type ','file manager')
#revert('testing','testing','history',0)
