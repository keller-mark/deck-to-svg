
/**
 * Represents a rectangle to be rendered.
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
export class TwoRectangle {
  constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      /** @member {string} */
      this.stroke = null;
      /** @member {string} */
      this.fill = "#000";
      /** Width of the stroke line if stroke is not null. 
       * @member {number} */
      this.linewidth = 1;
      /** @member {number} */
      this.opacity = 1;
      /** In radians. 
       * @member {number} */
      this.rotation = null;
  }
}

/**
* Represents a circle to be rendered.
* @param {number} x
* @param {number} y
* @param {number} radius
*/
export class TwoCircle {
  constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;

      /** @member {string} */
      this.stroke = null;
      /** @member {string} */
      this.fill = "#000";
      /** Width of the stroke line if stroke is not null. 
       * @member {number} */
      this.linewidth = 1;
      /** @member {number} */
      this.opacity = 1;
  }
}

/**
* Represents a line to be rendered.
* @param {number} x1
* @param {number} y1
* @param {number} x2
* @param {number} y2
*/
export class TwoLine {
  constructor(x1, y1, x2, y2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;

      /** @member {string} */
      this.stroke = "#000";
      /** Width of the stroke line if stroke is not null. 
       * @member {number} */
      this.linewidth = 1;
      /** @member {number} */
      this.opacity = 1;
  }
}

/**
* Represents a path to be rendered.
* @param {number[]} points
*/
export class TwoPath {
  constructor(points) {
      this.points = points;

      /** @member {string} */
      this.stroke = "#000";
      /** @member {string} */
      this.fill = "#fff";
      /** Width of the stroke line if stroke is not null. 
       * @member {number} */
      this.linewidth = 1;
      /** @member {number} */
      this.opacity = 1;
  }
}

/**
* Represents text to be rendered.
* @param {number} x
* @param {number} y
* @param {number} width
* @param {number} height
* @param {string} text
*/
export class TwoText {
  constructor(x, y, width, height, text) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;

      /** @member {string} */
      this.fill = "#000";
      /** @member {number} */
      this.fontsize = 14;
      /** @member {string} */
      this.font = "Arial,sans-serif";
      /** Corresponds to canvas `context.textAlign`.
       * Possible values: "start", "middle", "end".
       * @member {string} */
      this.align = "middle";
      /** Corresponds to canvas `context.textBaseline`.
       * Possible values: "alphabetic", "top", "middle", "bottom".
       * @member {string} */
      this.baseline = "alphabetic";
      /** @member {number} */
      this.opacity = 1;
      /** In radians. 
       * @member {number} */
      this.rotation = null;
      /** How text that overflows the bounding box should be dealt with.
       * Possible values: null, "clip", "ellipsis".
       * @member {string} */
      this.overflow = null;
  }


}

/**
     * Create a new rectangle.
     * @param {number} x The x-coordinate for the top left corner of the rect.
     * @param {number} y The y-coordinate for the top left corner of the rect.
     * @param {number} width The width for the rect.
     * @param {number} height The height for the rect.
     * @returns {TwoRectangle} Instance of new rectangle.
     */
export function makeRect(x, y, width, height) {
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
export function makeCircle(x, y, radius) {
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
export function makeLine(x1, y1, x2, y2) {
  const line = new TwoLine(x1, y1, x2, y2);
  return line;
}

/**
* Create a new path.
* @param {...number} args Coordinates x1, y1, x2, y2, x3, y3, etc.
* @returns {TwoPath} Instance of new path.
*/
export function makePath(...args) {
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
export function makeText(x, y, width, height, text) {
  const obj = new TwoText(x, y, width, height, text);
  return obj;
}
