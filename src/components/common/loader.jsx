import RingLoader  from "react-spinners/RingLoader";
import PacmanLoader  from "react-spinners/PacmanLoader";

export function AuthLoader() {
  return (
    <div
    className="flex justify-center items-center h-[100vh] bg-gray-500 "
    >
 
<RingLoader color="#20d1b0" size= "125px" speedMultiplier=".8" 
/>
    </div>
  );
}
export function RecipeLoader() {
  return (
    <div
    className="flex justify-center items-center h-[100vh] bg-gray-500 "
    >
 
<PacmanLoader  color="#20f120" size= "125px" speedMultiplier=".8" 
/>
    </div>
  );
}

// export default Loader;
