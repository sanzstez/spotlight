export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const loadCORS = () => {
      const corsImage = new Image();

      corsImage.crossOrigin = 'anonymous';
      corsImage.src = image.src;
      corsImage.onload = () => resolve(corsImage);
    };

    image.onload = loadCORS;
    image.onerror = reject;
    image.src = url;
  })
};

export const dynamicWorker = (funcObj) => {
  // Build a worker from an anonymous function body
  const blobURL = URL.createObjectURL(new Blob(["onmessage = " + funcObj.toString()], { type: 'application/javascript' }));

  const worker = new Worker(blobURL);

  // Won't be needing this anymore
  URL.revokeObjectURL(blobURL);

  return worker;
};