import pandas as pd
from django.shortcuts import render

data = pd.read_csv('../Clean_Bengaluru_House_Data.csv')

locations = sorted(data['location'].unique())
context = {
    'locations': locations,
}


# Create your views here.
def home(request):
    return render(request, 'price_predictor/home.html', context)
