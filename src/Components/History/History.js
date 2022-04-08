const History = (props) => {

  if (props.isVisible) { //conditionaly returned card with previous convertions
    return (
    <div className='card'>
      <div className='card-header'><label>History</label></div>
      <div className='card-body'>
        <ol className="list-group ">
          {props.history.map((calulated, i) => (
            <li key={i} className="list-group-item">{calulated}</li> //mapping array and returning elements as list items
          ))}
        </ol>
      </div>
    </div>
    )
  }else{
    return
  }
}

export default History