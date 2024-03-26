import { CgSpinnerTwoAlt } from 'react-icons/cg';

function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CgSpinnerTwoAlt className="animate-spin text-[40px] md:text-[70px] text-pri" />
    </div>
  );
}

export default Loader;
