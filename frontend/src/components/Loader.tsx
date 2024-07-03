import { ThreeCircles } from "react-loader-spinner";
function Loader() {
  return (
    <ThreeCircles
      visible={true}
      height="200"
      width="200"
      color="blue"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
