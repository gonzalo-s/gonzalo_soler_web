import Image from 'next/image';

type BrickImageProps = { color: 'blue' | 'yellow'; className?: string; priority?: boolean };

export default function BrickImage({ color, className, priority }: BrickImageProps) {
  return (
    <Image
      className={className}
      src={`/images/lego-brick-${color}.png`}
      alt=""
      width={1254}
      height={1254}
      priority={priority}
      sizes="(max-width: 900px) 70vw, 42vw"
    />
  );
}
