import { describe, it, expect } from 'vitest';
import { ScatterplotLayer } from '@deck.gl/layers';
import { OrthographicView, COORDINATE_SYSTEM, } from '@deck.gl/core';
import { deckToSvg } from './index.js';

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

    });
})