const Button = (props) => {

  let isActive = ''
  
  if(props.value === props.onSelect){ //check if button is active
    isActive = 'active'
  }
  
  let classes = `btn btn-outline-secondary my-2 ${isActive}` //add active class

  if(props.styling){ //adding additional classes if passed via props
    classes=props.styling
  }

  return (
    <button className={classes} type={props.type} value={props.value} onClick={props.onBtnClicked}>{props.name}</button> //return button with props
  )
}

export default Button