import '../styles/globals.css'



export const metadata = {
  title: 'Search Click Keep',
  description: 'Search Click Keep',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
