"use client";

// Example usage in a component
import { useState } from "react";
import Toast from "../components/Toast/toast";

const MyComponent = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>Show Toast</button>

      {showToast && (
        <Toast
          message="Your changes have been saved successfully!"
          duration={4000}
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default MyComponent;
