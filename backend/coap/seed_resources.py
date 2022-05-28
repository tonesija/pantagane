import logging
import asyncio

from aiocoap import Context, Message
from aiocoap.numbers.codes import Code


logging.basicConfig(level=logging.INFO)


async def main():
    """Perform POST request to readings endpoint/resources."""

    context = await Context.create_client_context()

    await asyncio.sleep(2)

    payload = {"device_id": "device_id", "ammount": 7}
    request = Message(code=Code.POST, payload=payload, uri="coap://localhost/readings")

    response = await context.request(request).response

    print("Result: %s\n%r" % (response.code, response.payload))


if __name__ == "__main__":
    asyncio.run(main())
