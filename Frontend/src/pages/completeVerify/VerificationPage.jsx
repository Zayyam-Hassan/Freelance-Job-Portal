// import React, { useState } from "react";
// import "./VerificationPage.css";
// import { Plus } from 'lucide-react';

// const VerificationPage = () => {
//   const [step, setStep] = useState(1);
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([{ skill: "", level: "" }]);
//   const [education, setEducation] = useState([{ country: "", university: "", title: "", major: "", year: "" }]);
//   const totalSteps = 3;

//   const handleNext = () => {
//     if (step < totalSteps) setStep(step + 1);
//   };

//   const handlePrev = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePhoto(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="verification-container max-w-4xl mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl border border-gray-200 py-8">
//       {/* Progress Bar */}
//       <div className="relative flex justify-between items-center mb-8">
//         <div className="flex items-center w-full">
//           {[1, 2, 3].map((num) => (
//             <div key={num} className="flex flex-col items-center w-1/3">
//               <div
//                 className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
//                   step >= num ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
//                 }`}
//               >
//                 {num}
//               </div>
//               {num < totalSteps && (
//                 <div className={`h-1 w-full progress-bar ${step > num ? "bg-green-500" : "bg-gray-300"}`}></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Step 1: Personal Info */}
//       {step === 1 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">👤 Personal Information</h2>
//           <div className="flex flex-col items-center">
//             <label className="text-lg font-medium mb-4">Profile Picture</label>

//             {/* Modern File Upload with + icon */}
//             <div className="relative">
//               <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" accept="image/*" />
//               {profilePhoto ? (
//                 <div className="relative">
//                   <img
//                     src={profilePhoto}
//                     alt="Preview"
//                     className="w-24 h-24 rounded-full object-cover border-2 border-green-500 shadow-md"
//                   />
//                   <label 
//                     htmlFor="fileInput"
//                     className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-600 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-white" />
//                   </label>
//                 </div>
//               ) : (
//                 <label 
//                   htmlFor="fileInput" 
//                   className="w-24 h-24 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
//                 >
//                   <Plus className="w-8 h-8 text-green-500" />
//                 </label>
//               )}
//             </div>
//           </div>
//           <div className="mt-6 space-y-4">
//             <input type="text" placeholder="First Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
//             <input type="text" placeholder="Last Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
//             <select className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required>
//               <option value="">Select Country</option>
//               <option value="US">United States</option>
//               <option value="UK">United Kingdom</option>
//               <option value="CA">Canada</option>
//               <option value="AU">Australia</option>
//               <option value="DE">Germany</option>
//               <option value="FR">France</option>
//               <option value="IN">India</option>
//               <option value="JP">Japan</option>
//               <option value="BR">Brazil</option>
//               <option value="Other">Other</option>
//             </select>
//             <input type="text" placeholder="CNIC No" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
//           </div>
//         </>
//       )}

//       {/* Step 2: Professional Info */}
//       {step === 2 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">💼 Professional Info</h2>

//           {/* Skills */}
//           <label className="block font-medium mb-2">Skills</label>
//           {skills.map((_, index) => (
//             <div key={index} className="flex space-x-3 mb-3">
//               <input type="text" placeholder="Skill" className="w-2/3 p-3 border rounded-lg" />
//               <select className="w-1/3 p-3 border rounded-lg">
//                 <option>Beginner</option>
//                 <option>Intermediate</option>
//                 <option>Expert</option>
//               </select>
//               <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setSkills(skills.filter((_, i) => i !== index))}>
//                 ✖
//               </button>
//             </div>
//           ))}
//           <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => setSkills([...skills, { skill: "", level: "" }])}>
//             ➕ Add Skill
//           </button>

//           {/* Education */}
//           <label className="block font-medium mb-2">Education</label>
//           {education.map((_, index) => (
//             <div key={index} className="grid grid-cols-2 gap-4 mb-3">
//               <input type="text" placeholder="Country" className="p-3 border rounded-lg" />
//               <input type="text" placeholder="University" className="p-3 border rounded-lg" />
//               <input type="text" placeholder="Title" className="p-3 border rounded-lg" />
//               <input type="text" placeholder="Major" className="p-3 border rounded-lg" />
//               <input type="text" placeholder="Year" className="p-3 border rounded-lg" />
//               <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setEducation(education.filter((_, i) => i !== index))}>
//                 ✖
//               </button>
//             </div>
//           ))}
//           <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEducation([...education, { country: "", university: "", title: "", major: "", year: "" }])}>
//             ➕ Add Education
//           </button>
//         </>
//       )}

//       {/* Step 3: Account Security */}
//       {step === 3 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">🔒 Account Security</h2>
//           <div className="space-y-4">
//             <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
//             <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
//           </div>
//           <label className="flex items-center mt-4 space-x-2">
//             <input type="checkbox" required className="w-4 h-4" />
//             <span>I agree to the Terms and Conditions</span>
//           </label>
//         </>
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={handlePrev}
//           disabled={step === 1}
//           className={`px-6 py-3 rounded-lg font-semibold transition ${
//             step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500 text-white"
//           }`}
//         >
//            Back
//         </button>
//         <button
//           onClick={handleNext}
//           className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
//         >
//           {step === totalSteps ? " Submit" : "Next "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerificationPage;
import React, { useState, useEffect } from "react";
import "./VerificationPage.css";
import { Plus } from 'lucide-react';
import axios from "axios"; // Make sure axios is installed

const VerificationPage = () => {
  // State for form data
  const [step, setStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [cnic, setCnic] = useState("");
  const [skills, setSkills] = useState([{ name: "", level: "Beginner" }]);
  const [education, setEducation] = useState([{ country: "", university: "", title: "", major: "", year: "" }]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [totalSteps, setTotalSteps] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check user role from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const userIsSeller = currentUser.isSeller;
    setIsSeller(userIsSeller);
    
    // If not a seller, adjust total steps to 2 (skip professional info)
    if (!userIsSeller) {
      setTotalSteps(2);
    }
  }, []);

  // Validation functions for each step
  const validateStep1 = () => {
    return firstName.trim() !== "" && 
           lastName.trim() !== "" && 
           country !== "" && 
           cnic.trim() !== "" && 
           profilePhoto !== null;
  };

  const validateStep2 = () => {
    // Check if all skills have a name
    const validSkills = skills.every(skill => skill.name.trim() !== "");
    
    // Check if all education entries have all required fields
    const validEducation = education.every(
      edu => edu.country.trim() !== "" && 
             edu.university.trim() !== "" && 
             edu.title.trim() !== "" && 
             edu.major.trim() !== "" && 
             edu.year.trim() !== ""
    );
    
    return validSkills && validEducation;
  };

  const validateStep3 = () => {
    return password.trim() !== "" && 
           confirmPassword.trim() !== "" && 
           password === confirmPassword && 
           agreeToTerms;
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (step === 1) return validateStep1();
    if (step === 2) return validateStep2();
    if (step === 3) return validateStep3();
    return false;
  };

  // Handle next step navigation with special logic for non-sellers
  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setError("Please fill in all required fields before proceeding.");
      return;
    }
    
    setError("");
    
    if (step < totalSteps) {
      // If user is not a seller and currently on step 1, jump to step 3 (which will be shown as step 2)
      if (!isSeller && step === 1) {
        setStep(3);
      } else {
        setStep(step + 1);
      }
    } else if (step === totalSteps) {
      handleSubmit();
    }
  };

  // Handle previous step navigation with special logic for non-sellers
  const handlePrev = () => {
    setError("");
    
    if (step > 1) {
      // If user is not a seller and currently on step 3, go back to step 1
      if (!isSeller && step === 3) {
        setStep(1);
      } else {
        setStep(step - 1);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to a server and get a URL
      // For now, we'll use a local object URL
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  // Submit form data to API
  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const userId = currentUser.id;

      if (!userId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Prepare education data in the format expected by the API
      const formattedEducation = education.map(edu => ({
        degree: `${edu.title} in ${edu.major} from ${edu.university}`,
        graduation_year: parseInt(edu.year)
      }));

      // Prepare the API request data
      const requestData = {
        userId,
        full_verification: {
          full_name: `${firstName} ${lastName}`,
          profile_pic: profilePhoto, // In a real app, this would be a URL from your file upload
          country: country,
          cnic: cnic
        },
        freelancer_portfolio: {
          education: formattedEducation,
          skills: skills.map(skill => ({
            name: skill.name,
            level: skill.level
          }))
        }
      };

      // Make the API request with explicit configuration
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/professional_info',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          // Include authentication token if needed
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      if (response.status === 201) {
        alert("Verification completed successfully!");
        // Redirect or update UI as needed
      }
    } catch (error) {
      console.error("Error submitting verification data:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        setError(`Server error: ${error.response.data.error || error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your internet connection and try again.");
      } else {
        // Something happened in setting up the request
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get the display step number for non-sellers (1, 2 instead of 1, 3)
  const getDisplayStep = (actualStep) => {
    if (!isSeller && actualStep === 3) {
      return 2;
    }
    return actualStep;
  };

  // Function to get the total steps displayed in progress bar
  const getProgressSteps = () => {
    return isSeller ? [1, 2, 3] : [1, 2];
  };

  return (
    <div className="verification-container max-w-4xl mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl border border-gray-200 py-8">
      {/* Progress Bar - Conditional rendering based on user role */}
      <div className="relative flex justify-between items-center mb-8">
        <div className="flex items-center w-full">
          {getProgressSteps().map((num, index) => (
            <div key={num} className="flex flex-col items-center" style={{ width: `${100 / getProgressSteps().length}%` }}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  (!isSeller && step >= (num === 2 ? 3 : num)) || (isSeller && step >= num) 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {num}
              </div>
              {index < getProgressSteps().length - 1 && (
                <div 
                  className={`h-1 w-full progress-bar ${
                    (!isSeller && step > (num === 2 ? 3 : num)) || (isSeller && step > num)
                      ? "bg-green-500" 
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">👤 Personal Information</h2>
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-4">Profile Picture <span className="text-red-500">*</span></label>

            {/* Modern File Upload with + icon */}
            <div className="relative">
              <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" accept="image/*" required />
              {profilePhoto ? (
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500 shadow-md"
                  />
                  <label 
                    htmlFor="fileInput"
                    className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </label>
                </div>
              ) : (
                <label 
                  htmlFor="fileInput" 
                  className="w-24 h-24 rounded-full border-2 border-dashed border-green-500 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
                >
                  <Plus className="w-8 h-8 text-green-500" />
                </label>
              )}
            </div>
            {!profilePhoto && (
              <p className="text-sm text-red-500 mt-2">Profile picture is required</p>
            )}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="First Name *" 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
              {firstName.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">First name is required</p>
              )}
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Last Name *" 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
              {lastName.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">Last name is required</p>
              )}
            </div>
            <div>
              <select 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select Country *</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IN">India</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="Other">Other</option>
              </select>
              {country === "" && (
                <p className="text-sm text-red-500 mt-1">Country selection is required</p>
              )}
            </div>
            <div>
              <input 
                type="text" 
                placeholder="CNIC No *" 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required 
              />
              {cnic.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">CNIC number is required</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Step 2: Professional Info - Only visible to sellers */}
      {isSeller && step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">💼 Professional Info</h2>

          {/* Skills */}
          <label className="block font-medium mb-2">Skills <span className="text-red-500">*</span></label>
          {skills.map((skill, index) => (
            <div key={index} className="flex space-x-3 mb-3">
              <input 
                type="text" 
                placeholder="Skill name *" 
                className="w-2/3 p-3 border rounded-lg" 
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index].name = e.target.value;
                  setSkills(newSkills);
                }}
                required
              />
              <select 
                className="w-1/3 p-3 border rounded-lg"
                value={skill.level}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index].level = e.target.value;
                  setSkills(newSkills);
                }}
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <button 
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  if (skills.length > 1) {
                    setSkills(skills.filter((_, i) => i !== index));
                  } else {
                    setError("You must have at least one skill.");
                  }
                }}
              >
                ✖
              </button>
            </div>
          ))}
          {skills.some(skill => skill.name.trim() === "") && (
            <p className="text-sm text-red-500 mb-2">All skill names are required</p>
          )}
          <button 
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => setSkills([...skills, { name: "", level: "Beginner" }])}
          >
            ➕ Add Skill
          </button>

          {/* Education */}
          <label className="block font-medium mb-2">Education <span className="text-red-500">*</span></label>
          {education.map((edu, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
              <input 
                type="text" 
                placeholder="Country *" 
                className="p-3 border rounded-lg" 
                value={edu.country}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].country = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input 
                type="text" 
                placeholder="University *" 
                className="p-3 border rounded-lg"
                value={edu.university}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].university = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input 
                type="text" 
                placeholder="Title *" 
                className="p-3 border rounded-lg"
                value={edu.title}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].title = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input 
                type="text" 
                placeholder="Major *" 
                className="p-3 border rounded-lg"
                value={edu.major}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].major = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <input 
                type="number" 
                placeholder="Year *" 
                className="p-3 border rounded-lg"
                value={edu.year}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].year = e.target.value;
                  setEducation(newEducation);
                }}
                required
              />
              <button 
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  if (education.length > 1) {
                    setEducation(education.filter((_, i) => i !== index));
                  } else {
                    setError("You must have at least one education entry.");
                  }
                }}
              >
                ✖
              </button>
            </div>
          ))}
          {education.some(edu => 
            edu.country.trim() === "" || 
            edu.university.trim() === "" || 
            edu.title.trim() === "" || 
            edu.major.trim() === "" || 
            edu.year.trim() === ""
          ) && (
            <p className="text-sm text-red-500 mb-2">All education fields are required</p>
          )}
          <button 
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setEducation([...education, { country: "", university: "", title: "", major: "", year: "" }])}
          >
            ➕ Add Education
          </button>
        </>
      )}

      {/* Step 3: Account Security (displayed as step 2 for non-sellers) */}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            🔒 Account Security
          </h2>
          <div className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Password *" 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              {password.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">Password is required</p>
              )}
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Confirm Password *" 
                className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              {confirmPassword.trim() === "" && (
                <p className="text-sm text-red-500 mt-1">Confirm password is required</p>
              )}
              {password !== confirmPassword && confirmPassword.trim() !== "" && (
                <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
          </div>
          <label className="flex items-center mt-4 space-x-2">
            <input 
              type="checkbox" 
              required 
              className="w-4 h-4"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <span>I agree to the Terms and Conditions <span className="text-red-500">*</span></span>
          </label>
          {!agreeToTerms && (
            <p className="text-sm text-red-500 mt-1">You must agree to the terms and conditions</p>
          )}
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500 text-white"
          }`}
        >
           Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading || !isCurrentStepValid()}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            isLoading || !isCurrentStepValid()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isLoading ? "Processing..." : (step === totalSteps ? "Submit" : "Next")}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;