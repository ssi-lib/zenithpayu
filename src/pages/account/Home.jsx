function Home() {
  return (
    <div className='home_render '>
          <div className='py-6 px-4 bg-gray-300 rounded-md flex flex-col gap-6'>
            <div className="acc flex justify-between border-b-2 pb-6 ">
              <div className="acc_balance flex-1">
                <p>EUR Balance</p>
                <p>E <span>0.00</span></p>
              </div>
              <div className="acc_status flex-1">
                <p>Account Status</p>
                <p>Dormant</p>
              </div>
            </div>
            <div className="quick_access_grid grid grid-cols-4 justify-between text-center">
              <a href="#" className='mb-6'><i className='block'>i</i>Transfer</a>
              <a href=""><i className='block'>i</i>Deposit</a>
              <a href=""><i className='block'>i</i>Cards</a>
              <a href=""><i className='block'>i</i>Exchange</a>
              <a href=""><i className='block'>i</i>Quick Loans</a>
              <a href=""><i className='block'>i</i>Messages</a>
              <a href=""><i className='block'>i</i>Statement</a>
              <a href=""><i className='block'>i</i>Transactions</a>
            </div>
          </div>
        </div>
  )
}

export default Home