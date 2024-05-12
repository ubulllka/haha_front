import {useState} from "react";
import {ButtonEdit} from "./ButtonEdit";

export const DescribeBlock = ({description, prof}) => {
    const getDescription = () => {
        return (description === "") ? "Добавьте описание своему профилю" : description
    }
    const [isSwap, setIsSwap] = useState(true)
    const SwapField = ({flag}) => {
        return (flag)
            ? <textarea className="form-control" value={getDescription()} disabled={true} style={{resize: "none"}}/>
            : <textarea name="description" className="form-control" defaultValue={description}/>
    }
    return (
        <>
            {
                (prof) ?
                    <>
                        <div className="d-flex align-items-start">
                            {(prof)
                                ? <SwapField flag={isSwap}/>
                                : getDescription()
                            }
                            {
                                (prof) &&
                                <ButtonEdit isSwap={isSwap} setIsSwap={setIsSwap} />
                            }
                        </div>
                    </>
                    :
                    <p className="mb-2">{description}</p>
            }
        </>
    )
}
