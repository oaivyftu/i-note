import styled from "styled-components"
import Sidebar from "./components/Sidebar"
import ToolBar from "./components/ToolBar"
import TextEditor from "./components/TextEditor"

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 300px 1fr;
  gap: 2px;
  background-color: #ddd;
  height: 100vh;
`

const EmptyCell = styled.div`
  grid-area: 1 / 1/ 2/ 1;
  background-color: white;
`

function Note() {
  return (
    <Wrapper>
      <EmptyCell />
      <ToolBar />
      <Sidebar />
      <TextEditor />
    </Wrapper>
  )
}

export default Note
