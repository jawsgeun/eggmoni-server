import express from 'express';
import { UdpClientService } from '../services';

const router = express.Router();

router.post('/request', (req, res, next) => {
  console.log('req.body', JSON.stringify(req.body));
  const { address, port, message } = req.body;
  const udpClientService = new UdpClientService(address, port);
  udpClientService.createClientSocket();
  udpClientService.sendMessage(message || 'DOOR OPEN', (error) => {
    if (error) {
      res.render('error', {
        message: `메시지 전송 에러 발생: ${error.message}`,
        error,
      });
    }
  });

  res.render('udp/request', { address, port, message });
});

router.get('/request', (req, res, next) => {
  res.render('udp/request');
});

export default router;
