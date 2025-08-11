import { describe, it, expect } from 'vitest';
import { ScatterplotLayer } from '@deck.gl/layers';
import { OrthographicView, COORDINATE_SYSTEM, } from '@deck.gl/core';
import { deckToSvg } from './index.js';

function trim(multiLineStr) {
    return multiLineStr
        .split('\n')
        .map(line => line.trim())
        .join('');
}

describe('Can generate SVG from DeckGL layers', () => {
    it('should create SVG elements for ScatterplotLayer', () => {
        const layer = new ScatterplotLayer({
            id: 'ScatterplotLayer',
            data: [
                { x: 0, y: 0, r: 5 },
                { x: 1, y: 1, r: 10 },
                { x: -1, y: -1, r: 20 }
            ],
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            visible: true,
            stroked: true,
            getPosition: d => [d.x, d.y],
            getRadius: d => d.r,
            getFillColor: [255, 140, 0],
            getLineColor: [0, 0, 0],
            getLineWidth: 10,
            radiusScale: 6,
            pickable: true
        });

        const layers = [layer];
        const views = [new OrthographicView({ id: 'ortho', controller: true })];

        const svg = deckToSvg({
            views,
            layers,
            layerFilter: null,
            viewState: { zoom: 1, target: [0, 0] },
            width: 800,
            height: 600
        });

        expect(svg.node().outerHTML).toEqual(trim(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <g width="800" height="600">
                    <circle cx="400" cy="300" r="60" opacity="1" fill="rgb(255, 140, 0)" stroke-width="20" stroke="rgb(0, 0, 0)"></circle>
                    <circle cx="402" cy="302" r="120" opacity="1" fill="rgb(255, 140, 0)" stroke-width="20" stroke="rgb(0, 0, 0)"></circle>
                    <circle cx="398" cy="298" r="240" opacity="1" fill="rgb(255, 140, 0)" stroke-width="20" stroke="rgb(0, 0, 0)"></circle>
                </g>
            </svg>
        `));

    });
})