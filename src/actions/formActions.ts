// app/actions/sendFormData.ts
'use server';

export async function register(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log('Server received:', data);

  // Example: send to an API, save to database, etc.
  // await fetch('https://api.example.com/submit', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });

//   return { success: true };
}

export async function fallback(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log('Server received:', data);
//   return { success: false };
}

export const formActions = async (slug: string) => {
    switch (slug){
        case "register":
            return register
        default:
            return fallback
    }
}