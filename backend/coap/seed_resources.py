import json
import asyncio

from aiocoap import Context, Message
from aiocoap.numbers.codes import Code


async def main():
    """Perform POST request to readings endpoint/resources."""

    context = await Context.create_client_context()

    payload = {"device_id": "string", "ammount": 9}
    request = Message(
        code=Code.POST,
        payload=bytes(json.dumps(payload), encoding="utf-8"),
        uri="coap://localhost/readings",
    )

    response = await context.request(request).response

    print("Result: %s\n%r" % (response.code, response.payload))


if __name__ == "__main__":
    asyncio.run(main())
