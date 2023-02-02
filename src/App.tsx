import * as Cesium from 'cesium';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer');
    const scene = viewer.scene;

    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
      '2023-02-02T00:00:00Z'
    );

    const tileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: 'src/assets/tileset.json', // for buildings
        // url: 'src/assets/tileset_demo.json',  // for powerplant
      })
    );
    tileset.readyPromise.then(function (tileset: any) {
      console.log({ tileset });
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

    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer"></div>;
}

export default App;
