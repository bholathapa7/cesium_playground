import * as Cesium from 'cesium';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    return () => {
      viewer.destroy();
    };
  }, []);

  return <div id="cesiumContainer"></div>;
}

export default App;
