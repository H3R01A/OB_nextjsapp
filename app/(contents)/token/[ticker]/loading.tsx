'use client';

import { ThreeCircles } from 'react-loader-spinner';

export default function TokenInformationLoading() {
  return (
    <>
      <h1>Loading token information...</h1>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#ffffff"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}
