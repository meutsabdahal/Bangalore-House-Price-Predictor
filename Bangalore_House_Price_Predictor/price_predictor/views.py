from django.shortcuts import render
import pandas as pd
import pickle
import numpy as np

data = pd.read_csv('../Clean_Bengaluru_House_Data.csv')
pipe = pickle.load(open('../ridge_model.pkl', 'rb'))
locations = sorted(data['location'].unique())


# Create your views here.
def home(request):
    if request.method == 'GET':
        return render(request, 'price_predictor/home.html', {'locations': locations})
    else:
        location = request.POST['location']
        bhk = float(request.POST['bhk'])
        bathroom = float(request.POST['bathroom'])
        sqft = request.POST['sqft']

        input = pd.DataFrame([[location, sqft, bathroom, bhk]], columns=['location', 'total_sqft', 'bath', 'bhk'])
        prediction = str(np.round(pipe.predict(input)[0] * 1e5 , 2))

        context = {
            'locations': locations,
            'prediction': prediction
        }
        return render(request, 'price_predictor/home.html', context)