#include <pgmspace.h>
 
#define THING_NAME ""                      // change this
 
const char WIFI_SSID[] = "";               // change this
const char WIFI_PASSWORD[] = "";           // change this
const char AWS_IOT_ENDPOINT[] = "";        // change this
 
// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(       // change this
-----BEGIN CERTIFICATE-----

-----END CERTIFICATE-----
)EOF";
 
// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(      // change this
-----BEGIN CERTIFICATE-----

-----END CERTIFICATE-----
)KEY";
 
// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(  // change this
-----BEGIN RSA PRIVATE KEY-----

-----END RSA PRIVATE KEY-----
)KEY";
