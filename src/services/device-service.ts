import client from '../util/http';

class DeviceService {
  private static instance: DeviceService;

  // Singleton instance
  public static getInstance(): DeviceService {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }

    return DeviceService.instance;
  }

  public sendCommand = async (command: string) => {
    const response = await client.get(`/?command=${command}`);
    return response.data;
  }

  public getHardwareStatus = async () => {
    const data = await this.sendCommand('GetStatus');
    return data;
  }

  public getVideoInputStatus = async () => {
    const data = await this.sendCommand('GetVideoInput');
    return data;
  }

  public getAudioInputStatus = async () => {
    const data = await this.sendCommand('GetAudioInput');
    return data;
  }
}

export default DeviceService;
