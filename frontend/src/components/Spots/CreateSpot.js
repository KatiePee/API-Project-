import SpotForm from "./SpotForm";

const CreateSpot = () => {
  const spot = {
    country: '',
    address: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    description: '',
    name: '',
    price: '',
  };

  return (
    <SpotForm
      report={spot}
      formType="Create Spot"
    />
    // <h1>creat spot</h1>
  );
};

export default CreateSpot