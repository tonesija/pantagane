import json
import logging
from sqlalchemy.exc import IntegrityError
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
        logger.error("TODO")
    except KeyError:
        logger.error("TODO")


def sensor_handler(message):
    """Callback handler for mqqt device/+/sensor messages.

    Raises:
        IntegrityError: when saving to db.
    """

    topic = message.topic
    payload = message.payload

    logger.info(f"Received a new message: {payload} om topic: {topic}.")

    device_id = topic.split("/")[1]
    value = json.loads(payload)["value"]

    with get_session() as db:
        reading = Reading(ammount=value, device_id=device_id)
        db.add(reading)
        db.commit()

    logger.info(f"Reading for device: {device_id} has been saved.")
