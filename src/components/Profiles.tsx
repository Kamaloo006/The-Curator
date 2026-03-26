import { useParams } from "react-router-dom";

function Profiles() {
  const routerParams = useParams<{ counterId: string }>();
  console.log(routerParams);
  return (
    <div>
      <h1>Profile Page {routerParams.counterId}</h1>
    </div>
  );
}

export default Profiles;
