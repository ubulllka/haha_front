import Button from "react-bootstrap/Button";

export const ButtonEdit = ({isSwap, setIsSwap}) => {
    return (
        <Button variant={"secondary"} size={"sm"} data-toggle="tooltip" className="ms-1"
                onClick={() => {
                    setIsSwap(!isSwap)
                }}
        >
            {(isSwap)
                ? <i className="fa fa-edit"></i>
                : <i className="fa fa-check"></i>
            }
        </Button>
    )

}