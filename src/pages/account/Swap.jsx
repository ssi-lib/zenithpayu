import Button from "./components/ui/Button"

function Swap() {
  return (
    <div className='flex flex-col gap-6'>
      <h2>Exchange your local currency for foreign currency</h2>
      <div className="convert_currency flex flex-col gap-6">
        <div className="convert_from">
          <div className="flex justify-between items-center">
            <span>From</span>
            <span>Balance: EUR 0.00</span>
          </div>
          <div className="flex justify-between items-center">

            <input type="text" value={'9522.00'} className='border-none outline-none focus:border-b-2' />
            <select name="" id="">
              <option value="EUR" className='outline-none border-none'>EUR</option>
            </select>
          </div>
        </div>
        <div className="convert_to">
          <h3>to</h3>
          <div className="flex justify-between items-center">
            <input type="text" value={0} />
            <select name="" id="">
              <option value="USD" className='outline-none border-none'>USD</option>
            </select>
          </div>
        </div>
        <h4 className="commision_rate">
          Comision rate: <span>30%</span>
        </h4>
      </div>
      <Button textContent={'Continue'} styles={'bg-blue-600 text-white'} />
    </div>
  )
}

export default Swap