import React, { useRef } from 'react';
import useIntersection from '../hooks/useIntersection';

interface FadeInSectionProps {
    children: React.ReactNode;
    threshold?: number;
    className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, threshold = 0.1, className = '' }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersection(sectionRef, { threshold });

    return (
        <div
            ref={sectionRef}
            className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
