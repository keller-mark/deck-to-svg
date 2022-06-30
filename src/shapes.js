
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