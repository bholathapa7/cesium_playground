import * as Cesium from 'cesium';

const elementMap: any = {}; // Build a map of elements to features.
const hiddenElements = [
  112001, 113180, 131136, 113167, 71309, 109652, 111178, 113156, 113170, 124846,
  114076, 131122, 113179, 114325, 131134, 113164, 113153, 113179, 109656,
  114095, 114093, 39225, 39267, 113149, 113071, 112003, 39229, 113160, 39227,
  39234, 113985, 39230, 112004, 39223,
];

function getElement(feature: any) {
  return parseInt(feature.getProperty('element'), 10);
}

export function loadFeature(feature: { show: boolean }) {
  const element = getElement(feature);
  let features = elementMap[element];
  if (!Cesium.defined(features)) {
    features = [];
    elementMap[element] = features;
  }
  features.push(feature);

  if (hiddenElements.indexOf(element) > -1) {
    feature.show = false;
  }
}

export function processContentFeatures(
  content: any,
  callback: (feature: any) => void
) {
  const featuresLength = content.featuresLength;
  for (let i = 0; i < featuresLength; ++i) {
    const feature = content.getFeature(i);
    callback(feature);
  }
}

export function processTileFeatures(
  tile: { content: any },
  callback: (feature: any) => void
) {
  const content = tile.content;
  const innerContents = content.innerContents;
  if (Cesium.defined(innerContents)) {
    const length = innerContents.length;
    for (let i = 0; i < length; ++i) {
      processContentFeatures(innerContents[i], callback);
    }
  } else {
    processContentFeatures(content, callback);
  }
}
