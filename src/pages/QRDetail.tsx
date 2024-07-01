import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface QRDetailParams {
  id: string;
  [key: string]: any;
}

const QRDetail: React.FC = () => {
  const { id } = useParams<QRDetailParams>(); // Use QRDetailParams for useParams()

  const [qrData, setQrData] = useState<string>(''); // Assuming qrData is a base64 encoded image

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        const response = await axios.get(`/api/qr/${id}`);
        setQrData(response.data.qrData); // Adjust based on your API response structure
      } catch (error) {
        console.error(error);
      }
    };

    fetchQRData();
  }, [id]);

  const handleDownload = () => {
    // Implement download functionality if needed
  };

  const handlePrint = () => {
    // Implement print functionality if needed
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md text-center">
      <img src={`data:image/png;base64, ${qrData}`} alt="QR Code" />
      <div className="mt-4">
        <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
          Download QR Code
        </button>
        <button onClick={handlePrint} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Print QR Code
        </button>
      </div>
    </div>
  );
};

export default QRDetail;
