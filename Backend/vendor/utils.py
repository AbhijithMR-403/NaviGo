from datetime import datetime, time


def time_decorator(func):
    def inner(start, end, numWaypoints):
        today_date = datetime.now().date()
        start_datetime = datetime.combine(today_date, start)
        end_datetime = datetime.combine(today_date, end)
        return func(start_datetime, end_datetime, numWaypoints) 
    return inner


@time_decorator
def divide_time(start, end, numWaypoints):
    diff = ((end - start)/(numWaypoints+1))
    listTiming = [(start + diff).strftime("%H:%M:%S")]
    for i in range(numWaypoints - 1):
        listTiming.append(
            (datetime.strptime(listTiming[-1], "%H:%M:%S") + diff).strftime("%H:%M:%S"))
    return listTiming


# print('dsd')
# end = time(hour=9, minute=00, second=00)
# print(end)
# print(type(end))
# start = time(8, 30)
# today_date = datetime.now().date()
# start_datetime = datetime.combine(today_date, start)
# end_datetime = datetime.combine(today_date, end)
# print(type(end_datetime - start_datetime))
# val = divide_time(end=end, start=start, numWaypoints=4)
# print(val)
# print(type(val[0]))

# print(type(datetime.strptime('09:00:45', "%H:%M:%S")))
