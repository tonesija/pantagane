import json
import logging
from sqlalchemy.exc import IntegrityError, NoResultFound, MultipleResultsFound
from iot_platform.mqtt_client import (
    mqtt_publish_actuate_max_capacity,
    mqtt_publish_actuate_max_capacity_async,
    mqtt_publish_actuate_max_interval,
    mqtt_publish_actuate_max_interval_async,
    mqtt_publish_actuate_set_counter,
    mqtt_publish_actuate_set_counter_async,
)
from db.device import Device
from database import get_session
from db.reading import Reading


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def base_handler(client, userdata, message):
    """Wrapper handler for sensor_handler.
    Handles exceptions."""

    try:
        sensor_handler(message)
    except IntegrityError:
        logger.error(f"Invalid mqtt payload: {message}.")
    except KeyError:
        logger.error(f"Invalid mqtt payload: {message}.")
    except NoResultFound:
        logger.error(f"Device from not found from payload: {message}.")
    except MultipleResultsFound:
        logger.error(f"Device from not found from payload: {message}.")


def base_handler_connect(client, userdata, message):
    """Wrapper handler for device_connect_handler.
    Handles exceptions."""

    try:
        device_connect_handler(message)
    except IntegrityError:
        logger.error(f"Invalid mqtt payload: {message}.")
    except KeyError:
        logger.error(f"Invalid mqtt payload: {message}.")
    except NoResultFound:
        logger.error(f"Device from not found from payload: {message}.")
    except MultipleResultsFound:
        logger.error(f"Unexpected error: {message}.")


def device_connect_handler(message):
    """Callback handler for mqqt device/+/connect messages.

    Raises:
        NoResultFound: when saving to db.
    """

    topic = message.topic
    payload = message.payload

    print(f"Received a new message: {payload} on topic: {topic}.")

    device_id = topic.split("/")[1]
    print(device_id)

    with get_session() as db:
        device: Device = db.query(Device).filter(Device.device_id == device_id).one()

    mqtt_publish_actuate_max_capacity_async(device.max_capacity, device_id)
    mqtt_publish_actuate_max_interval_async(device.max_interval, device_id)
    mqtt_publish_actuate_set_counter_async(device.counter, device_id)


def sensor_handler(message):
    """Callback handler for mqqt device/+/sensor messages.

    Raises:
        IntegrityError: when saving to db.
    """

    topic = message.topic
    payload = message.payload

    print(f"Received a new message: {payload} on topic: {topic}.")

    device_id = topic.split("/")[1]
    value = json.loads(payload)["value"]

    with get_session() as db:
        reading = Reading(ammount=value, device_id=device_id)
        db.add(reading)

        device = db.query(Device).filter(Device.device_id == device_id).one()
        device.counter = value

        db.commit()

    print(f"Reading for device: {device_id} has been saved.")
