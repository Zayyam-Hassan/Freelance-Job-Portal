import React, { useState } from "react";
import "./VerificationPage.css";
import { Plus } from 'lucide-react';

const VerificationPage = () => {
  const [step, setStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [skills, setSkills] = useState([{ skill: "", level: "" }]);
  const [education, setEducation] = useState([{ country: "", university: "", title: "", major: "", year: "" }]);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="verification-container max-w-4xl mx-auto mt-24 p-8 bg-white shadow-lg rounded-xl border border-gray-200 py-8">
      {/* Progress Bar */}
      <div className="relative flex justify-between items-center mb-8">
        <div className="flex items-center w-full">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center w-1/3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                  step >= num ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {num}
              </div>
              {num < totalSteps && (
                <div className={`h-1 w-full progress-bar ${step > num ? "bg-green-500" : "bg-gray-300"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">👤 Personal Information</h2>
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-4">Profile Picture</label>

            {/* Modern File Upload with + icon */}
            <div className="relative">
              <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" accept="image/*" />
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
          </div>
          <div className="mt-6 space-y-4">
            <input type="text" placeholder="First Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
            <input type="text" placeholder="Last Name" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
            <select className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required>
              <option value="">Select Country</option>
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
            <input type="text" placeholder="CNIC No" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
          </div>
        </>
      )}

      {/* Step 2: Professional Info */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">💼 Professional Info</h2>

          {/* Skills */}
          <label className="block font-medium mb-2">Skills</label>
          {skills.map((_, index) => (
            <div key={index} className="flex space-x-3 mb-3">
              <input type="text" placeholder="Skill" className="w-2/3 p-3 border rounded-lg" />
              <select className="w-1/3 p-3 border rounded-lg">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setSkills(skills.filter((_, i) => i !== index))}>
                ✖
              </button>
            </div>
          ))}
          <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => setSkills([...skills, { skill: "", level: "" }])}>
            ➕ Add Skill
          </button>

          {/* Education */}
          <label className="block font-medium mb-2">Education</label>
          {education.map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-3">
              <input type="text" placeholder="Country" className="p-3 border rounded-lg" />
              <input type="text" placeholder="University" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Title" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Major" className="p-3 border rounded-lg" />
              <input type="text" placeholder="Year" className="p-3 border rounded-lg" />
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setEducation(education.filter((_, i) => i !== index))}>
                ✖
              </button>
            </div>
          ))}
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEducation([...education, { country: "", university: "", title: "", major: "", year: "" }])}>
            ➕ Add Education
          </button>
        </>
      )}

      {/* Step 3: Account Security */}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">🔒 Account Security</h2>
          <div className="space-y-4">
            <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
            <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300" required />
          </div>
          <label className="flex items-center mt-4 space-x-2">
            <input type="checkbox" required className="w-4 h-4" />
            <span>I agree to the Terms and Conditions</span>
          </label>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            step === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500 text-white"
          }`}
        >
           Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          {step === totalSteps ? " Submit" : "Next "}
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;