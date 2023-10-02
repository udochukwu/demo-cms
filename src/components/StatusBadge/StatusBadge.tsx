import React from 'react';

export enum StatusEnum {
  active = 'active',
  inactive = 'inactive',
  archived = 'archived',
  default = 'default',
}

const statusObject: {
  [key in StatusEnum]: { bg: string; color: string };
} = {
  inactive: {
    bg: '#F6BBBB',
    color: '#E10C0C',
  },
  active: {
    bg: '#E4F7EC',
    color: '#3A843F',
  },
  archived: {
    bg: '#F2F3F6',
    color: '#7D83A3',
  },
  default: {
    bg: '#EAECF6',
    color: '#434656',
  },
};

export default function StatusBadge({
  status,
}: {
  status: keyof typeof StatusEnum;
}) {
  const statusData = statusObject[status] || statusObject[StatusEnum.default];
  const { bg, color } = statusData;
  return (
    <span
      style={{ backgroundColor: `${bg}`, color: `${color}` }}
      className={`flex items-center w-fit px-3 rounded-lg font-semibold py-2 text-xs capitalize`}
    >
      {status}
    </span>
  );
}
