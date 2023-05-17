import styled from "styled-components"

interface IconProps {
  src: string
  size?: {
    width: number
    height: number
  }
}

const Wrapper = styled.div<Pick<IconProps, "size">>`
  display: inline-block;
  width: ${(props) => props.size!.width}px;
  height: ${(props) => props.size!.height}px;
  padding: 5px;
  img {
    width: 100%;
  }
`

function Icon({ size = { width: 30, height: 30 }, src }: IconProps) {
  return (
    <Wrapper size={size}>
      <img src={src} alt="" />
    </Wrapper>
  )
}

export default Icon
