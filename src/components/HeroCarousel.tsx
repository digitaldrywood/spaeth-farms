'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  {
    src: '/spaeth-farms/images/hero-cattle.jpg',
    alt: 'Cattle grazing on rolling Wisconsin hills',
  },
  {
    src: '/spaeth-farms/images/spaeth-cattle.jpg',
    alt: 'Spaeth Farms beef cattle in pasture',
  },
  {
    src: '/spaeth-farms/images/hereford-herd.jpg',
    alt: 'Hereford cattle herd grazing',
  },
  {
    src: '/spaeth-farms/images/hereford-herd-2.jpg',
    alt: 'Hereford cattle on the farm',
  },
  {
    src: '/spaeth-farms/images/spaeth-family-cattle.jpg',
    alt: 'Spaeth family with their cattle',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </>
  );
}
