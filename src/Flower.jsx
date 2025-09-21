import React, { useEffect, useRef } from "react";

const Flower = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Evita errores si no existe el canvas

    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Fondo azul
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawFlower = (x, y) => {
      // Tallo
      ctx.strokeStyle = "green";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 50);
      ctx.stroke();

      ctx.fillStyle = "yellow";
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const petalX = x + Math.cos(angle) * 20;
        const petalY = y + Math.sin(angle) * 20;
        ctx.beginPath();
        ctx.arc(petalX, petalY, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "brown";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    // Dibujar varias flores en distintas posiciones
    drawFlower(100, 100);
    drawFlower(200, 200);
    drawFlower(300, 150);
    drawFlower(400, 300);
    drawFlower(150, 350);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Flower;
