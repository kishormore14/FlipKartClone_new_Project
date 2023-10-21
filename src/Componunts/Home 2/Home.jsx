import React, { useState } from "react";
import Bokdatasevice from "../../services/Operations";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description:
      "Hic ullam facilis accusantium! Blanditiis sed nobis quaerat ad cum! Doloribus quo laboriosam beatae accusantium porro libero eos ipsum numquam laborum soluta.",
    base64Image: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedFormData = { ...formData };

    if (type === "file") {
      updatedFormData.selectedImage = files[0];
      if (files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          updatedFormData.base64Image = reader.result;
          setFormData(updatedFormData);
        };
      }
    } else {
      updatedFormData[name] = value;
      setFormData(updatedFormData);
    }
  };

 const handleSubmit = async () => {
   try {
     // Filter out fields with empty values and the selectedImage field
     const filteredFormData = Object.fromEntries(
       Object.entries(formData).filter(
         ([key, value]) => key !== "selectedImage" && value !== ""
       )
     );

     console.log("Form Data:", filteredFormData);

     // Assuming that Bokdatasevice.AddUser returns a successful result or resolves a Promise on success
     await Bokdatasevice.AddUser(filteredFormData);

     // Display a success alert
     alert("Data submitted successfully!");
     setFormData({
    name: "",
    price: "",
    description:
      "Hic ullam facilis accusantium! Blanditiis sed nobis quaerat ad cum! Doloribus quo laboriosam beatae accusantium porro libero eos ipsum numquam laborum soluta.",
    base64Image: "",
  })
   } catch (error) {
     // If there's an error, you can display an error alert or handle it as needed
     console.error("Error while submitting data:", error);
     alert("Data submission failed. Please try again.");
   }
 };


  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
     
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>
      {formData.base64Image && (
        <img src={formData.base64Image} alt="Selected" width="150" />
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Home;
