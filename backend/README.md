# pantagane

IoT school project.

## Contains http and coap servers as two different services.

### Start the HTTP server locally

1. Create venv (skip if already created)

- python -m venv ./venv

2. Activate venv

- source ./venv/bin/activate

3. Install packages

- pip install -r requirements.txt

4. Start the server

- uvicorn main:app --reload

### Start the COAP server locally

1. Create venv (skip if already created)

- python -m venv ./venv

2. Activate venv

- source ./venv/bin/activate

3. Install packages

- pip install -r requirements.txt

4. Start the server

- python coap_server.py
