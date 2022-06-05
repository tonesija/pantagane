"""
Here are the constants.
"""


# --------------- AWS IOT CORE/PLATFORM CONSTANTS ---------------
from enum import Enum


PUB_TOPIC = "device/+/actuator"
SUB_TOPIC_SENSOR = "device/+/sensor"
SUB_TOPIC_CONNECT = "device/+/connect"
PLATFORM_CLIENT_ID = "web_server"
PLATFORM_ENDPOINT = "a1wdt180rk60xh-ats.iot.eu-central-1.amazonaws.com"
PLATFORM_MQTT_PORT = 8883


class MessageTypesEnum(str, Enum):
    MAX_PEOPLE_IN_ROOM = "max_people_in_room"
    SET_COUNTER = "set_counter"
    MAX_INTERVAL = "max_interval"
