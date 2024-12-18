import React, { useState, useRef } from "react";
import Button from './ButtonPlus'; 

const Currencies = () => {
  useRef( getColtoUsd = () => {
    
  },
  getColtoUsd()
    ,[]);

  // Mantener la lista de inputs
  const [inputs, setInputs] = useState([
    { id: Date.now(), amount: '', currency: 'USD' }
  ]);

  // Función que maneja el cambio de estado de inputs
  const handleInputChange = (id, field, value) => {
    setInputs(prevInputs => 
      prevInputs.map(input => 
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };

  // Agregar un nuevo input
  const addInput = () => {
    setInputs(prevInputs => [
      ...prevInputs,
      { id: Date.now(), amount: '', currency: 'USD' }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Currency Converter
        </h1>

        {/* Iterar sobre la lista de inputs y renderizarlos */}
        {inputs.map((input, index) => (
          <div className="flex items-center mb-4" key={input.id}>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={input.amount}
                onChange={(e) => handleInputChange(input.id, 'amount', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter amount"
              />
            </div>

            <div className="ml-4 w-32">
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={input.currency}
                onChange={(e) => handleInputChange(input.id, 'currency', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="USD">USD</option>
                <option value="CRC">CRC</option>
                <option value="COP">COP</option>
              </select>
            </div>
          </div>
        ))}

        {/* Botón de agregar más inputs */}
        <Button OnClick={addInput} />
      </div>
    </div>
  );
};

export default Currencies;
