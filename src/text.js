import d3 from './d3';

export function measureText(d) {
  const svg = d3.create("svg");
  const g = svg.append("g");

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

  // Measure the dimensions.
  const dims = { width: 0, height: 0 };
  try {
      const { width, height } = text.node().getBBox();
      dims.width = width;
      dims.height = height;
  } catch(e) {
      console.warn(e);
  }

  // Approximate text dimensions when not assigned properly.
  if(dims.width === 0 && dims.height === 0){
      console.warn("Approximating text dimensions in Two.measureTextSvg().");
      dims.width = content.length;
      dims.height = d.fontsize;
  }

  return dims;
}