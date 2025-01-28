import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusIcon, TrashIcon } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    degree: '',
    college: '',
    email: '',
    phone: '',
    academicRecords: [{ institution: '', degree: '', year: '' }],
    courses: [{ name: '', provider: '', completionDate: '' }],
    experiences: [{ company: '', role: '', duration: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field].map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    }));
  };

  const addItem = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: [...prevState[field], field === 'academicRecords' ? { institution: '', degree: '', year: '' } :
                                     field === 'courses' ? { name: '', provider: '', completionDate: '' } :
                                     { company: '', role: '', duration: '' }]
    }));
  };

  const removeItem = (index, field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://backendexpress-mi00.onrender.com/api/register_learner', formData);

      if (response.data?.success) {
        const { sessionId, userProfile } = response.data;
        localStorage.setItem('sessionToken', sessionId);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        navigate('/profile');
      } else {
        setErrorMessage(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = (key) => {
    const placeholders = {
      name: 'e.g., Ashish',
      age: 'e.g., 25',
      degree: 'e.g., B.Tech Computer Science',
      college: 'e.g., B.V Raju Institute Of Technology',
      email: 'e.g., hadhi@gmail.com',
      phone: 'e.g., 9110593766',
    };
    return placeholders[key] || '';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00B2FF]">
          Register for SDE Hire Pro
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Object.entries(formData).slice(0, 6).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type={key === 'email' ? 'email' : key === 'age' ? 'number' : 'text'}
                    required
                    placeholder={getPlaceholder(key)}
                    value={value}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Academic Records Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Academic Records</h3>
              {formData.academicRecords.map((record, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <input
                    name="institution"
                    type="text"
                    required
                    placeholder="Institution"
                    value={record.institution}
                    onChange={(e) => handleArrayChange(e, index, 'academicRecords')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="degree"
                    type="text"
                    required
                    placeholder="Degree"
                    value={record.degree}
                    onChange={(e) => handleArrayChange(e, index, 'academicRecords')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="year"
                    type="text"
                    required
                    placeholder="Year"
                    value={record.year}
                    onChange={(e) => handleArrayChange(e, index, 'academicRecords')}
                    className="w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'academicRecords')}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('academicRecords')}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#00B2FF] bg-[#00B2FF]/10 hover:bg-[#00B2FF]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF]"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Academic Record
              </button>
            </div>

            {/* Courses Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Courses</h3>
              {formData.courses.map((course, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Course Name"
                    value={course.name}
                    onChange={(e) => handleArrayChange(e, index, 'courses')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="provider"
                    type="text"
                    required
                    placeholder="Provider"
                    value={course.provider}
                    onChange={(e) => handleArrayChange(e, index, 'courses')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="completionDate"
                    type="date"
                    required
                    value={course.completionDate}
                    onChange={(e) => handleArrayChange(e, index, 'courses')}
                    className="w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'courses')}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('courses')}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#00B2FF] bg-[#00B2FF]/10 hover:bg-[#00B2FF]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF]"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Course
              </button>
            </div>

            {/* Experience Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Experience</h3>
              {formData.experiences.map((experience, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <input
                    name="company"
                    type="text"
                    required
                    placeholder="Company"
                    value={experience.company}
                    onChange={(e) => handleArrayChange(e, index, 'experiences')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="role"
                    type="text"
                    required
                    placeholder="Role"
                    value={experience.role}
                    onChange={(e) => handleArrayChange(e, index, 'experiences')}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <input
                    name="duration"
                    type="text"
                    required
                    placeholder="Duration"
                    value={experience.duration}
                    onChange={(e) => handleArrayChange(e, index, 'experiences')}
                    className="w-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00B2FF] focus:border-[#00B2FF] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index, 'experiences')}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('experiences')}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#00B2FF] bg-[#00B2FF]/10 hover:bg-[#00B2FF]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF]"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Experience
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B2FF] hover:bg-[#0090CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B2FF]"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

