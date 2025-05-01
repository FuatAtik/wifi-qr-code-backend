interface QRCode {
  id: string;
  label: string;           // Network Name
  ssid: string;           // Network SSID
  password: string;       // Network Password
  securityType: string;   // WPA/WPA2
  isHidden: boolean;      // Hidden Network
  description?: string;   // Optional Description
  qrCode: string;        // Generated QR Code
  createdAt: string;
  updatedAt: string;
  createdBy: string;     // user id
}

export default QRCode;
