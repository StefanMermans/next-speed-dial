'use client';

import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('./Clock'), {ssr: false});

export default function DynamicNoSRRClock() {
  return <Clock />;
}
