'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  total: number;
  onSelect: (index: number) => void;
};

export default function SnapshotTimeline({ total, onSelect }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(total - 1);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [hasUserScrolled, setHasUserScrolled] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLive) return;
    setSelected(total - 1);
    onSelect(total - 1);
  }, [isLive, total]);

  useEffect(() => {
    if (isLive && !hasUserScrolled && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [selected, isLive, hasUserScrolled]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const isAtRight = scrollLeft + clientWidth >= scrollWidth - 5; // ~5px margin of error
    setHasUserScrolled(!isAtRight);
  };

  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-3">
      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onWheel={handleWheelScroll}
        className="relative overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-0.5 items-end min-h-[50px] px-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'relative group',
                'w-1 h-6 rounded-sm cursor-pointer transition-all shrink-0',
                selected === i ? 'bg-primary h-8' : 'bg-muted-foreground/40'
              )}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setSelected(i);
                onSelect(i);
                setIsLive(false);
              }}
            >
              {hoverIndex === i && (
                <div className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-2 py-0.5 text-xs rounded-md bg-background border shadow z-50 whitespace-nowrap">
                  Snap: {i}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            setIsLive(true);
            setHasUserScrolled(false);
          }}
          className={cn(
            'px-3 py-1 text-sm rounded-md border border-primary cursor-pointer',
            isLive && 'bg-primary text-white'
          )}
        >
          {isLive ? '🟢' : '🔴'} Live
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: <strong>{selected < 0 ? 'none': selected}</strong>
        </div>
      </div>
    </div>
  );
}
