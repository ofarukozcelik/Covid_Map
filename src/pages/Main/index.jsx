import { useState } from "react";
import { Link } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Graticule, Sphere, ZoomableGroup } from "react-simple-maps"

const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json"

const Main = () => {
  const [geo, setGeo] = useState();
  return (
    <div className="bg-zinc-800 h-[calc(100vh-74px)] text-white overflow-hidden flex flex-col justify-center items-center md:pt-20 wrapper">
      <h1 className="px-6 pb-6">
        Detay Görüntüle{" "}
        {geo?.properties?.name ? geo.properties.name : "(Ülke Seçiniz)"}
      </h1>
      <ComposableMap height={1000} projectionConfig={{ rotate: [-40, 0, 0], scale: 300 }}>
        <ZoomableGroup>
          <Graticule stroke="gray" strokeWidth={0.3} />
          <Sphere stroke="gray" strokeWidth={0.6} />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Link to={`/detail?code=${geo.id}`}>
                  <Geography onMouseEnter={() => setGeo(geo)} onMouseLeave={() => setGeo(null)} key={geo.rsmKey} geography={geo} style={{ default: { fill: "#EEE", }, hover: { fill: "rgb(54 197 94)" } }} />
                </Link>
              ))
            }
          </Geographies>

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Main;
