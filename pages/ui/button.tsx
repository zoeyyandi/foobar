import * as React from 'react';
import Image from 'next/image';

type Props = {
  svg: string,
  text: string,
  onClickHandler: () => void,
}

const Button: React.FC<Props> = ({ text, svg, onClickHandler }) => {

  return (
    <button className="px-8 py-3 min-w-8 flex-col flex items-center text-xs" onClick={onClickHandler}>
        <Image
            src={svg}
            alt={`arrow-${text}`}
            width={30}
            height={30}
        />
        {text}
    </button>
  )
}

export default Button

