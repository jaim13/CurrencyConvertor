const express = require('express');
const getExchangeRateBCCR = require('./Controller/BCCRApi'); // Asegúrate de que esta ruta sea correcta
const app = express();

// Ruta inicial para obtener el tipo de cambio
app.get('/', async (req, res) => {
  try {
    const email = 'jaimmartinez13@gmail.com'; 
    const token = 'R3D3M2BIE2'; 
    const today = new Date();
    const fechaHoy = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const exchangeRate = await getExchangeRateBCCR(email, token, fechaHoy, fechaHoy);
    res.status(200).json(exchangeRate); 
  } catch (error) {
    console.error('Error al obtener el tipo de cambio:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al obtener el tipo de cambio.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
