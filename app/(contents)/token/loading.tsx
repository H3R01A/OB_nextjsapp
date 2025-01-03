'use client';

import { ThreeCircles } from 'react-loader-spinner';

export default function TokenPageLoading() {
  return (
    <>
      <div className="mt-20 flex flex-col items-center text-white">
        <h1>Loading Token Page...</h1>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#ffffff"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
