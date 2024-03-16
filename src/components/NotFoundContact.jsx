import React from "react";

const NotFoundContact = () => {
  return (
    <div className="flex items-center justify-center m-auto h-[70vh] gap-4">
      <div>
        <img src="/contact.png" alt="" />
      </div>
      <h3 className="text-white text-2xl font-medium">Contact Not Found</h3>
    </div>
  );
};

export default NotFoundContact;
