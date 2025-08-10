import d3 from './d3.js';
import { makeCircle } from './shapes.js';
import { measureText } from './text.js';
import { initSvg, updateSvg } from './svg.js';

function transformCoordinates(position, viewState, width, height) {
  // TODO: use the DeckGL View's x/y/w/h in the transformation.
  const x = (position[0] - viewState.target[0]) * (2 ** viewState.zoom) + width / 2;
  const y = (position[1] - viewState.target[1]) * (2 ** viewState.zoom) + height / 2;
  return [x, y];
}

function transformScalar(radius, viewState) {
  return radius * (2 ** viewState.zoom);
}

function createScatterplotLayerElements(view, layer, viewState, width, height) {
  const {
    data,
    getPosition,
    getRadius,
    getFillColor,
    getLineColor,
    getLineWidth,
    radiusScale,
    coordinateSystem,
    stroked,
    visible,
  } = layer.props;

  if(coordinateSystem !== 0 /* COORDINATE_SYSTEM.CARTESIAN */) {
    throw new Error(`Unsupported coordinate system: ${coordinateSystem}`);
  }

  const elements = [];
  data.forEach((d) => {
    if(!visible) {
      return;
    }
    // TODO: use the `view` when transforming the coordinates.
    const position = transformCoordinates(getPosition(d), viewState, width, height);
    const radius = transformScalar(getRadius(d), viewState) * radiusScale;
    const fillColor = getFillColor(d);
    const lineColor = getLineColor(d);
    const lineWidth = transformScalar(getLineWidth(d), viewState);

    const circle = makeCircle(position[0], position[1], radius);
    circle.fill = `rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`;
    circle.stroke = `rgb(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]})`;
    circle.linewidth = lineWidth;
    elements.push(circle);
  });
  return elements;
}


function createLayerElements(view, layer, viewState, width, height) {
  if(layer.constructor.name === 'ScatterplotLayer') {
    return createScatterplotLayerElements(view, layer, viewState, width, height);
  } else {
    // TODO: support other layer types
    throw new Error(`Unsupported layer type: ${layer.constructor.name}`);
  }
}

export function deckToSvg(params) {
  const { views, layers, layerFilter, viewState, width, height } = params;
  const { svg, g } = initSvg(width, height);

  let elements = [];

  views.forEach(view => {
    layers.forEach(layer => {
      if(!layerFilter || (
        typeof layerFilter === 'function'
        && layerFilter({ layer, viewport: { id: view.id } })
      )) {
        elements = elements.concat(createLayerElements(view, layer, viewState, width, height));
      }
    });
  });

  updateSvg(g, elements);

  return svg;
}