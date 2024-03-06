function AltButton({ btn_text }) {
  return (
    <div className="py-5">
      <button
        type="submit"
        className="w-full bg-pri rounded-lg text-white py-4 hover:bg-[#4E1CFF] transition-all ease-in-out duration-300"
      >
        {btn_text}
      </button>
    </div>
  );
}

export default AltButton;
