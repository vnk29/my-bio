import { supabase } from '@/integrations/supabase/client';

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export const submitContact = async (data: ContactSubmission) => {
  const { error } = await supabase
    .from('contacts')
    .insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });

  if (error) {
    throw new Error('Failed to submit contact form');
  }

  return { success: true };
};
