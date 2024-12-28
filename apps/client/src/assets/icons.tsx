interface Props {
  [key: string]: JSX.Element;
}

export const Icons = {
  Logo_Collapsed_Black: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="20" r="5" fill="black" />
      <path
        d="M 40 30 L 70 30 M 40 50 L 60 50 L 40 75"
        stroke="black"
        stroke-width="10"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  ),
  Logo_Collapsed_White: (
    <svg viewBox="30 2 45 83" xmlns="http://www.w3.org/2000/svg">
      <circle cx="43" cy="15" r="8" fill="white" />
      <path
        d="M 40 35 L 70 35 M 40 55 L 60 55 L 40 80"
        stroke="white"
        stroke-width="10"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  ),
  Logo_Black: (
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="10" height="40" fill="black" />
      <circle cx="35" cy="20" r="5" fill="black" />

      <path
        d="M 65 30 L 105 30 L 75 70"
        stroke="black"
        stroke-width="10"
        fill="none"
      />

      <path
        d="M 130 30 L 170 30 M 130 50 L 160 50 M 130 70 L 170 70 M 130 30 L 130 70"
        stroke="black"
        stroke-width="10"
        fill="none"
      />
    </svg>
  ),
  Logo_White: (
    <svg viewBox="25 15 150 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="10" height="40" fill="white" />
      <circle cx="35" cy="20" r="5" fill="white" />

      <path
        d="M 65 30 L 105 30 L 75 70"
        stroke="white"
        stroke-width="10"
        fill="none"
      />

      <path
        d="M 130 30 L 170 30 M 130 50 L 160 50 M 130 70 L 170 70 M 130 30 L 130 70"
        stroke="white"
        stroke-width="10"
        fill="none"
      />
    </svg>
  ),
};
