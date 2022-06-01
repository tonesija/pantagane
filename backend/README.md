# pantagane

IoT school project.

### Contains http server which acts as a mqtt producer and consumer, also has a database.

#### Start the HTTP server locally

1. Create venv (skip if already created)

- python -m venv ./venv

2. Activate venv

- source ./venv/bin/activate

3. Install packages

- pip install -r requirements.txt

4. Start the server

- uvicorn main:app --reload
