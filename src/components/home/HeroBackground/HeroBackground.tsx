export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
      <div 
        className="absolute top-[20%] left-1/4 -translate-x-1/2 w-[50%] aspect-square rounded-full opacity-10 dark:opacity-50 blur-[120px]"
        style={{background: 'var(--primary)'}}
      ></div>
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(90deg, 
            transparent 49.5%,
            var(--primary) 49.5%,
            var(--primary) 50.5%,
            transparent 50.5%
          )`,
          backgroundSize: '100px 100px',
          maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(0deg, 
            transparent 49.5%,
            var(--secondary) 49.5%,
            var(--secondary) 50.5%,
            transparent 50.5%
          )`,
          backgroundSize: '100px 100px',
          maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)'
        }}
      ></div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/95 to-transparent"></div>
    </div>
  )
} 