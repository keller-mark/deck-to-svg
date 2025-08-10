import { Deck } from '@deck.gl/core';


export function deckToCanvas(params) {
  const { views, layers, layerFilter, viewState, width, height } = params;

  const deck = new Deck({
    views,
    layers,
    layerFilter,
    initialViewState: viewState,
    width,
    height,
  });

  return {
    deck,
    canvas: deck.getCanvas(),
  };
}
