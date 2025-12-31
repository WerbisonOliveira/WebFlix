import { IoIosArrowUp } from "react-icons/io";

import style from './Button.module.css';

type Scroll = {
    showButton: Boolean
}

const Button = ({showButton}:Scroll) => {

    const Button = () => {
        window.scroll(0, 0);
    }


    return (
        <div className={showButton ? style.button : style.hiddenButton} onClick={() => Button()}>
            <IoIosArrowUp />
        </div>
    )
}

export default Button;