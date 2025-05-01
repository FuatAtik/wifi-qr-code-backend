import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  createQRCode,
  getQRCodesByUser,
  deleteQRCode,
  updateQRCode
} from '../controllers/qrcodeController';

const router = express.Router();

// Tüm QR kod route'ları için auth gerekli
router.use(authenticateToken);

router.post('/', createQRCode);
router.get('/', getQRCodesByUser);
router.delete('/:id', deleteQRCode);
router.put('/:id', updateQRCode);

export default router;
