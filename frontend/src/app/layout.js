export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>Job Scheduler Dashboard</h1>
        <hr />
        {children}
      </body>
    </html>
  );
}
