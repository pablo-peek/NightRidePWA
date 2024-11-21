import { useNavigate } from "react-router-dom";


function Screen404(): JSX.Element {
    const navigate = useNavigate();
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

export default Screen404;