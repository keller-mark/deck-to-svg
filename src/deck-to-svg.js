import d3 from './d3';
import { TwoCircle, TwoLine, TwoPath, TwoRectangle, TwoText } from './shapes';
import { measureText } from './text';
import { initSvg, updateSvg } from './svg';


function createScatterplotLayerElements(view, layer, viewState) {
  // TODO
}

function createLayerElements(view, layer, viewState) {
  if(layer.constructor.name === 'ScatterplotLayer') {
    return createScatterplotLayerElements(view, layer, viewState);
  }
  // TODO: other layer types
}

export function deckToSvg(views, layers, layerFilter, viewState, width, height) {
  const { svg, g } = initSvg(width, height);

  const elements = [];

  views.forEach(view => {
    layers.forEach(layer => {
      if(layerFilter({ layer, viewport: { id: view.id } })) {
        elements.concat(createLayerElements(view, layer, viewState));
      }
    });
  });

  updateSvg(g, elements);

  return svg;
}