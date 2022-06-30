import d3 from './d3';
import { TwoCircle, TwoLine, TwoPath, TwoRectangle, TwoText } from './shapes';
import { measureText } from './text';

function initSvg(width, height) {
    const svg = d3.create('svg');
    svg
        .attr("width", width)
        .attr("height", height);
    
    const g = svg
        .append("g")
        .attr("width", width)
        .attr("height", height);

    return { svg, g };
}


function updateSvg(g, elements) {
    elements.forEach((d) => {
        if(d instanceof TwoRectangle) {
            const rect = g.append("rect")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", d.width)
                .attr("height", d.height)
                .attr("opacity", d.opacity);
            
            if(d.fill != null) {
                rect
                    .attr("fill", d.fill);
            } else {
                rect
                    .attr("fill", "transparent");
            }
            if(d.stroke != null) {
                rect
                    .attr("stroke-width", d.linewidth)
                    .attr("stroke", d.stroke);
            }
            if(d.rotation != null) {
                rect
                    .attr("transform", `rotate(${d.rotation * 180/Math.PI},${d.x + d.width/2},${d.y + d.height/2})`);
            }
        } else if(d instanceof TwoCircle) {
            const circle = g.append("circle")
                .attr("cx", d.x)
                .attr("cy", d.y)
                .attr("r", d.radius)
                .attr("opacity", d.opacity);
            
            if(d.fill != null) {
                circle
                    .attr("fill", d.fill);
            } else {
                circle
                    .attr("fill", "transparent");
            }
            if(d.stroke != null) {
                circle
                    .attr("stroke-width", d.linewidth)
                    .attr("stroke", d.stroke);
            }
        } else if(d instanceof TwoLine) {
            const line = g.append("line")
                .attr("x1", d.x1)
                .attr("y1", d.y1)
                .attr("x2", d.x2)
                .attr("y2", d.y2)
                .attr("opacity", d.opacity);
            if(d.stroke != null) {
                line
                    .attr("stroke-width", d.linewidth)
                    .attr("stroke", d.stroke);
            }
        } else if(d instanceof TwoPath) {
            const path = g.append("path")
                .attr("opacity", d.opacity);
            
            let pathD = "";
            if(d.points.length > 1) {
                d.points.forEach((p, i) => {
                    if(i == 0) {
                        pathD += `M ${p[0]} ${p[1]}`;
                    } else {
                        pathD += `L ${p[0]} ${p[1]}`;
                    }
                });
            }

            if(d.fill != null) {
                path
                    .attr("fill", d.fill);
            } else {
                path
                    .attr("fill", "transparent");
            }
            if(d.stroke != null) {
                path
                    .attr("stroke-width", d.linewidth)
                    .attr("stroke", d.stroke);
            }
            path.attr("d", pathD);
        } else if(d instanceof TwoText) {
            const text = g.append("text")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("text-anchor", d.align)
                .attr("dominant-baseline", 
                    (d.baseline === "top" ? "text-before-edge" : (d.baseline === "bottom" ? "text-after-edge" : d.baseline))
                )
                .attr("opacity", d.opacity)
                .attr("fill", d.fill)
                .attr("font-size", d.fontsize)
                .attr("font-family", d.font)
                .text(d.text);
            
            let content = d.text;
            if(d.overflow === "clip") {
                while(content.length > 0 && text.node().getComputedTextLength() > d.width) {
                    content = content.substring(0, content.length - 1);
                    text.text("content");
                }
            } else if(d.overflow === "ellipsis") {
                if(text.node().getComputedTextLength() > d.width) {
                    while(content.length > 0 && text.node().getComputedTextLength() > d.width) {
                        content = content.substring(0, content.length - 1);
                        text.text(content + "...");
                    }
                }
            }
            
            if(d.rotation != null) {
                text
                    .attr("transform", `rotate(${d.rotation * 180/Math.PI},${d.x},${d.y})`);
            }
        }
    });
}

/**
     * Create a new rectangle.
     * @param {number} x The x-coordinate for the top left corner of the rect.
     * @param {number} y The y-coordinate for the top left corner of the rect.
     * @param {number} width The width for the rect.
     * @param {number} height The height for the rect.
     * @returns {TwoRectangle} Instance of new rectangle.
     */
function makeRect(x, y, width, height) {
    const rect = new TwoRectangle(x, y, width, height);
    return rect;
}

/**
 * Create a new circle.
 * @param {number} x The x-coordinate for the center of the circle.
 * @param {number} y The y-coordinate for the center of the circle.
 * @param {number} radius The radius for the circle.
 * @returns {TwoCircle} Instance of new circle.
 */
function makeCircle(x, y, radius) {
    const circle = new TwoCircle(x, y, radius);
    return circle;
}

/**
 * Create a new line.
 * @param {number} x1 The x-coordinate for the line start point.
 * @param {number} y1 The y-coordinate for the line start point.
 * @param {number} x2 The x-coordinate for the line end point.
 * @param {number} y2 The y-coordinate for the line end point.
 * @returns {TwoLine} Instance of new line.
 */
function makeLine(x1, y1, x2, y2) {
    const line = new TwoLine(x1, y1, x2, y2);
    return line;
}

/**
 * Create a new path.
 * @param {...number} args Coordinates x1, y1, x2, y2, x3, y3, etc.
 * @returns {TwoPath} Instance of new path.
 */
function makePath(...args) {
    const points = [];
    for(let i = 0; i < args.length; i += 2) {
        points.push([ args[i], args[i+1] ]);
    }

    const path = new TwoPath(points);
    return path;
}

/**
 * Create a new text.
 * @param {number} x The x-coordinate for the anchor point of the text.
 * @param {number} y The y-coordinate for the anchor point of the text.
 * @param {number} width The width for the text.
 * @param {number} height The height for the text.
 * @returns {TwoText} Instance of new text.
 */
function makeText(x, y, width, height, text) {
    const obj = new TwoText(x, y, width, height, text);
    return obj;
}

function createScatterplotLayerElements(view, layer, viewState) {
    // TODO
}

export function deckToSvg(views, layers, layerFilter, viewState, width, height) {
    const { svg, g } = initSvg(width, height);

    const elements = [];

    views.forEach(view => {
        layers.forEach(layer => {
            if(layerFilter({ layer, viewport: { id: view.id } })) {
                if(layer.constructor.name === 'ScatterplotLayer') {
                    elements.concat(createScatterplotLayerElements(view, layer, viewState))
                }
                // TODO
            }
        });
    });

    updateSvg(g, elements);

    return svg;
}