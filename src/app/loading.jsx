
export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">

        <div className="relative flex items-center justify-center mb-8">
          <div className="w-24 h-24 border-4 border-green-100 border-t-green-500 border-r-red-500 rounded-full animate-spin"></div>

          <div className="absolute w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-800">
          Loading
          <span className="text-green-500">.</span>
          <span className="text-red-500">.</span>
          <span className="text-green-300">.</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-500">
          বাজারের তথ্য প্রস্তুত করা হচ্ছে। একটু অপেক্ষা করুন।
        </p>

        <div className="mt-8 w-56 h-1.5 bg-green-100 rounded-full overflow-hidden mx-auto">
          <div className="h-full w-1/2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>তথ্য প্রস্তুত হচ্ছে...</span>
        </div>

      </div>
    </main>
  );
}

