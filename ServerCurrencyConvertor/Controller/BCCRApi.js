const axios = require('axios');
const { DOMParser } = require('xmldom');
const { format } = require('date-fns');

function indicadoresEconomicosBCCR(email, token, fechaInicio, fechaFinal) {
    try {
        const todayDate = format(new Date(), 'dd/MM/yyyy');
        const BCCRurl = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos';

        const payload = {
            FechaInicio: fechaInicio || todayDate,
            FechaFinal: fechaFinal || todayDate,
            Nombre: 'N',
            SubNiveles: 'N',
            Indicador: 317,
            CorreoElectronico: email,
            Token: token,
        };

        const postCompra = axios.post(BCCRurl, payload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        payload.Indicador = 318;

        const postVenta = axios.post(BCCRurl, payload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return Promise.all([postCompra, postVenta])
            .then(([compra, venta]) => {
                const compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
                const ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml');

                return {
                    compra: parseFloat(compraNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2),
                    venta: parseFloat(ventaNode.documentElement.getElementsByTagName('NUM_VALOR')[0].childNodes[0].nodeValue).toFixed(2),
                };
            })
            .catch(error => {
                console.error('Error en las solicitudes:', error.message);
                throw new Error('No se pudo obtener los indicadores económicos');
            });

    } catch (error) {
        console.error('Error en la función:', error.message);
        throw new Error('Error al procesar los datos de indicadores económicos');
    }
}

module.exports = indicadoresEconomicosBCCR;
