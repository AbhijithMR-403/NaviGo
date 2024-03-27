from datetime import datetime


def divide_time(start, end, no_waypoints):
    diff = ((end - start)/(no_waypoints+1))
    listTiming = [(start + diff).strftime("%H:%M:%S")]
    for i in range(no_waypoints - 1):
        listTiming.append(
            (datetime.strptime(listTiming[-1], "%H:%M:%S") + diff).strftime("%H:%M:%S"))
    return listTiming


val = divide_time(end=datetime.strptime('09:00:45', "%H:%M:%S"),
                  start=datetime.strptime('08:30:45', "%H:%M:%S"), no_waypoints=4)
print(val)
