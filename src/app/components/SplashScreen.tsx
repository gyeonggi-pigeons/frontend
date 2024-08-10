import React, { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="splash-screen fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
      <div className="splash-content text-center">
        <h1 className="text-black text-2xl">맘마!</h1>
        <p className="text-slate-700 text-base">엄마를 만나는 중...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
