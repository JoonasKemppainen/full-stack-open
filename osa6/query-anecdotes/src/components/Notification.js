import { useCounterValue } from "../CounterContext"

const Notification = () => {
  const notification = useCounterValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return notification ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
}

export default Notification
