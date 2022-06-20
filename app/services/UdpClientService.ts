import dgram, { Socket } from 'node:dgram';

class UdpClientService {
  private address: string;
  private targetPort: number;
  private udpClient?: Socket;
  private sourcePort = 11111;

  constructor(address: string, port: number) {
    this.address = address;
    this.targetPort = port;
  }

  createClientSocket() {
    this.udpClient = dgram.createSocket('udp4');
    this.udpClient.bind(this.sourcePort);
    return true;
  }

  sendMessage(message: string, callback: (error: Error | null) => void) {
    if (!this.udpClient) {
      throw new Error('udp client not existed');
    }

    this.udpClient.send(message, this.targetPort, this.address, (error) => {
      if (this.udpClient) {
        this.udpClient.close();
      }
      callback(error);
    });
  }
}

export { UdpClientService };
