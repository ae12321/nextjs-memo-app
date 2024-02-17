import React from "react";

export default function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      {text}
    </div>
  );
}
