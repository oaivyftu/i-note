import { ReactNode } from "react"
import styled from "styled-components"

const Wrapper = styled.button<Pick<ButtonProps, "disabled">>`
  margin: 0 4px 0 0;
  padding: 5px;
  border: none;
  background: transparent;
  border-radius: 4px;
  transition: background-color 1s ease-out;
  &:hover {
    background: #ddd;
  }
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.4;
    pointer-events: none;
  `}
`

interface ButtonProps {
  disabled?: boolean
  children: ReactNode
  onClick?(): void
}

function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <Wrapper disabled={disabled} onClick={onClick}>
      {children}
    </Wrapper>
  )
}

export default Button
