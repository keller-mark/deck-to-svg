import React, { useRef, useEffect } from 'react';
import { deckToSvg, deckToCanvas } from 'deck-to-svg';

import { ScatterplotLayer } from '@deck.gl/layers';
import { OrthographicView, COORDINATE_SYSTEM, } from '@deck.gl/core';

const width = 600;
const height = 400;

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
    width: width,
    height: height,
};

export function Demo() {

    const svgRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const svg = deckToSvg(params);
        const promise = deckToCanvas(params);

        promise.then(({ deck }) => {
            const { canvas } = deck;
            if(canvas) {
                const ctx2 = canvasRef.current.getContext('2d');
                ctx2.drawImage(canvas, 0, 0);

                // Hide the canvas element created by DeckGL
                canvas.style.display = 'none';
            }
        });

        svgRef.current.appendChild(svg.node());

        return () => {
            // Clean up the SVG and canvas elements
            svgRef.current.innerHTML = '';
            canvasRef.current.innerHTML = '';
        };
    }, []);
    
    return (
        <div>
            <h2>Canvas</h2>
            <div id="canvas" style={{ border: '1px dashed black', width, height }}>
                <canvas ref={canvasRef} width={width} height={height} />
            </div>
            <h2>SVG</h2>
            <div id="svg" style={{ border: '1px solid black', width, height }} ref={svgRef} />
        </div>
    );
}