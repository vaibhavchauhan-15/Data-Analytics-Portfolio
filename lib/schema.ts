import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email address'),
  subject: z.enum(['job', 'freelance', 'collab', 'other']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>

export const SUBJECT_OPTIONS: { value: ContactInput['subject']; label: string }[] = [
  { value: 'job', label: 'Job Opportunity' },
  { value: 'freelance', label: 'Freelance / Contract' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'other', label: 'Other' },
]
