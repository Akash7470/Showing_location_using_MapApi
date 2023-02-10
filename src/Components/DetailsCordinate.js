import { useState } from "react";

function DetailsCordinate() {
  const [cordinates, setCordinates] = useState({});

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setCordinates(e.target.name, e.target.value);
  };
  return (
    <>
      <div className="card" style={{ width: "38rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            lattitude:
            <input onChange={handleOnChange} name="lat" type="number" />
          </h5>
          <h5 className="card-text">
            longitude:
            <input onChange={handleOnChange} name="lng" type="number" />
          </h5>
          <h5 className="card-text">
            Zoom:
            <input onChange={handleOnChange} name="zoom" type="number" />
          </h5>
        </div>
      </div>
    </>
  );
}

export default DetailsCordinate;
