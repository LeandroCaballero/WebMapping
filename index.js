var corrientes = L.marker([-27.46784, -58.8344]).bindPopup('Corrientes, Corrientes'),
    chaco = L.marker([-27.46056, -58.98389]).bindPopup('Resistencia, Chaco'),
    formosa = L.marker([-26.1833, -58.1833]).bindPopup('Formosa, Formosa'),
    misiones = L.marker([-27.3998, -55.933]).bindPopup('Posadas, Misiones');
var cities = L.layerGroup([corrientes, chaco, formosa, misiones]);

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
    grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

var dpto = L.geoJSON(escuelasXDpto, {
    onEachFeature: onEachFeatureDpto,
    style: style
})

var escUrbanas = L.geoJSON(urbanas)

var areasInf = L.geoJSON(buffer)

var rutas = L.geoJSON(rut, {
    onEachFeature: onEachFeatureRutas
})
// var escuelas = L.geoJSON(esc, {
//     onEachFeature: onEachFeatureEscuelas
// })

var map = L.map('map', {
    center: [-34.6083, -58.3712],
    zoom: 5,
    layers: [streets]   //lo visualizado por defecto
});
var baseLayers = {   //se elige una sola capa
    "Calles": streets,
    "Escala Gris": grayscale
};
var overlays = {   //se pueden combinar capas
    "Ciudades": cities,
    "Escuelas": escUrbanas,
    "Rutas Provinciales y Nacionales": rutas,
    "Cantidad de escuelas por Departamento": dpto,
    "Buffer": areasInf
};

L.control.layers(baseLayers, overlays).addTo(map);

function onEachFeatureDpto(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
    if (feature.properties && feature.properties.nam) {
        layer.bindPopup(
            "<div style=text-align:center><h3>" + feature.properties.nam +
            "<h3></div><hr><table><tr></tr><tr><td>Escuelas: " + feature.properties.Cnt_FDEPAR +
            "</td></tr></table>");
    }
}

// function onEachFeatureHosp(feature, layer) {
//     if (feature.properties && feature.properties.fna) {
//         layer.bindPopup(feature.properties.fna);
//     }
// }

function onEachFeatureEscuelas(feature, layer) {
    if (feature.properties && feature.properties.NOMBRE_DE_) {
        layer.bindPopup(feature.properties.NOMBRE_DE_);
    }
}

function onEachFeatureRutas(feature, layer) {
    if (feature.properties && feature.properties.nr) {
        layer.bindPopup("<div style=text-align:center><h3>Ruta Nº: " + feature.properties.nr) + "<h3></div>";
    }
}


L.control.scale().addTo(map);    //escala

//Estilos
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#EC340D',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    dpto.resetStyle(e.target);

}

//Colores distintos para la cantidad de escuelas
function getColor(d) {
    return d > 786 ? '#bd0026' :
        d > 365 ? '#f03b20' :
            d > 256 ? '#fd8d3c' :
                d > 140 ? '#feb24c' :
                    d > 87 ? '#fed976' :
                        '#ffffb2';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.Cnt_FDEPAR),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

