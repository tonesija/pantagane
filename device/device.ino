#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include "WiFi.h"
#include "secrets.h"

// THING_NAME defined in secrets.h
const char AWS_IOT_PUBLISH_TOPIC[] = "device/" THING_NAME "/sensor";
const char AWS_IOT_SUBSCRIBE_TOPIC[] = "device/" THING_NAME "/actuator";
const char AWS_IOT_UPDATE_TOPIC[] = "device/" THING_NAME "/connect";

const int LED = 2;
const int PIR_1 = 26;
const int PIR_2 = 27;
int pir_1_state = 0;
int pir_2_state = 0;
unsigned long pir_1_time;
unsigned long pir_2_time;
unsigned long max_interval = 1000;
int people_in_room = 0;
int max_people_in_room = 5;

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

void check_sensor_1() {
  if (digitalRead(PIR_1)) {
    if (!pir_1_state) {
      // Serial.println("Pir 1: motion detected!");
      pir_1_state = !pir_1_state;
      pir_1_time = millis();
    }
  } else {
    if (pir_1_state) {
      // Serial.println("Pir 1: motion ended!");
      pir_1_state = !pir_1_state;
    }
  }
}

void check_sensor_2() {
  if (digitalRead(PIR_2)) {
    if (!pir_2_state) {
      // Serial.println("Pir 2: motion detected!");
      pir_2_state = !pir_2_state;
      pir_2_time = millis();
    }
  } else {
    if (pir_2_state) {
      // Serial.println("Pir 2: motion ended!");
      pir_2_state = !pir_2_state;
    }
  }
}

void evaluate_times() {
  if (pir_1_time && pir_2_time) {
    if (pir_1_time < pir_2_time) {
      if (pir_2_time - pir_1_time <= max_interval) {
        Serial.println("+1 person");
        people_in_room++;
        Serial.print("People in room: ");
        Serial.println(people_in_room);
        publish();
      }
    } else if (pir_1_time > pir_2_time) {
      if (pir_1_time - pir_2_time <= max_interval) {
        Serial.println("-1 person");
        people_in_room--;
        Serial.print("People in room: ");
        Serial.println(people_in_room);
        publish();
      }
    }
    pir_1_time = 0;
    pir_2_time = 0;
  }
}

void check_limit() {
  if(people_in_room >= max_people_in_room) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }  
}

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 
  Serial.println("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.println(".");
  }
 
  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);
 
  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.setServer(AWS_IOT_ENDPOINT, 8883);
  client.setCallback(messageHandler);
 
  Serial.println("Connecting to AWS IOT");
  while (!client.connect(THING_NAME))
  {
    delay(500);
    Serial.println(".");
  }
 
  if (!client.connected())
  {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
  Serial.println("AWS IoT Connected!");
}

void messageHandler(char* topic, byte* payload, unsigned int length)
{
  Serial.print("incoming: ");
  Serial.println(topic);

  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload);
  String message = doc["type"];
  String value = doc["value"];
  Serial.println(message);
  
  if (message == "set_counter") {
    people_in_room = value.toInt();
    Serial.print("updated people_in_room: ");
    Serial.println(people_in_room);
  } else if(message == "max_people_in_room") {
    max_people_in_room = value.toInt();
    Serial.print("updated max_people_in_room: ");
    Serial.println(max_people_in_room);
  } else if(message == "max_interval") {
    max_interval = value.toInt();
    Serial.print("updated max_interval: ");
    Serial.println(max_interval);
  }
}

void publish() {
  StaticJsonDocument<200> doc;
  doc["value"] = people_in_room;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);
  pinMode(PIR_1, INPUT);
  pinMode(PIR_2, INPUT);
  connectAWS();
  client.publish(AWS_IOT_UPDATE_TOPIC, 0);
}

void loop() {
  check_sensor_1();
  check_sensor_2();
  evaluate_times();
  check_limit();
  client.loop();
  delay(1);
}
