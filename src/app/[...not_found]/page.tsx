import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="py-12 text-center">
      <Image src={"/svg/404.svg"} alt="404" width={300} height={300} className="mx-auto" />
      <div className="text-3xl mt-4">Page not found</div>
    </div>
  );
};

export default NotFoundPage;
