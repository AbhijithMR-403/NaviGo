from django.urls import path
from . import views

urlpatterns = [
    path("details/<int:id>/", views.UserDetail.as_view(), name="listUser"),
    path("details/update/<int:id>/",
         views.UserUpdateDetailView.as_view(), name="listUser"),
#     path("filter/bus", views.FilterBusView.as_view(), name="FilterBus"),
    path("bus/route/list", views.BusRouteListView.as_view(), name="BusRouteList"),
    path('create/order', views.TicketOrderCreateView.as_view(),
         name="ticket-order-create"),
    path('order/detail/<str:ticket_order_id>/',
         views.TicketOrderDetailView.as_view(), name="ticket-order-detail"),
    path('razorpay_order', views.RazorpayPaymentView.as_view(), name='razorpay_order'),
    path('razorpay_callback', views.RazorpayCallback.as_view(),
         name='razorpay_callback'),
    path('list/order/<int:id>', views.TicketOrderListView.as_view(), name='ticketOrder'),
    path('filter/bus/<int:start_id>/<int:end_id>', views.UserAvailableRouteView.as_view(), name='busOrder'),
]
