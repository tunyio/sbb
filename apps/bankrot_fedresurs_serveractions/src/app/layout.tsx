import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Teest',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
