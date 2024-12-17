const express = require('express');
const getExchangeRateBCCR = require('./Controller/BCCRApi');
const app = express();

// Ruta inicial para obtener el tipo de cambio
app.get('/', async (req, res) => {
  try {
    const compra = await getExchangeRateBCCR(317); // Indicador 317: Tipo de cambio de compra
    const venta = await getExchangeRateBCCR(318);  // Indicador 318: Tipo de cambio de venta

    res.json({
      compra,
      venta,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
