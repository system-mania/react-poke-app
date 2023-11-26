import DamageRelations from './DamageRelations';
import { useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';

const DamageModal = ({ setIsModalOpen, damages }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsModalOpen(false));

  return (
    <div className="flex text-center items-center justify-center z-40 fixed left-0 bottom-0 w-full h-full bg-slate-800">
      <div ref={ref} className="modal bg-white rounded-lg w-1/2 ">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full justify-between">
            <div className="text-gray-900 font-medium text-lg">데미지 관계</div>
            <span
              onClick={() => setIsModalOpen(false)}
              className="text-gray-900 font-medium text-lg cursor-pointer">
              X
            </span>
          </div>
          <DamageRelations damages={damages} />
        </div>
      </div>
    </div>
  );
};

export default DamageModal;
