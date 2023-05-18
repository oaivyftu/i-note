import styled, { css } from "styled-components"

const noBorderBottom = css`
  &:after {
    display: none;
  }
`

const Wrapper = styled.div<Pick<NoteCardProps, "active">>`
  padding: 10px 15px;
  position: relative;
  border-radius: 6px;
  background-color: transparent;
  margin-top: -1px;
  ${({ active }) =>
    active &&
    css`
      background-color: #fee092;
      ${noBorderBottom}
    `}

  &:last-child {
    ${noBorderBottom}
  }

  &:after {
    content: "";
    position: absolute;
    height: 1px;
    left: 15px;
    right: 15px;
    bottom: 0;
    background-color: #ddd;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

interface NoteCardProps {
  title: string
  timeInfo: string
  excerpt: string
  active?: boolean
  onClick?(): void
}

function NoteCard({ title, excerpt, timeInfo, active, onClick }: NoteCardProps) {
  return (
    <Wrapper active={active} onClick={() => onClick?.()}>
      <p>
        <b>{title || "New Note"}</b>
      </p>
      <p>
        <span>{timeInfo}</span> {excerpt || "No additional text"}
      </p>
    </Wrapper>
  )
}

export default NoteCard
