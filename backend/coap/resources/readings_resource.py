from aiocoap.resource import Resource
from aiocoap import Message


class ReadingResource(Resource):
    def __init__(self) -> None:
        super().__init__()

    async def render_post(self, request):
        print("Hee Heee")
        print(request)

        return Message(content_format=0, payload="\n".join("success").encode("utf8"))
