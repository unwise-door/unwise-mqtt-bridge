# Description
This bridge provides a [Homie](https://homieiot.github.io/) compatible MQTT interface to Ritto Wiser Door products for integration with home automation systems.

# Usage
Create a unwise-config.json with this information:
```json
{
  "wiserdoor": {
    // IP of Wiser Door device
    "host": "...",
    // Internal user as configured in Wiser Door device
    "sipUser": "...",
    "sipPassword": "...",
    "unlockPassword": "..."
  },
  "mqtt": {
    // mqtt broker information
    "host": "...",
    "port": 1883,
    "base_topic": "devices/",
    "auth": true,
    "username": "...",
    "password": "..."
  },
  // optional:
  "homie": {
    "name": "...", // default: "Ritto Wiser Door Panel"
    "device_id": "..." // default: "ritto-wiser-door-panel"
  }
}
```

Then run `npm start`.

## Relation to Schneider Electric/Merten/Ritto
This project is not affiliated with Schneider Electric/Merten/Ritto.

All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. 