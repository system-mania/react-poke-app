function Type({ type, damageValue }) {
  const bg = `bg-${type}`;
  return (
    <div
      className={`h-[1.5rem] py-1 px-3 rounded-2xl ${bg} font-bold text-zinc-800 text-[0.8rem] leading-[0.8rem] capitalize m-1 flex gap-1 justify-center items-center`}>
      <span>{type}</span>
      {damageValue && (
        <span className={`bg-zinc-200/40 p-[0.125rem] rounded-lg `}>
          {damageValue}
        </span>
      )}
    </div>
  );
}

export default Type;
