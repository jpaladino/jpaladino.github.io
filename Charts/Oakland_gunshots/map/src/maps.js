// creates actual basemap
var dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18
});





// functions to style the seismic risk layer
function getShotsColor(a) {
            return a > 156 ? "#a50f15":
                   a > 64 ? "#de2d26" :
                   a > 31  ? "#fb6a4A" :
                   a > 12 ? "#fcae91" :
                   a > 3 ? "#fcae91" :
                   "#fee5d9";
            }
function getCallsColor(a) {
            return a > 156 ? "#08519c":
                   a > 64 ? "#3182bd" :
                   a > 31  ? "#6baed6" :
                   a > 12 ? "#9ecae1" :
                   a > 3 ? "#c6dbef" :
                   "#eff3ff";

}



function getShotsStyle(feature) {
                return {
                    fillColor: getShotsColor(feature.properties.PNTCNT),
                    color: getShotsColor(feature.properties.PNTCNT),
                    weight: 1,
                    opacity: 0.4,
                    fillOpacity: 0.7
                };
            }

function getCallsStyle(feature) {
                return {
                    fillColor: getCallsColor(feature.properties.PNTCNT),
                    color: getCallsColor(feature.properties.PNTCNT),
                    weight: 1,
                    opacity: 0.4,
                    fillOpacity: 0.7
                };
            }
var ShotsLayer = L.geoJson(shotspotter, {style:getShotsStyle, onEachFeature:popupTextShots});
var CallsLayer = L.geoJson(calls, {style:getCallsStyle, onEachFeature:popupTextCalls});

function popupTextShots (feature, layer){
    layer.bindPopup("<strong>Number of Gunshots Detected: </strong>"+ feature.properties.PNTCNT)
}
function popupTextCalls (feature, layer){
    layer.bindPopup("<strong>Calls Reporting Gunfire: </strong>"+ feature.properties.PNTCNT)
}

// creates the map and sets initial view, including layers to be displayed, plus limits for zoom and maximum extent
var map = L.map("map", {
    center: new L.LatLng(37.795, -122.29),
    zoom: 12,
    maxZoom: 15,
    minZoom: 10,
    layers: [dark, ShotsLayer]
});


// Defines the two basemaps
var baseMaps = {
    "Shotspotter": ShotsLayer,

    "Reported Gunfire": CallsLayer
};


// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
};
     

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {collapsed: false});
map.addControl(layersControl);



// Uses jQuery to add some responsive design, resetting zoom levels for small and very large screens
function responsive() {
     width = $( window ).width();
     height = $( window ).height();
    if (width < 768) {
        // set the zoom level to 3
        map.setZoom(11);
    } else if (width > 1500) {
        // set the zoom level to 5
        map.setZoom(13);
    } else {
        map.setZoom(12);
    }
 }

  // applies the function above both on initial load and window resize
   $(window).ready(responsive).resize(responsive);