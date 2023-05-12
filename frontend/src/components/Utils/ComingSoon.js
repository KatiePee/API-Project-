
import { useModal } from "../../context/Modal";


const ComingSoon = () => {
  const { closeModal } = useModal();

  return (
    <div>
      <h3>This Feature is Comming Soon...</h3>
      <button onClick={closeModal}>Take me back</button>
    </div>
  );
}

export default ComingSoon