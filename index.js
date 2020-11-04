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
    var dpto = L.geoJSON(departamentos, {
        onEachFeature: onEachFeatureDpto
    })
    var hospitales = L.geoJSON(hosp, {
        onEachFeature: onEachFeatureHosp
    })

    var areasInf = L.geoJSON(buffer)
    
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
        "Departamentos de Chaco": dpto,
        "Hospitales de Chaco": hospitales,
        "Buffer": areasInf
    };

    L.control.layers(baseLayers, overlays).addTo(map);   

    function onEachFeatureDpto(feature, layer) {
        layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight
	})
        if (feature.properties && feature.properties.nam) {
            layer.bindPopup(feature.properties.nam);
        }
    }

    function onEachFeatureHosp(feature, layer) {
        if (feature.properties && feature.properties.fna) {
            layer.bindPopup(feature.properties.fna);
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