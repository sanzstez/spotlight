export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    //image.crossOrigin = "anonymous";
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