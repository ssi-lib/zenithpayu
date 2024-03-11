import Button from "./components/ui/Button"
import Switch from "./components/ui/Switch"

function Settings() {
  const userInfo = [
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
    { label: 'Name', value: 'Moses' },
  ]
  return (
    <div className='flex flex-col gap-8 py-6 px-4'>
      <div className="profile_img flex flex-col gap-4 justify-center items-center">
        <div className="img_con">
          <img src="#" alt="prof" />
        </div>
        <div className="change_prof_img">
          <i className='mr-2'>i</i>
          Change account photo
        </div>
      </div>
      <div className="user_details flex flex-col gap-4">
        <h2>SwiftPayu Profile</h2>
        <div className="details">

          {userInfo.map((n, i) => (

            <div key={i} className="flex justify-between py-[4px] border-b pt-3">
              <span className='text-pri'>{n.label}</span>
              <span>{n.value}</span>
            </div>

          ))}

          <Button textContent={'Edit Information'} styles={'bg-blue-600 text-white mt-3'} />
        </div>
      </div>
      <div className="acc_limit flex flex-col gap-3">
        <h2>Account Limit</h2>
        <div className="flex justify-between items-center">
          <span className='flex-1'>Tier 1</span>
          <Button textContent={'Upgrade Limit'} styles={'bg-blue-600 flex-1 text-white'} />
        </div>
      </div>
      <div className="edit_security flex flex-col gap-4">
        <h2>Security</h2>
        <div className='flex flex-col gap-2'>
          <h3>Update Password</h3>
          <div className="flex justify-between items-center">
            <span className='whitespace-nowrap'>2 Step Verification</span>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
