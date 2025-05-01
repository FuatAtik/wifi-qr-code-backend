import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import qrcode from 'qrcode';
import QRCode from '../models/QRCode';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const qrCodesPath = path.join(__dirname, '../../data/qr-codes.json');

// Initialize qr-codes file if it doesn't exist
if (!fs.existsSync(qrCodesPath)) {
  fs.writeFileSync(qrCodesPath, JSON.stringify([]));
}

const getQRCodes = (): QRCode[] => {
  return JSON.parse(fs.readFileSync(qrCodesPath, 'utf-8'));
};

const saveQRCodes = (qrCodes: QRCode[]) => {
  fs.writeFileSync(qrCodesPath, JSON.stringify(qrCodes, null, 2));
};

export const createQRCode = async (req: AuthRequest, res: Response) => {
  try {
    const { label, ssid, password, securityType, isHidden, description } = req.body;
    const userId = req.user?.id;

    if (!label || !ssid || !password || !securityType) {
      return res.status(400).json({ error: 'Label, SSID, password, and security type are required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Generate QR code
    const wifiString = `WIFI:T:${securityType};S:${ssid};P:${password};H:${isHidden ? 'true' : 'false'};;`;
    const qrCodeImage = await qrcode.toDataURL(wifiString);

    const newQRCode: QRCode = {
      id: uuidv4(),
      label,
      ssid,
      password,
      securityType,
      isHidden: isHidden || false,
      description: description || '',
      qrCode: qrCodeImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: userId
    };

    const qrCodes = getQRCodes();
    qrCodes.push(newQRCode);
    saveQRCodes(qrCodes);

    res.status(201).json(newQRCode);
  } catch (error) {
    console.error('Create QR code error:', error);
    res.status(500).json({ error: 'Failed to create QR code' });
  }
};

export const getQRCodesByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const qrCodes = getQRCodes();
    const userQRCodes = qrCodes.filter(qr => qr.createdBy === userId);

    res.json(userQRCodes);
  } catch (error) {
    console.error('Get QR codes error:', error);
    res.status(500).json({ error: 'Failed to get QR codes' });
  }
};

export const deleteQRCode = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const qrCodes = getQRCodes();
    const qrCodeIndex = qrCodes.findIndex(qr => qr.id === id && qr.createdBy === userId);

    if (qrCodeIndex === -1) {
      return res.status(404).json({ error: 'QR code not found or unauthorized' });
    }

    qrCodes.splice(qrCodeIndex, 1);
    saveQRCodes(qrCodes);

    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Delete QR code error:', error);
    res.status(500).json({ error: 'Failed to delete QR code' });
  }
};

export const updateQRCode = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { label, ssid, password, securityType, isHidden, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!label || !ssid || !password || !securityType) {
      return res.status(400).json({ error: 'Label, SSID, password, and security type are required' });
    }

    const qrCodes = getQRCodes();
    const qrCodeIndex = qrCodes.findIndex(qr => qr.id === id && qr.createdBy === userId);

    if (qrCodeIndex === -1) {
      return res.status(404).json({ error: 'QR code not found or unauthorized' });
    }

    // Generate new QR code
    const wifiString = `WIFI:T:${securityType};S:${ssid};P:${password};H:${isHidden ? 'true' : 'false'};;`;
    const qrCodeImage = await qrcode.toDataURL(wifiString);

    qrCodes[qrCodeIndex] = {
      ...qrCodes[qrCodeIndex],
      label,
      ssid,
      password,
      securityType,
      isHidden: isHidden || false,
      description: description || '',
      qrCode: qrCodeImage,
      updatedAt: new Date().toISOString()
    };

    saveQRCodes(qrCodes);

    res.json(qrCodes[qrCodeIndex]);
  } catch (error) {
    console.error('Update QR code error:', error);
    res.status(500).json({ error: 'Failed to update QR code' });
  }
};
