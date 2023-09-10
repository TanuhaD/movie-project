const NextArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333"
    />
  </svg>
);
export default NextArrow;
