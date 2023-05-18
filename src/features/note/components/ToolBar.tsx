import styled from "styled-components"
import Icon from "../../../components/Icon"
import downloadIcon from "../../../static/download.png"
import deleteIcon from "../../../static/delete.png"
import logoutIcon from "../../../static/logout.png"
import Button from "../../../components/Button"
import apiNoteService from "../../../services/ApiNoteService"
import { useContext } from "react"
import { NoteContext } from "../index"
import { useHistory } from "react-router-dom"

const Wrapper = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 0 0 5px;
`

function ToolBar() {
  const { push } = useHistory()
  const { curNoteIndex, noteList, setShouldFromHTML, setNoteList, setCurNoteIndex } =
    useContext(NoteContext)
  const onCreateNote = async () => {
    try {
      const userId = Number(localStorage.getItem("userId"))
      const { data } = await apiNoteService.createNewNote({ userId, content: "", text: "" })
      setNoteList([data, ...noteList])
      setCurNoteIndex(0)
      setShouldFromHTML(true)
    } catch (e) {
      const error = e as Error
      alert(error.message)
    }
  }
  const onDeleteNote = async () => {
    try {
      const curNoteId = noteList[curNoteIndex].id
      await apiNoteService.deleteNote(curNoteId)
      const { data } = await apiNoteService.getNoteList()
      if (curNoteIndex === noteList.length - 1 && curNoteIndex > 0) {
        setCurNoteIndex(curNoteIndex - 1)
      }
      setNoteList(data)
      setShouldFromHTML(true)
    } catch (e) {
      const error = e as Error
      alert(error.message)
    }
  }
  const onLogout = () => {
    localStorage.clear()
    push("/auth/login")
  }
  return (
    <Wrapper>
      <Button onClick={onCreateNote}>
        <Icon src={downloadIcon} />
      </Button>
      <Button disabled={!noteList.length} onClick={onDeleteNote}>
        <Icon src={deleteIcon} />
      </Button>
      <Button onClick={onLogout}>
        <Icon src={logoutIcon} />
      </Button>
    </Wrapper>
  )
}

export default ToolBar
