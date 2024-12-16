import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GoogleIcon(props) {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 32 32"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.75 16a7.745 7.745 0 01-15.032 2.626l-4.433 3.546A13.244 13.244 0 0029.25 16"
        fill="#00ac47"
      />
      <Path
        d="M23.75 16a7.739 7.739 0 01-3.252 6.299l4.383 3.506A13.204 13.204 0 0029.25 16"
        fill="#4285f4"
      />
      <Path
        d="M8.25 16a7.698 7.698 0 01.468-2.626L4.285 9.828a13.177 13.177 0 000 12.344l4.433-3.546A7.698 7.698 0 018.25 16z"
        fill="#ffba00"
      />
      <Path
        fill="#2ab2db"
        d="M8.718 13.374L8.718 13.374 8.718 13.374 8.718 13.374z"
      />
      <Path
        d="M16 8.25a7.699 7.699 0 014.558 1.496l4.06-3.79A13.215 13.215 0 004.285 9.828l4.433 3.546A7.756 7.756 0 0116 8.25z"
        fill="#ea4435"
      />
      <Path
        fill="#2ab2db"
        d="M8.718 18.626L8.718 18.626 8.718 18.626 8.718 18.626z"
      />
      <Path d="M29.25 15v1L27 19.5H16.5V14h11.75a1 1 0 011 1z" fill="#4285f4" />
    </Svg>
  )
}

export default GoogleIcon
