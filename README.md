# deck-to-svg

Function to export a DeckGL visualization to SVG ([background](https://deckgl.slack.com/archives/C34AC5MSQ/p1656353649346079)). 

🚧 work in progress 🚧

Roadmap:
- Support a subset of the DeckGL API
  - subset of layers (`ScatterplotLayer`, `PathLayer`, `LineLayer`, `PolygonLayer`, `TextLayer`)
  - subset of layer props, specifically those that have straightforward analogs in SVG (position, size, color, opacity, rotation, etc.)
  - `viewState`
  - subset of views, specifically 2D ones (`OrthographicView`)
