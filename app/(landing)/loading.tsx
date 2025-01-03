'use client';

import { ThreeCircles } from 'react-loader-spinner';

export default function WelcomePageLoading() {
  return (
    <>
      <h1 className='text-white flex items-center'>Teleporting you to home base...</h1>
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
