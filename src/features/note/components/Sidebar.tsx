import styled from "styled-components"
import NoteCard from "./NoteCard"
import { useState } from "react"

const Wrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: scroll;
`

function Sidebar() {
  const [curCard, setCurCard] = useState<number>(0)
  return (
    <Wrapper>
      {Array(20)
        .fill(null)
        .map((itm, idx) => (
          <NoteCard
            key={`noteCard-${idx}`}
            active={idx === curCard}
            title=""
            excerpt=""
            timestamp={new Date()}
            onClick={() => setCurCard(idx)}
          />
        ))}
    </Wrapper>
  )
}

export default Sidebar
