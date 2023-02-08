import * as Cesium from 'cesium';
import React, { useEffect } from 'react';

const MetaShape = () => {
  console.log((Cesium as any).VERSION);
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer');
    const scene = viewer.scene;

    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: 'src/assets/sample/tileset.json',
        maximumScreenSpaceError: 1,
      })
    );

    tileset.readyPromise.then(() => {
      console.log({ tileset });
      viewer.zoomTo(tileset);
      const extras = tileset.asset.extras;
      if (
        Cesium.defined(extras) &&
        Cesium.defined(extras.ion) &&
        Cesium.defined(extras.ion.defaultStyle)
      ) {
        tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
      }
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer"></div>;
};

export default MetaShape;
