import React, { useEffect, useRef } from "react";

const NativeClickListener = ({ onClickOutside, children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClickOutside]);

  return <div ref={containerRef}>{children}</div>;
};

export default NativeClickListener;
