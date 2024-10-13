export const workerCode = `
  function buildRgb(imageData) {
    const rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
      const rgb = {
        r: imageData[i],
        g: imageData[i + 1],
        b: imageData[i + 2],
      };
      rgbValues.push(rgb);
    }
    return rgbValues;
  }
    function isGray(rgbValues) {
  const threshold = 40;
  return (
    Math.abs(rgbValues.r - rgbValues.g) < threshold &&
    Math.abs(rgbValues.g - rgbValues.b) < threshold &&
    Math.abs(rgbValues.b - rgbValues.r) < threshold
  );
}

  function findBiggestColorRange(rgbValues) {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);

      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
    const biggestRange = Math.max(rRange, gRange, bRange);

    if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
  }

  function quantization(rgbValues, depth = 0) {
    const MAX_DEPTH = 6;

    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;
          return prev;
        },
        { r: 0, g: 0, b: 0 }
      );

      color.r = Math.round(color.r / rgbValues.length);
      color.g = Math.round(color.g / rgbValues.length);
      color.b = Math.round(color.b / rgbValues.length);
      return [color];
    }

    const componentToSortBy = findBiggestColorRange(rgbValues);
    rgbValues.sort((p1, p2) => {
      return p1[componentToSortBy] - p2[componentToSortBy];
    });

    const mid = rgbValues.length / 2;
    return [
      ...quantization(rgbValues.slice(0, mid), depth + 1),
      ...quantization(rgbValues.slice(mid + 1), depth + 1),
    ];
  }

  onmessage = function(e) {
    const imageData = e.data;
    const rgbValues = buildRgb(imageData);
    const colors = quantization(rgbValues);
    const quantizedWithoutBlack = colors.filter(color => color.r !== 0);
    const filterGray = quantizedWithoutBlack.filter((color) => !isGray(color));
    const mainColor = filterGray.length > 0 ? filterGray[0] : quantizedWithoutBlack[0];
    postMessage(mainColor);
  }
`;
