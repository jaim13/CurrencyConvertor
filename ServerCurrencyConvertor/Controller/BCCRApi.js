const axios = require('axios');
const { parseStringPromise } = require('xml2js');

// Configuración del SOAP Request
function createSoapRequest(indicator) {
    return `
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <ObtenerIndicadoresEconomicosXML xmlns="http://ws.sdde.bccr.fi.cr">
            <tcIndicador>${parseInt(indicator, 10)}</tcIndicador>
            <tcFechaInicio>${getToday()}</tcFechaInicio>
            <tcFechaFinal>${getToday()}</tcFechaFinal>
            <tcNombre>MiNombre</tcNombre>
            <tnSubNiveles>N</tnSubNiveles>
          </ObtenerIndicadoresEconomicosXML>
        </soap12:Body>
      </soap12:Envelope>
    `;
  }
  

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getToday() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Consumir la API del Banco Central
async function getExchangeRateBCCR(indicator) {
  const soapRequest = createSoapRequest(indicator);
  try {
    const response = await axios.post(
      'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx',
      soapRequest,
      {
        headers: {
          'Content-Type': 'application/soap+xml; charset=utf-8',
        },
      }
    );

    // Convertir respuesta XML a JSON
    const json = await parseStringPromise(response.data);

    // Extraer los datos
    const data = json['soap:Envelope']['soap:Body'][0]['ObtenerIndicadoresEconomicosXMLResponse'][0]['ObtenerIndicadoresEconomicosXMLResult'][0];
    return data;

  } catch (error) {
    console.error('Error al consumir la API:', error.message);
    throw new Error('No se pudo obtener el tipo de cambio');
  }
}

module.exports = getExchangeRateBCCR;
