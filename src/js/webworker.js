export const filterFunctionality = (e) => {
  const { bitmap, offscreenCanvas: canvas, filterColor } = e.data;

  const ctx = canvas.getContext('2d');

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  ctx.drawImage(bitmap, 0, 0);

  const redCoef = filterColor == 'red' ? 1 : 0;
  const greenCoef = filterColor == 'green' ? 1 : 0;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const blend = pixels[i] * redCoef + pixels[i + 1] * greenCoef + pixels[i + 2] * 1;

    pixels[i] = blend;
    pixels[i + 1] = blend;
    pixels[i + 2] = blend;
  }

  ctx.putImageData(imageData, 0, 0);

  canvas[
    canvas.convertToBlob
      ? 'convertToBlob' // specs
      : 'toBlob'        // current Firefox
  ]({ type: 'image/jpeg' })
    .then(blob => {
      const dataURL = new FileReaderSync().readAsDataURL(blob);
      self.postMessage(dataURL);
    });
};