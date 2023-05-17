import styled, { css } from "styled-components"

const noBorderBottom = css`
  &:after {
    display: none;
  }
`

const Wrapper = styled.div<Pick<NoteCardProps, "active">>`
  padding: 10px 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
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
`

interface NoteCardProps {
  title: string
  timestamp: Date
  excerpt: string
  active?: boolean
  onClick?(): void
}

function NoteCard({ title, excerpt, timestamp, active, onClick }: NoteCardProps) {
  return (
    <Wrapper active={active} onClick={() => onClick?.()}>
      <p>
        <b>Title here</b>
      </p>
      <p>
        <span>08:10</span> Excerpt here...
      </p>
    </Wrapper>
  )
}

export default NoteCard
