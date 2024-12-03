import { MapPin, Phone, Mail } from 'lucide-react';
import { Professional } from '../lib/types';

interface ProfessionalCardProps {
  professional: Professional;
}

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{professional.name}</h3>
          <p className="text-indigo-600 font-medium">{professional.profession}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>
            {professional.location.street}, {professional.location.city}, {professional.location.state} {professional.location.zipCode}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-5 h-5 mr-2" />
          <span>{professional.phoneNumber}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-5 h-5 mr-2" />
          <span>{professional.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;