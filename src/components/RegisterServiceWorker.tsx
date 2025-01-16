"use client";
import { useEffect } from 'react';

export default function RegisterServiceWorker() {
  useEffect(() => {
    navigator.serviceWorker.register('/sw.js');
  }, []);

  return null;
}