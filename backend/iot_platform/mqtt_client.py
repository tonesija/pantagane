import json
from typing import Callable
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
from constants import (
    PLATFORM_CLIENT_ID,
    PLATFORM_ENDPOINT,
    PLATFORM_MQTT_PORT,
    PUB_TOPIC,
    SUB_TOPIC,
)
from settings import Settings

settings = Settings()


mqtt_client = AWSIoTMQTTClient(PLATFORM_CLIENT_ID)
mqtt_client.configureEndpoint(PLATFORM_ENDPOINT, PLATFORM_MQTT_PORT)
mqtt_client.configureCredentials(
    settings.root_ca_path, settings.private_key_path, settings.certificate_path
)

mqtt_client.connect()


def mqtt_publish_actuate(message: dict, device: str):
    """Published a actuation MQTT message.

    Args:
        message (dict): payload.
        device (str): name of the device, used in a topic.
    """

    topic = PUB_TOPIC.replace("+", device)
    message_json = json.dumps(message)
    try:
        success: bool = mqtt_client.publish(topic, message_json, 1)

        if success:
            print(f"Published to topic: {topic}, message: {message_json}.")
        else:
            print(f"Failed to publish to a topic: {topic}.")
    except:
        print("Publish exception.")


def mqtt_subscrube_sensor(callback: Callable):
    """Subscribes mqtt client to all sensor topics.

    Args:
        callback (Callable): callback when a mqtt message is recieved.
    """

    try:
        success: bool = mqtt_client.subscribe(SUB_TOPIC, 1, callback)

        if success:
            print(f"Subscription to a topic: {SUB_TOPIC} was successful.")
        else:
            print(f"Failed to subscribe to a topic: {SUB_TOPIC}.")
    except:
        print("Publish exception.")
