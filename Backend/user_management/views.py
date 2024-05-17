from django.shortcuts import render
from account.models import Account
from vendor.models import Route, BusDetail
from rest_framework import generics
from .models import TicketOrder, Payment
from .serializers import UserDetailSerializer, UserBusListSerializer, TicketOrderSerializer, TicketDetailSerializer, RouteSerializer
from vendor.serializers import RouteWayPointDetailSerializer
from .serializers import UserAvailableRouteView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime, timedelta
import json
from decouple import config
import razorpay


# Create your views here.
class UserDetail(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'


class UserUpdateDetailView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'id'


# List all the Bus Route Details
class BusRouteListView(generics.ListAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteWayPointDetailSerializer

# Create Ticket Order


class TicketOrderCreateView(generics.CreateAPIView):
    serializer_class = TicketOrderSerializer
    queryset = TicketOrder.objects.all()


class TicketOrderDetailView(generics.RetrieveAPIView):
    serializer_class = TicketDetailSerializer
    queryset = TicketOrder.objects.all()
    lookup_field = 'ticket_order_id'


# Razor pay


# Get Razorpay Key id and secret for authorize razorpay client.
RAZOR_KEY_ID = config('RAZOR_PAY_KEY_ID')
RAZOR_KEY_SECRET = config('RAZOR_PAY_SECRET_KEY')

# Creating RazorPay Client instance.
client = razorpay.Client(auth=(RAZOR_KEY_ID, RAZOR_KEY_SECRET))


class RazorpayPaymentView(APIView):

    http_method_names = ('post',)

    @staticmethod
    def post(request, *args, **kwargs):

        # Take Order Id from frontend and get all order info from Database.
        order_id = request.data.get('order_id', None)
        quantity = request.data.get('quantity', 1)
        # Here We are Using Static Order Details for Demo.
        amount = request.data.get('total', None)

        # Create Order
        razorpay_order = client.order.create(
            {"amount": int(amount) * 100, "currency": "INR",
             "payment_capture": "1"}
        )

        try:
            ticketOrder = TicketOrder.objects.get(ticket_order_id=order_id)
            bus = ticketOrder.route_id.bus_detail
            ticketOrder.quantity = quantity
            ticketOrder.save()
            bus.available_seats = bus.available_seats - quantity
            bus.save()

        except:
            Response({'error': 'Wrong order id'})
        # Save the order in DB
        order = Payment.objects.create(
            amount=amount, provider_order_id=razorpay_order["id"], ticket=ticketOrder)

        data = {
            # "name": name,
            "merchantId": RAZOR_KEY_ID,
            "amount": amount,
            "currency": 'INR',
            "orderId": razorpay_order["id"],
        }

        # save order Details to frontend
        return Response(data, status=status.HTTP_200_OK)


class RazorpayCallback(APIView):

    @staticmethod
    def post(request, *args, **kwargs):
        response = request.data['data']
        if "razorpay_signature" in response:

            # Verifying Payment Signature
            data = client.utility.verify_payment_signature(response)
            # if we get here True signature
            if data:
                # razorpay_payment = RazorpayPayment.objects.get(order_id=response['razorpay_order_id'])
                payment_object = Payment.objects.get(
                    provider_order_id=response['razorpay_order_id'])
                print(payment_object)
                payment_object.status = 'Success'
                payment_object.payment_id = response['razorpay_payment_id']
                payment_object.signature_id = response['razorpay_signature']
                payment_object.save()
                order = TicketOrder.objects.get(id=payment_object.ticket.id)
                order.status = 'Delivered'
                order.total = payment_object.amount
                order.save()
                print(order.status, '\n\n\n', order)

                return Response({'status': 'Payment Done'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'Signature Mismatch!'}, status=status.HTTP_400_BAD_REQUEST)

        # Handling failed payments
        else:
            error_code = response['error[code]']
            error_description = response['error[description]']
            error_source = response['error[source]']
            error_reason = response['error[reason]']
            error_metadata = json.loads(response['error[metadata]'])

            razorpay_payment = Payment.objects.get(
                provider_order_id=error_metadata['order_id'])
            razorpay_payment.payment_id = error_metadata['payment_id']
            razorpay_payment.signature_id = "None"
            razorpay_payment.status = 'Failure'
            razorpay_payment.save()

            error_status = {
                'error_code': error_code,
                'error_description': error_description,
                'error_source': error_source,
                'error_reason': error_reason,
            }

            return Response({'error_data': error_status}, status=status.HTTP_401_UNAUTHORIZED)


class TicketOrderListView(generics.ListAPIView):
    serializer_class = TicketDetailSerializer
    queryset = TicketOrder.objects.all()

    def get_queryset(self):
        user_id = self.kwargs.get('id')
        print(user_id)
        queryset = TicketOrder.objects.filter(
            user_id=user_id, status='Delivered')
        return queryset


class UserAvailableRouteView(APIView):
    serializer_class = UserAvailableRouteView

    def get(self, request, start_id, end_id):
        print(start_id, end_id)

        # Bus Start from start_id and End at end_id
        route1 = Route.objects.filter(
            origin__id=start_id, destination__id=end_id)

        # start_id and end_id is in between waypoint
        route2 = Route.objects.filter(waypoints__stop__id=start_id).filter(
            waypoints__stop__id=end_id)

        # Bus Start from start_id and end_id is in b/t waypoint
        route3 = Route.objects.filter(
            waypoints__stop__id=end_id, origin__id=start_id)

        route3 = Route.objects.filter(
            waypoints__stop__id=start_id, destination__id=end_id)

        print(route3)

        # Bus Start from wayPoint, But never reach end point
        # ? you can include this later

        bus_stand_route = self.serializer_class(route1, many=True).data
        waypoint_routes = self.serializer_class(route2, many=True).data
        route3_data = self.serializer_class(route3, many=True).data
        # end_routes_data = self.serializer_class(end_routes, many=True).data
        # waypoint_routes_data = self.serializer_class(waypoint_routes, many=True).data

        combined_data = bus_stand_route + waypoint_routes + route3_data
        # combined_data = route1 + route2 + route3
        # print(self.serializer_class(combined_data))

        return Response(combined_data)

        # return Response({
        #     'bus_stand_route': bus_stand_route,
        #     'combined_data': combined_data,
        #     'waypoint_routes': waypoint_routes,
        #     'route3': route3,
        # }, status=status.HTTP_200_OK)


class AvailableDateView(APIView):
    serializer_class = RouteSerializer

    def get(self, request, route_id):
        try:
            start_stop = int(request.GET.get('start_stop'))
            end_stop = int(request.GET.get('end_stop'))
        except ValueError:
            return Response({'error': 'Invalid start_stop or end_stop ID format'}, status=400)
        route_detail = Route.objects.get(id=route_id)
        points = self.serializer_class(route_detail).data
        for i in points['list_stops']:
            if i['stop'] == start_stop:
                start_stop = i
            if i['stop'] == end_stop:
                end_stop = i
        # To get today's date
        current_date = datetime.now().date()

        # Function to combine date and time
        def start_datetime(date, time): return datetime.combine(date, time)

        list_dates = []
        if (start_datetime(current_date + timedelta(hours=1), start_stop['reaching_time']) < datetime.now()):
            current_date += timedelta(days=1)
        for _ in range(3):
            end_date_time = start_datetime(
                current_date, end_stop['reaching_time'])
            date_time = start_datetime(
                current_date, start_stop['reaching_time'])
            day = date_time.strftime('%A')
            list_dates.append({'date_time': date_time, 'day': day, 'end_date_time':end_date_time})
            current_date += timedelta(days=1)
        return Response(list_dates, status=status.HTTP_200_OK)
