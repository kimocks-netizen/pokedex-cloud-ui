"use client";
 
import { useEffect, useRef } from 'react';
import { useTheme } from "@/layout/ThemeContext";
 
interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

interface MaskProps {
    particleCount?: number;
    useDarkColors?: boolean;
}

export default function Mask({ particleCount = 150, useDarkColors = false }: MaskProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, active: true });
    const { isDarkMode } = useTheme();
    const isMobile = useRef(false);
    const isDarkModeRef = useRef(isDarkMode);
 
    useEffect(() => {
        isDarkModeRef.current = isDarkMode;
    }, [isDarkMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
 
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            isMobile.current = window.innerWidth < 1024;
            initParticles();
        };
 
        const initParticles = () => {
            particlesRef.current = [];
            const count = isMobile.current ? 60 : particleCount;
            for (let i = 0; i < count; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };
 
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const element = document.elementFromPoint(e.clientX, e.clientY);
            const isOverInteractive = element !== canvas && element?.closest('nav, button, a, [role="button"], .card, input, select, textarea');
            mouseRef.current = { 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top,
                active: !isOverInteractive
            };
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
 
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
 
            // Draw connections
            ctx.strokeStyle = isDarkModeRef.current ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
 
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
 
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                    }
                }
            }
 
            // Draw connections to cursor
            if (mouseRef.current.active) {
                particlesRef.current.forEach(particle => {
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.stroke();
                    }
                });
            }

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                ctx.fillStyle = isDarkModeRef.current ? `rgba(255, 255, 255, ${particle.opacity})` : `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw cursor dot
            if (mouseRef.current.active) {
                ctx.fillStyle = isDarkModeRef.current ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
 
            animationRef.current = requestAnimationFrame(animate);
        };
 
        animate();
 
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDarkMode, particleCount]);
 
    return (
        <div className='absolute top-0 left-0 w-full h-full'>
            <canvas
                ref={canvasRef}
                className="w-full h-full absolute top-0 left-0"
                style={{ background: 'transparent' }}
            />
        </div>
    );
}
 
 