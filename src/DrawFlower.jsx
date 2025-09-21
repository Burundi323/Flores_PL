import React from 'react';
import { motion } from 'framer-motion';
import './DrawFlower.css';

// Generar pétalos distribuidos en círculo
const generatePetals = (petalCount, size, width) => {
  const petals = [];
  const angleStep = 360 / petalCount;

  for (let i = 0; i < petalCount; i++) {
    const angle = i * angleStep;

    petals.push(
      <g key={i} transform={`rotate(${angle})`}>
        <motion.path
          d={`
            M0 0
            C${width} -${size / 2}, ${width} -${size}, 0 -${size}
            C-${width} -${size}, -${width} -${size / 2}, 0 0
            Z
          `}
          fill="yellow"
          stroke="orange"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 3, -3, 0],
            opacity: 1
          }}
          transition={{
            delay: i * 0.1,
            duration: 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '0 0' }}
        />
      </g>
    );
  }

  return petals;
};

// Flor individual
const Flower = ({ x, y, delayOffset }) => {
  const petals = generatePetals(16, 60, 20);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Tallo desde el centro */}
      <motion.path
        d="M0 0 L0 200"
        stroke="green"
        strokeWidth="6"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: delayOffset }}
      />

      {/* Pétalos */}
      {petals}

      {/* Centro */}
      <motion.circle
        cx="0"
        cy="0"
        r="25"
        stroke="brown"
        strokeWidth="2"
        fill="brown"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: delayOffset + 1,
          duration: 0.6,
        }}
      />
    </g>
  );
};

// Genera posiciones aleatorias para las flores
const generateRandomFlowers = (count, width, height) => {
  const flowers = [];
  for (let i = 0; i < count; i++) {
    flowers.push({
      x: Math.random() * (width - 100) + 50, // margen de 50px
      y: Math.random() * (height - 150) + 50, // margen de 50px
      delayOffset: i * 0.5 + Math.random(), // retraso aleatorio
    });
  }
  return flowers;
};

// Componente principal
const DrawFlower = () => {
  const flowerCount = 20; // número de flores
  const canvasWidth = 1000;
  const canvasHeight = 400;

  const flowerPositions = generateRandomFlowers(flowerCount, canvasWidth, canvasHeight);

  return (
    <div className="flower-container">
      <svg width={canvasWidth} height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
        {flowerPositions.map((pos, index) => (
          <Flower
            key={index}
            x={pos.x}
            y={pos.y}
            delayOffset={pos.delayOffset}
          />
        ))}
      </svg>
    </div>
  );
};

export default DrawFlower;
