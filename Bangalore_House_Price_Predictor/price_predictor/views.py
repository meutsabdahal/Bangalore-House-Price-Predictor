from django.shortcuts import render
import pandas as pd
import pickle
import numpy as np
from django.http import JsonResponse
import json

# Load data and model
data = pd.read_csv('../Clean_Bengaluru_House_Data.csv')
pipe = pickle.load(open('../ridge_model.pkl', 'rb'))
locations = sorted(data['location'].unique())


# Create your views here.
def home(request):
    if request.method == 'GET':
        return render(request, 'price_predictor/home.html', {'locations': locations})

    elif request.method == 'POST':
        # Extract JSON data from the request body
        json_data = json.loads(request.body)
        location = json_data['location']
        bhk = float(json_data['bhk'])
        bathroom = float(json_data['bathroom'])
        sqft = json_data['sqft']

        # Perform prediction using the model
        input = pd.DataFrame([[location, sqft, bathroom, bhk]], columns=['location', 'total_sqft', 'bath', 'bhk'])
        prediction = np.round(pipe.predict(input)[0] * 1e5 , 2)

        # Format prediction with 'INR'
        formatted_prediction = f'INR {prediction}'

        # Prepare response data
        response_data = {
            'prediction': formatted_prediction,
        }
        # Return JSON response
        return JsonResponse(response_data)
