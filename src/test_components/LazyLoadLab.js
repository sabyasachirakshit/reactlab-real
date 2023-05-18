import React from "react";
import LazyLoad from "react-lazyload";

export default function LazyLoadLab() {
  return (
    <div className="list">
      <LazyLoad height={250} once>
        <img src="https://placedog.net/500/280" alt="dog" />
      </LazyLoad>
      <LazyLoad height={250} once>
        <img src="https://placedog.net/500/300" alt="dog" />
      </LazyLoad>
      <LazyLoad height={250} offset={150}>
        <img src="https://placedog.net/500/300" alt="happy dog" />
      </LazyLoad>
    </div>
  );
}
