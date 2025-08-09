export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <img src="/web-app-manifest-192x192.png" alt="Logo" className="w-32 h-32 md:w-48 md:h-48 animate-pulse" />
      </div>
    </div>
  );
}
