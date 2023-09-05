import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="155" r="116" />
    <rect x="3" y="290" rx="10" ry="10" width="267" height="22" />
    <rect x="8" y="324" rx="8" ry="8" width="258" height="62" />
    <rect x="10" y="402" rx="5" ry="5" width="83" height="26" />
    <rect x="143" y="398" rx="20" ry="20" width="122" height="41" />
  </ContentLoader>
);

export default Skeleton;
