import Banner from "./components/Banner";
import General from "./components/General";


const VieWProfilSubAdmin = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
          <Banner />
      </div>
      

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-1">
        <General/>
        {/* tset */}
        
      </div>
    </div>
  );
};
export default VieWProfilSubAdmin;
