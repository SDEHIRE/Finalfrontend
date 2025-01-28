import React, { useState, useEffect } from 'react';
import { PersonalInformation } from './ProfilePageComponents/personal-information';
import { ProfileCard } from './ProfilePageComponents/profile-card';
import { Header } from './ProfilePageComponents/header';
import { Footer } from './ProfilePageComponents/footer';
import { ResumeSection } from './ProfilePageComponents/resume-section';
import { WorkExperience } from './ProfilePageComponents/work-experience';
import { Education } from './ProfilePageComponents/education';
import { Coins } from './ProfilePageComponents/coins';
import { AcademicTranscripts } from './ProfilePageComponents/academic-transcripts';
import { Certifications } from './ProfilePageComponents/certifications';
import { Links } from './ProfilePageComponents/links';
import { Skills } from './ProfilePageComponents/skills';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'ASHISH RATNA DARLA',
    username: '@ashish_ratna',
    country: 'India',
    email: '',
    phone: '+91-4302266851',
    resumeUploaded: false,
    coinsBalance: 1500,
    certifications: [],
    workExperiences: [],
    educations: [
      {
        school: "ST.JOSEPH'S HIGH SCHOOL",
        degree: "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE, B.Tech",
        duration: "November 2022 - Present"
      }
    ],
    links: [],
    skills: [],
    transcripts: []
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    calculateCompletionPercentage();
  }, [profile]);

  const calculateCompletionPercentage = () => {
    const totalFields = 10;
    let completedFields = 0;

    if (profile.name) completedFields++;
    if (profile.email) completedFields++;
    if (profile.phone) completedFields++;
    if (profile.country) completedFields++;
    if (profile.resumeUploaded) completedFields++;
    if (profile.certifications.length > 0) completedFields++;
    if (profile.workExperiences.length > 0) completedFields++;
    if (profile.educations.length > 0) completedFields++;
    if (profile.links.length > 0) completedFields++;
    if (profile.skills.length > 0) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  };

  const handleEditProfile = () => {
    // Implement edit profile logic
  };

  const handleAddResume = () => {
    setProfile(prev => ({ ...prev, resumeUploaded: true }));
  };

  const handleAddCoins = () => {
    // Implement add coins logic
  };

  const handleLearnMoreCoins = () => {
    // Implement learn more about coins logic
  };

  const handleAddMissingDetails = () => {
    // Implement add missing details logic
  };

  const handleAddCertification = () => {
    // Implement add certification logic
  };

  const handleAddExperience = () => {
    // Implement add work experience logic
  };

  const handleAddEducation = () => {
    // Implement add education logic
  };

  const handleEditEducation = (index) => {
    // Implement edit education logic
  };

  const handleAddLink = () => {
    // Implement add link logic
  };

  const handleAddSkill = () => {
    // Implement add skill logic
  };

  const handleAddTranscript = () => {
    // Implement add transcript logic
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <Header />
      
      <main className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          {/* Column 1 */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard
              name={profile.name}
              username={profile.username}
              country={profile.country}
              onEdit={handleEditProfile}
            />
            <PersonalInformation
              email={profile.email}
              phone={profile.phone}
              country={profile.country}
              onEdit={handleEditProfile}
            />
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#00A3FF] rounded-lg p-6 text-white shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="font-semibold text-2xl mb-2">Complete your profile</h2>
                  <p className="text-white/80">This data will be helpful to auto-fill your job applications</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <div className="w-full h-full rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-2xl font-bold">{completionPercentage}%</span>
                    </div>
                  </div>
                  <button onClick={handleAddMissingDetails} className="bg-white text-[#00A3FF] px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                    Add missing details
                  </button>
                </div>
              </div>
            </div>
            <ResumeSection
              resumeUploaded={profile.resumeUploaded}
              onAddResume={handleAddResume}
            />
            <WorkExperience
              experiences={profile.workExperiences}
              onAddExperience={handleAddExperience}
            />
            <Education
              educations={profile.educations}
              onAddEducation={handleAddEducation}
              onEditEducation={handleEditEducation}
            />
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-1 space-y-6">
            <Coins
              balance={profile.coinsBalance}
              onAddCoins={handleAddCoins}
              onLearnMore={handleLearnMoreCoins}
            />
            <AcademicTranscripts
              transcripts={profile.transcripts}
              onAddTranscript={handleAddTranscript}
            />
            <Certifications
              certifications={profile.certifications}
              onAddCertification={handleAddCertification}
            />
            <Links
              links={profile.links}
              onAddLink={handleAddLink}
            />
            <Skills
              skills={profile.skills}
              onAddSkill={handleAddSkill}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

