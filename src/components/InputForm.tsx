import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  productName: string;
  projectName: string;
  deliveryDate: string;
  warranty: string;
}

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    projectName: '',
    deliveryDate: '',
    warranty: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/qr/generate', formData);
      console.log(response.data);

      // Assuming backend returns a generatedId or qrId
      const generatedId = response.data.qrId; // Adjust according to your API response structure

      // Navigate to the generated URL with the ID
      navigate(`/${generatedId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name
        </label>
        <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
            Project Name
        </label>
        <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryDate">
            Delivery Date
        </label>
        <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warranty">
            Warranty
        </label>
        <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
        />
    </div>
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Generate QR Code
    </button>
</form>

  );
};

export default InputForm;
