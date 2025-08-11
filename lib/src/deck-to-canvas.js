import { Deck } from '@deck.gl/core';


export async function deckToCanvas(params) {
  const { views, layers, layerFilter, viewState, width, height, useDevicePixels = false } = params;

  const { promise, resolve } = Promise.withResolvers();

  const deck = new Deck({
    views,
    layers,
    layerFilter,
    initialViewState: viewState,
    width,
    height,
    useDevicePixels,
    onAfterRender: () => {
      resolve({
        deck,
        canvas: deck.getCanvas(),
      })
    },
  });

  return promise;
}
