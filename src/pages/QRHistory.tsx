import React, { useEffect, useState } from 'react';
import axios from '../api/index';
import { Link } from 'react-router-dom';

interface QRCode {
  id: string;
  productName: string;
  projectName: string;
}

const QRHistory: React.FC = () => {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);

  useEffect(() => {
    const fetchQrCodes = async () => {
      try {
        const response = await axios.get<QRCode[]>('/api/qr/history');
        setQrCodes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQrCodes();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">QR Code History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Project Name</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
            </tr>
          </thead>
          <tbody>
            {qrCodes.map((qr) => (
              <tr key={qr.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/qr/${qr.id}`} className="text-blue-500 hover:underline">
                    {qr.projectName}
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">{qr.productName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QRHistory;
