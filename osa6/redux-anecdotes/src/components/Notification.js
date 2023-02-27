import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, show } = useSelector((state) => state.notification)
  const style = {
    border: "solid",
    width: 800,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    display: show ? "block" : "none",
  }
  return (
    <div style={style}>{message}</div>
  )
};

export default Notification