import d3 from './d3.js';
import { makeCircle } from './shapes.js';
import { measureText } from './text.js';
import { initSvg, updateSvg } from './svg.js';
import { range } from 'lodash-es';

function normalizeGet(getter, d, index, data) {
  if(typeof getter === 'function') {
    if(getter.length === 2) {
      // Binary data case:
      // Reference: https://deck.gl/docs/developer-guide/performance#use-binary-data
      const target = [0, 0, 0, 0];
      return getter(d, { index, data, target });
    } else {
      return getter(d);
    }
  }
  // Getter is a scalar/array value.
  return getter;
}

function normalizeData(data) {
  if(Array.isArray(data)) {
    return data;
  }
  if(typeof data === 'object' && data.src && data.length) {
    // Binary data case:
    // Reference: https://deck.gl/docs/developer-guide/performance#use-binary-data
    if(data.attributes) {
      // See https://github.com/visgl/deck.gl/blob/55af702e30e9bfb71e85c473fb131c49d3b4a688/modules/core/src/utils/iterable-utils.ts#L65
      throw new Error('Not yet implemented: Binary data with attribute information.')
    }
    return range(data.length);
  }
  throw new Error('Unsupported data format. Expected an array or { src, length } object.');
}



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
    data: origData,
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

  const data = normalizeData(origData);

  data.forEach((d, i) => {
    if(!visible) {
      return;
    }
    // TODO: use the `view` when transforming the coordinates.
    const position = transformCoordinates(
      normalizeGet(getPosition, d, i, origData),
      viewState, width, height
    );
    const radius = transformScalar(
      normalizeGet(getRadius, d, i, origData), viewState
    ) * radiusScale;
    const fillColor = normalizeGet(getFillColor, d, i, origData);
    const lineColor = normalizeGet(getLineColor, d, i, origData);
    const lineWidth = transformScalar(
      normalizeGet(getLineWidth, d, i, origData),
      viewState
    );

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