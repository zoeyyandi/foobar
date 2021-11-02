import * as React from 'react';
import Image from 'next/image';

type Props = {
  avatar: string,
  name: string,
}

const Avatar: React.FC<Props> = ({ avatar, name }) => {
  return (
    <div className="flex flex-column items-center">
        <Image
            src={avatar}
            alt={""}
            className="relative overflow-hidden rounded-full flex-shrink-0"
            width={30}
            height={30}
        />
        <p className="mr-4 ml-2 text-xs">
            {name}
        </p>
    </div>
  )
}

export default Avatar

