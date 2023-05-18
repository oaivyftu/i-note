import styled, { css } from "styled-components"
import NoteCard from "./NoteCard"
import { useContext } from "react"
import { NoteContext } from "../index"
import { format } from "date-fns"

const Wrapper = styled.div<{ isEmpty: boolean }>`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  ${({ isEmpty }) =>
    isEmpty &&
    css`
      align-items: center;
      justify-content: center;
    `}
`
const NoNotes = styled.div`
  color: #aaa;
  font-size: 36px;
`

function Sidebar() {
  const { noteList, curNoteIndex, setCurNoteIndex, setShouldFromHTML } = useContext(NoteContext)
  return (
    <Wrapper isEmpty={!noteList.length}>
      {!noteList.length && <NoNotes>No Notes</NoNotes>}
      {noteList.map(({ id, text, createdAt, updatedAt }, idx) => (
        <NoteCard
          key={`noteCard-${id}`}
          active={idx === curNoteIndex}
          title={text.split("\n")?.[0]}
          excerpt={text.split("\n")?.[1]}
          timeInfo={format(new Date(updatedAt), "dd/MM/yy hh:mm")}
          onClick={() => {
            setCurNoteIndex(idx)
            setShouldFromHTML(true)
          }}
        />
      ))}
    </Wrapper>
  )
}

export default Sidebar
