import React from "react";

type Props = {
  value: string;
  numberOfRows: number;
  onChange: (value: string) => void;
};

export default function Select({ value, numberOfRows, onChange }: Props) {
  const count = [];
  for (let i = 1; i <= numberOfRows; i++) count.push(i);
  return (
    <select
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(e.target.value)
      }
    >
      {count.map((i) => (
        <option key={i} value={String(i)}>
          {i}
        </option>
      ))}
    </select>
  );
}
