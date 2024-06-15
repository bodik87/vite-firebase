export default function Loader() {
  return (
    <div className="wrapper px-4 mt-4 h-[50px] flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 54 20"
        className="w-6 fill-gray-400"
      >
        <circle cx="6" cy="10" r="6">
          <animate
            attributeName="opacity"
            begin=".1"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          />
        </circle>
        <circle cx="26" cy="10" r="6">
          <animate
            attributeName="opacity"
            begin=".2"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          />
        </circle>
        <circle cx="46" cy="10" r="6">
          <animate
            attributeName="opacity"
            begin=".3"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          />
        </circle>
      </svg>
    </div>
  );
}
