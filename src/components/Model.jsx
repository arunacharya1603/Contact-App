import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Model = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="p-4 z-50 m-auto  relative min-h-[200px] max-w-[80%] bg-white">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl self-end" />
            </div>
            {children}
          </div>

          <div className="backdrop-blur h-screen z-40 w-screen absolute top-0" />
        </>
      )}
    </>
 , document.getElementById("model-root") );
};

export default Model;
