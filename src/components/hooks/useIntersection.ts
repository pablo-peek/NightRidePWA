import { useState, useEffect, RefObject } from 'react';

const useIntersection = (ref: RefObject<Element>, options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Desconectar después de que sea visible
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, options]);

    return isVisible;
};

export default useIntersection;
