import React, { useEffect } from 'react';

const BaseStat = ({ valueStat, nameStat, type }) => {
  const bg = `bg-${type}`;

  const ref = React.useRef(null);

  useEffect(() => {
    const setValueSta = ref.current;
    const calc = valueStat * (100 / 255);
    setValueSta.style.width = calc + '%';
  }, []);

  return (
    <tr className="w-full text-white">
      <td className="sm:px-5">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={`flex items-start h-2 overflow-hidden w-full min-w-[10rem] rounded bg-slate-100`}>
          <div ref={ref} className={`h-3 ${bg}`}></div>
        </div>
      </td>
      <td className="px-2 sm:px-5">255</td>
    </tr>
  );
};

export default BaseStat;
