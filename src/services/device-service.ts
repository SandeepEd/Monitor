import client from "../util/http";

class DeviceService {
  private static instance: DeviceService;
  private requestQueue: Promise<any> = Promise.resolve();

  // Singleton instance not required for this service, but it's a good practice
  public static getInstance(): DeviceService {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }

    return DeviceService.instance;
  }

  public sendCommand = async (command: string) => {
    this.requestQueue = this.requestQueue
      .then(() => client.get(`/?command=${command}`))
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });

    // Chain another `then` to ensure the promise chain returns Promise<string>
    const resultPromise = this.requestQueue.then(
      (response) => response.data as string
    );

    return resultPromise; // Return the Promise<string>
  };

  public getHardwareStatus = async () => {
    const data = await this.sendCommand("GetStatus");
    return data;
  };

  public getVideoInputStatus = async () => {
    const data = await this.sendCommand("GetVideoInput");
    return data;
  };

  public getAudioInputStatus = async () => {
    const data = await this.sendCommand("GetAudioInput");
    return data;
  };
}

export default DeviceService;
