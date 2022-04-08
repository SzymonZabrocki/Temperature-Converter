import Wrapper from "../Wrapper/Wrapper"
import Button from "./Button/Button"

const ButtonsGroup = (props) => {

  return (
    <Wrapper> {/* custom wrapper component */}
      <div className="btn-group">
        <Button type="button" value="celsius" name="Celsius" onSelect={props.onSelect} onBtnClicked={props.selectedHandler}></Button> {/* custom button component */}
        <Button type="button" value="kelvin" name="Kelvin" onSelect={props.onSelect} onBtnClicked={props.selectedHandler}></Button>
        <Button type="button" value="fahrenheit" name="Fahrenheit" onSelect={props.onSelect} onBtnClicked={props.selectedHandler}></Button>
      </div>
    </Wrapper>
  )
}

export default ButtonsGroup