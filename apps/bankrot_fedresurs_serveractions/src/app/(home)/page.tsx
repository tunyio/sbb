import { SubmitButton } from '../_components/submit-button';
import { useFetch } from '@/hooks/useFetch';

export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server';

    const rawFormData = {
      login: formData.get('login'),
      password: formData.get('password')
    };

    const uFetch = useFetch('', false);

    const res = await uFetch.post(
      'http://193.168.46.135:3000/api/auth/local-login',
      rawFormData
    );

    console.log(res);

    // Revalidate cache and mutating data
  }

  return (
    <center>
      <form action={createInvoice}>
        <input type="text" name="login" placeholder="login" />
        <br />
        <br />
        <input type="text" name="password" placeholder="password" />
        <br />
        <br />

        <SubmitButton>Get auth token (do login)</SubmitButton>
      </form>
    </center>
  );
}
