import { useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from 'lucide-react';
import { api } from '../lib/axios';
import { Professional, PROFESSIONS } from '../lib/types';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import ProfessionalCard from '../components/ProfessionalCard';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: professionals = [], isLoading } = useQuery(
    ['professionals', selectedCity, selectedProfession],
    async () => {
      const params = new URLSearchParams();
      if (selectedCity) params.append('city', selectedCity);
      if (selectedProfession) params.append('profession', selectedProfession);

      const response = await api.get(`/professionals?${params.toString()}`);
      return response.data;
    },
    {
      enabled: !!selectedCity,
    }
  );

  const filteredProfessionals = professionals.filter((professional: Professional) =>
    professional.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const professionOptions = PROFESSIONS.map(profession => ({
    value: profession,
    label: profession,
  }));

  // const cityOptions = [
  //   { value: 'new-york', label: 'New York' },
  //   { value: 'los-angeles', label: 'Los Angeles' },
  //   { value: 'chicago', label: 'Chicago' },
  //   { value: 'houston', label: 'Houston' },
  //   { value: 'phoenix', label: 'Phoenix' },
  // ];
  const cityOptions = [
    { value: 'kolhapur', label: 'Kolhapur' },
    { value: 'sangli', label: 'Sangli' },
    { value: 'satara', label: 'Satara' },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Find Local Professionals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Select
            label="Select City"
            options={cityOptions}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          />
          <Select
            label="Select Profession"
            options={professionOptions}
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
          />
          <div className="relative">
            <Input
              label="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search professionals..."
            />
            <Search className="absolute right-3 top-9 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional: Professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {selectedCity
              ? 'No professionals found for the selected criteria.'
              : 'Please select a city to view professionals.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;