from datetime import datetime

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
def get_time(inp):
    currentTime = datetime.now()
    year = int(currentTime.year)
    month = int(currentTime.month)
    day = int(currentTime.day)
    hour = int(currentTime.hour)
    minute = int(currentTime.minute)

    old_year = int(inp.year)
    old_month = int(inp.month)
    old_day = int(inp.day)
    old_hour = int(inp.hour)
    old_minute = int(inp.minute)

    if year == old_year:
        if month == old_month:
            if day == old_day:
                if hour == old_hour:
                    if minute == old_minute:
                        result = "Just Now"
                    else:
                        if minute - old_minute < 2:
                            result = "Just Now"
                        else:
                            result = f"{minute-old_minute} Minutes ago."
                else:
                    if hour - old_hour < 2:
                        result = "1 hour ago"
                    else:
                        result = f"{hour - old_hour} hours ago."
            elif day - old_day < 2:
                result = f"Yesterday at {old_hour}:{old_minute:02d}"
            elif day - old_day < 7:
                c_day = datetime.today().weekday()
                c_day = c_day - (day - old_day)
                if c_day < 0:
                    c_day += 6
                c_day = days[c_day]
                result = f"{c_day} at {old_hour}:{old_minute:02d}"
            else:
                result = f"{months[old_month - 1]} {old_day} at {old_hour}:{old_minute:02d}"



    return result
