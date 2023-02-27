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
    var terrainProvider = Cesium.createWorldTerrain();

    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
      '2023-02-03T00:00:00Z'
    );

    // const entity = viewer.entities.add({
    //   name: 'MyModel',
    //   position: Cesium.Cartesian3.fromDegrees(126.97796630833334, 37.56653594944444, 0),
    //   model: {
    //     uri: 'src/assets/singleBuilding/Building.glb',
    //   },
    // });

    // viewer.zoomTo(entity);

    const tileset = scene.primitives.add(
      new Cesium.Cesium3DTileset({
        // url: 'src/assets/tileset.json', // for buildings
        url: 'src/assets/output2/tileset.json', // for buildings
        // url: 'src/assets/tileset_demo.json', // for powerplant
      })
    );

    tileset.readyPromise.then(function (tileset: any) {
      if (tileset) {
        viewer.zoomTo(tileset).catch(function (error: any) {
          console.log(error);
        });
      }
    });

    // tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

    // tileset.readyPromise.then(function (tileset: any) {
    //   if (tileset) {
    //     console.log(tilesetJson);
    //     var longitude = tilesetJson.position.longitude;
    //     var latitude = tilesetJson.position.latitude;
    //     var cartographic = Cesium.Cartographic.fromDegrees(longitude, latitude);
    //     var positions = [cartographic];

    //     const carte = Cesium.Cartesian3.fromRadians(longitude, latitude, 0)
    //     console.log(carte)
    //     // var transform = Cesium.Transforms.headingPitchRollToFixedFrame(Cesium.Cartesian3.fromRadians(longitude, latitude, 0), new Cesium.HeadingPitchRoll());
    //     // var array = Cesium.Matrix4.toArray(transform);
    //     // console.log(array);

    //     Cesium.sampleTerrainMostDetailed(terrainProvider, positions).then(
    //       function () {
    //         // cartographic.height is updated
    //         var cartesian = Cesium.Cartographic.toCartesian(cartographic);
    //         var transform = Cesium.Transforms.headingPitchRollToFixedFrame(
    //           cartesian,
    //           new Cesium.HeadingPitchRoll()
    //         );
    //         // console.log(transform)
    //         // console.log(tileset)
    //         tileset._root.transform = transform;
    //         viewer.zoomTo(tileset);
    //       }
    //     );
    //   }
    // });
    // tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

    // tileset.tileLoad.addEventListener(function (tile: any) {
    //   // to store every element/component of tiles to a variable
    //   processTileFeatures(tile, loadFeature);
    // });

    // const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    // handler.setInputAction(function (movement: any) {
    //   const feature = scene.pick(movement.endPosition);

    //   unselectFeature(getSelectedFeature());

    //   if (feature instanceof Cesium.Cesium3DTileFeature) {
    //     selectFeature(feature);
    //   }
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer"></div>;
};

export default BIMModel;
