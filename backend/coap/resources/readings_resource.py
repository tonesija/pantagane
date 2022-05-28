import json
from aiocoap.resource import Resource
from aiocoap import Message, Code
from database import get_session

from db.reading import Reading
from models.readings import ReadingIn


from sqlalchemy.exc import IntegrityError


class ReadingResource(Resource):
    def __init__(self) -> None:
        super().__init__()

    async def render_post(self, request: Message):
        payload_str = request.payload.decode("utf-8")
        payload_dict = json.loads(payload_str)

        try:
            reading = ReadingIn(**payload_dict)
            reading_db = Reading(**reading.dict())
            with get_session() as db:
                db.add(reading_db)
                db.commit()
        except IntegrityError:
            print("int error")

        # TODO: return max capacity
        return Message(code=Code.CREATED)
