function AsideRight() {
    const secondaryNavContent = [
        { textContent: 'Dashboard', icon: '', link: '' },
        { textContent: 'Swap', icon: '', link: '' },
        { textContent: 'Loans', icon: '', link: '' },
        { textContent: 'My Cards', icon: '', link: '' },
        { textContent: 'Settings', icon: '', link: '' },
        { textContent: 'Logout', icon: '', link: '' },
    ]
    return (
        <div className='sticky top-20 bg-gray-300'>
            <div className="nav_secondary px-2 flex flex-col gap-2">
                <ul>
                    {secondaryNavContent.map((n, i) => (
                        <li className='text-pri border-b' key={i}>
                            <a href="#" className='py-3 inline-block'><span className='mr-4'>-</span>{n.textContent}</a>
                        </li>
                    ))}
                </ul>
                <div className="security_tips flex flex-col gap-3">
                    <h2>Security Tips</h2>
                    <p className='text-gray-500 text-sm'>
                        Do not perform financial transactions on public Wifi as they may be unsecure.
                        <br /> <br />
                        Always make sure no one is watching when inserting your account sensitive details
                        <br /> <br />
                        SwiftPayu will never ask for your online banking userid and password via email or sms
                        <br /> <br />
                        Always check your web address. Make sure it is <a href="">"https://www.swiftpayu.com/"</a> 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AsideRight