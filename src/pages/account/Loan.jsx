import Button from "./components/ui/Button"

function Loan() {
  return (
    <div >
      <p>We offer competitive rates and flexible repayment options to help you achieve your financial goals. Apply now and take control of your finances.</p>

      <div className="get_loan">
        <div className='w-[60%] mx-auto  min-w-[150px]'>

        <h3>How much do you want?</h3>
        <input type="number" name="" id="" className='block border w-full'/>
        <input type="range" name="" id="" value={20}/>
        <Button textContent={'Calculate'} styles={'border-2 text-neutral'} />
        </div>
      </div>

      <div className="loan_history">
        <h3>Loan history</h3>
        <p>You have not requested a loan. Once you request a loan, your loan request will appear here.</p>
      </div>
    </div>
  )
}

export default Loan