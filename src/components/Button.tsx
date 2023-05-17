import { ReactNode } from "react"
import styled from "styled-components"

const Wrapper = styled.button`
  margin: 0 4px 0 0;
  padding: 5px;
  border: none;
  background: transparent;
  border-radius: 4px;
  transition: background-color 1s ease-out;
  &:hover {
    background: #ddd;
  }
`

function Button({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>
}

export default Button
