import { z } from 'zod';
import { enquiryOptions } from '@/content/enquiry-options';
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.').max(100, 'Please use no more than 100 characters.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  phone: z.string().trim().max(40, 'Please use no more than 40 characters.').regex(/^[+\d\s().-]*$/, 'Please enter a valid phone number.'),
  product: z.string().refine(value => value === '' || enquiryOptions.some(p => p.slug === value), 'Please choose an available style.'),
  message: z.string().trim().min(10, 'Please tell us a little more (at least 10 characters).').max(3000, 'Please use no more than 3,000 characters.'),
  consent: z.literal(true, { error: 'Please agree to be contacted about your enquiry.' }),
  website: z.string().max(0, 'Unable to submit this enquiry.').optional(),
});
