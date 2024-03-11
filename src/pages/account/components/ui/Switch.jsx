import {useState} from 'react'

function Switch () {
    const [toggled, setToggle] = useState(false);

    const style_toggle_true = "p-[10px] w-[50%] rounded-full  bg-white"
    const container_style_toggle_true = "switch_con w-12 bg-gray-300 p-[2px] rounded-full"

    function handleSwitchClick(e){
        setToggle(t=>!t)
    }

  return (
    <div className={
                toggled
                ?container_style_toggle_true + " bg-pri" :container_style_toggle_true}>
        <div className={
            toggled
            ?style_toggle_true + " ml-auto"
            :style_toggle_true}
            onClick={handleSwitchClick}
            ></div>
    </div>
  )
}

export default Switch