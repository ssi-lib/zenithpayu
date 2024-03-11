import React,{useContext} from 'react'
import { LinksContext } from '../DashboardMain';


function AsideLeft() {
  const links = useContext(LinksContext)
  const quickAccessContent = [
    { textContent: 'Deposit', icon: '', link: '' },
    { textContent: 'Withdraw', icon: '', link: '' },
    { textContent: 'Exchange', icon: '', link: '' },
    { textContent: 'Cards', icon: '', link: '' },
  ];

  const primaryNavContent = [
    { textContent: 'Dashboard', icon: '', link: links.home },
    { textContent: 'Swap', icon: '', link: links.swap },
    { textContent: 'Loans', icon: '', link: links.loans },
    { textContent: 'My Cards', icon: '', link: links.card },
    { textContent: 'Settings', icon: '', link: '#' },
    { textContent: 'Logout', icon: '', link: '#' },
  ]

  return (
    <aside className='sticky top-20 hidden sm:block'>
      <div className="user flex gap-4 p-4">
        <a href="#"><img src="#" alt="prof" /></a>
        <div className='flex flex-col gap-2'>
          <p>Moses Monday</p>
          <span className="text-secondary">
            Dormant
          </span>
        </div>
      </div>
      <nav>
        <div className="quick_access flex flex-col ">
          <div className='flex flex-row justify-between p-4 bg-pri'>
            {
              quickAccessContent.map((n, i) => (
                <a key={i} href='#' className='text-center w-fit text-[12px]'>
                  <i className='block p-4 rounded-full bg-gray-900 opacity-20 mb-[16px] w-fit'>i</i>
                  {n.textContent}
                </a>
              ))
            }

          </div>
          <div className="primary_nav flex flex-col">
            <ul>
              {
                primaryNavContent.map((n, i) => (
                  <li key={i} className='border-b text-pri uppercase'>
                    <a href={n.link} className='inline-block py-3'>
                      <i className='inline-block mr-4'>icon</i>
                      {n.textContent}
                    </a>
                  </li>
                ))
              }
            </ul>
           
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default AsideLeft