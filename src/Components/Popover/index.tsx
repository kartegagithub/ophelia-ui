import React, { useState, useEffect, useRef } from 'react';

const Popover: React.FC<PopoverProps> = ({ content, trigger, position = 'top-center' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'bottom-full right-full';
      case 'top-center':
        return 'bottom-full right-1/2 left-1/2';
      case 'top-right':
        return 'bottom-full left-full';
      case 'bottom-left':
        return '-translate-x-full mb-2';
      case 'bottom-center':
        return 'left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom-right':
        return 'translate-x-full right-0 mb-2';
      case 'right':
        return 'bottom-1/2 translate-x-full right-0 ml-2';
      case 'left':
        return 'bottom-1/2 -translate-x-full left-0 mr-2';
      default:
        return 'bottom-full right-1/2 left-1/2';
    }
  };

  return (
    <div className="relative">
      <div className="inline-block" ref={popoverRef}>
        <div className="trigger" onClick={() => setIsVisible(!isVisible)}>
          {trigger}
        </div>
        {isVisible && (
          <div
            className={`absolute z-10 bg-white border border-azGray shadow-lg ${getPositionClasses()}`}
          >
            <div className="py-1">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover;

var popoverProps : {
  content: React.ReactNode;
  trigger: React.ReactNode;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'right' | 'left';
}
export type PopoverProps = typeof popoverProps
