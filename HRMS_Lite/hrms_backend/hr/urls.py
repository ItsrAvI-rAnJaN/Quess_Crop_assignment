from django.urls import path
from .views import *

urlpatterns = [
    path('employees/', EmployeeListCreate.as_view()),
    path('employees/<int:pk>/', EmployeeDelete.as_view()),
    path('attendance/', AttendanceCreateList.as_view()),
]
