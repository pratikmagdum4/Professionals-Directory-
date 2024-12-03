import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../lib/axios';
import { PROFESSIONS } from '../lib/types';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  profession: z.string().min(1, 'Please select a profession'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  location: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(5, 'Invalid zip code'),
  }),
});

type SignUpForm = z.infer<typeof signupSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await api.post('/professionals/signup', data);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to create account');
    }
  };

  const professionOptions = PROFESSIONS.map(profession => ({
    value: profession,
    label: profession,
  }));

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Select
          label="Profession"
          options={professionOptions}
          {...register('profession')}
          error={errors.profession?.message}
        />
        <Input
          label="Phone Number"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
        <div className="space-y-4">
          <h3 className="font-medium">Location</h3>
          <Input
            label="Street"
            {...register('location.street')}
            error={errors.location?.street?.message}
          />
          <Input
            label="City"
            {...register('location.city')}
            error={errors.location?.city?.message}
          />
          <Input
            label="State"
            {...register('location.state')}
            error={errors.location?.state?.message}
          />
          <Input
            label="Zip Code"
            {...register('location.zipCode')}
            error={errors.location?.zipCode?.message}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;