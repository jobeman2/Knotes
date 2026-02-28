// toast.tsx
import React from "react";

interface ToastProps {
  message: string;
  duration?: number; // Duration in milliseconds
  type?: "success" | "error" | "info" | "warning"; // Toast type for different styles
  onClose?: () => void; // Optional callback when toast closes
}

/**
 * A modern, minimal Toast component that displays a message for a specified duration.
 *
 * @param {ToastProps} props - The properties for the Toast component.
 * @param {string} props.message - The message to display in the toast.
 * @param {number} [props.duration=3000] - The duration for which the toast is visible (default is 3000ms).
 * @param {string} [props.type="info"] - The type of toast: "success", "error", "info", or "warning".
 * @param {Function} [props.onClose] - Optional callback function called when toast closes.
 * @returns {JSX.Element | null} The rendered Toast component or null if not visible.
 */
const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  type = "info",
  onClose,
}) => {
  const [visible, setVisible] = React.useState(true);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to complete before removing
      setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "error":
        return "bg-rose-50 border-rose-200 text-rose-700";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "info":
      default:
        return "bg-white border-gray-200 text-gray-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-5 h-5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5 text-rose-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 200);
  };

  if (!visible) return null;

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md w-full
        transition-all duration-200 ease-in-out
        ${isExiting ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}
      `}
    >
      <div
        className={`
        relative flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
        ${getTypeStyles()}
      `}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        {/* Message */}
        <div className="flex-1 text-sm font-medium leading-5">{message}</div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-xl"
          style={{
            animation: `shrink ${duration}ms linear forwards`,
            transformOrigin: "left",
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
