import React from 'react';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
}

const ExperienceCard = ({ 
  company, 
  position, 
  duration, 
  description 
}: ExperienceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{position}</h3>
          <p className="text-indigo-600 font-medium">{company}</p>
        </div>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ExperienceCard;