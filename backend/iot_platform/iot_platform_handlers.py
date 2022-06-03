import json
import logging
from sqlalchemy.exc import IntegrityError, NoResultFound, MultipleResultsFound
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


def sensor_handler(message):
    """Callback handler for mqqt device/+/sensor messages.

    Raises:
        IntegrityError: when saving to db.
    """

    topic = message.topic
    payload = message.payload

    logger.info(f"Received a new message: {payload} on topic: {topic}.")

    device_id = topic.split("/")[1]
    value = json.loads(payload)["value"]

    with get_session() as db:
        reading = Reading(ammount=value, device_id=device_id)
        db.add(reading)

        device = db.query(Device).filter(Device.device_id == device_id).one()
        device.counter = value

        db.commit()

    logger.info(f"Reading for device: {device_id} has been saved.")
