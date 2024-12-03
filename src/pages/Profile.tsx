import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { api } from '../lib/axios';
import { useAuthStore } from '../lib/store';
import { Professional } from '../lib/types';
import { Button } from '../components/ui/Button';

const Profile = () => {
  const { user } = useAuthStore();

  const { data: profile, isLoading } = useQuery<Professional>(
    'profile',
    async () => {
      const response = await api.get('/professionals/profile');
      return response.data;
    },
    {
      onError: () => {
        toast.error('Failed to load profile');
      },
    }
  );

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center">Failed to load profile</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Professional Profile</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1">{profile.phoneNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Profession</label>
                <p className="mt-1">{profile.profession}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Street</label>
                <p className="mt-1">{profile.location.street}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">City</label>
                <p className="mt-1">{profile.location.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">State</label>
                <p className="mt-1">{profile.location.state}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Zip Code</label>
                <p className="mt-1">{profile.location.zipCode}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="mr-4">
              Edit Profile
            </Button>
            <Button variant="secondary">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;