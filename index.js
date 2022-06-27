const HomieDevice = require('homie-device');
const fs = require('fs').promises;
const { WiserDoorController } = require('@unwise-door/unwise-controller');

class MQTTProxy {
  async getConfig() {
    const config = await fs.readFile('./unwise-config.json');
    return JSON.parse(config);
  }

  async setup() {
    const config = await this.getConfig();
    const controller = new WiserDoorController(config.wiserdoor);

    const homieDevice = new HomieDevice({
      name: config.homie?.name || 'Ritto Wiser Door Panel',
      device_id: config.homie?.device_id || 'ritto-wiser-door-panel',
      mqtt: config.mqtt,
    });

    await controller.connect();

    const homieNode = homieDevice.node('ritto-wiser-door-panel-adapter', 'Ritto Wiser Door Panel', 'test-node');
    homieNode.advertise('door-opener').setName('Door Opener').setDatatype('boolean').settable(async () => {
      try {
        controller.unlock();
      } catch (e) {
        console.error(e);
        await this.connect();
        controller.unlock();
      }
    });
    const doorbell = homieNode.advertise('door-bell').setName('Door Bell').setRetained(false).setDatatype('boolean');

    controller.on('door-bell', () => doorbell.send('true'));

    homieDevice.setup();
  }
}

new MQTTProxy().setup();

module.exports = MQTTProxy;
