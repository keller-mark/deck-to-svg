import { deckToSvg } from './index.js';
import { deckToCanvas } from './deck-to-canvas.js';

import { ScatterplotLayer } from '@deck.gl/layers';
import { OrthographicView, COORDINATE_SYSTEM, } from '@deck.gl/core';

const layer = new ScatterplotLayer({
    id: 'ScatterplotLayer',
    data: [
        { x: 10, y: 10, r: 5 },
        { x: 11, y: 11, r: 1 },
        { x: -11, y: -11, r: 2 }
    ],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    visible: true,
    stroked: true,
    getPosition: d => [d.x, d.y],
    getRadius: d => d.r,
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
    getLineWidth: d => 1,
    radiusScale: 1,
    pickable: true
});

const layers = [layer];
const views = [new OrthographicView({ id: 'ortho', controller: true })];

const params = {
    views,
    layers,
    layerFilter: null,
    viewState: { zoom: 2, target: [0, 0] },
    width: 600,
    height: 400
};
const { canvas } = deckToCanvas(params);
const svg = deckToSvg(params);
console.log(svg.node());

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello world!</h1>
  </div>
`
document.querySelector('#deck-svg').appendChild(svg.node());
document.querySelector('#deck-canvas').appendChild(canvas);


