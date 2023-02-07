import * as Cesium from 'cesium';
import React, { useEffect } from 'react';
import {
  processTileFeatures,
  loadFeature,
  unselectFeature,
  getSelectedFeature,
  selectFeature,
} from '../utils/cesium-utils';

const BIMModel = () => {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer');
    const scene = viewer.scene;

    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
      '2023-02-03T00:00:00Z'
    );

    const tileset = scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: 'src/assets/tileset.json', // for buildings
        url: 'src/assets/tileset_demo.json', // for powerplant
      })
    );
    tileset.readyPromise.then(function (tileset: any) {
      if (tileset) {
        viewer
          .zoomTo(
            tileset,
            new Cesium.HeadingPitchRange(
              0.5,
              -0.2,
              tileset.boundingSphere.radius * 4.0
            )
          )
          .catch(function (error: any) {
            console.log(error);
          });
      }
    });
    tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

    tileset.tileLoad.addEventListener(function (tile: any) {
      // to store every element/component of tiles to a variable
      processTileFeatures(tile, loadFeature);
    });

    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement: any) {
      const feature = scene.pick(movement.endPosition);

      unselectFeature(getSelectedFeature());

      if (feature instanceof Cesium.Cesium3DTileFeature) {
        selectFeature(feature);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer"></div>;
};

export default BIMModel;
