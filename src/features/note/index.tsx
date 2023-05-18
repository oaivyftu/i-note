import styled from "styled-components"
import Sidebar from "./components/Sidebar"
import ToolBar from "./components/ToolBar"
import TextEditor from "./components/TextEditor"
import React, { createContext, useEffect, useState } from "react"
import { NoteItem } from "../../types"
import apiNoteService from "../../services/ApiNoteService"

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

interface NoteContextProps {
  curNoteIndex: number
  noteList: NoteItem[]
  shouldFromHTML: boolean
  setNoteList: React.Dispatch<any>
  setCurNoteIndex: React.Dispatch<any>
  setShouldFromHTML: React.Dispatch<any>
}

export const NoteContext = createContext<NoteContextProps>({
  shouldFromHTML: true,
  curNoteIndex: 0,
  noteList: [],
  setNoteList() {},
  setCurNoteIndex() {},
  setShouldFromHTML() {},
})

function Note() {
  const [shouldFromHTML, setShouldFromHTML] = useState<boolean>(true)
  const [curNoteIndex, setCurNoteIndex] = useState<number>(0)
  const [noteList, setNoteList] = useState<NoteItem[]>([])

  useEffect(() => {
    async function fetchNoteList() {
      try {
        const { data } = await apiNoteService.getNoteList()
        setNoteList(data)
      } catch (e: unknown) {
        const error = e as Error
        alert(error.message)
      }
    }
    fetchNoteList()
  }, [])

  return (
    <NoteContext.Provider
      value={{
        noteList,
        curNoteIndex,
        shouldFromHTML,
        setNoteList,
        setCurNoteIndex,
        setShouldFromHTML,
      }}
    >
      <Wrapper>
        <EmptyCell />
        <ToolBar />
        <Sidebar />
        <TextEditor />
      </Wrapper>
    </NoteContext.Provider>
  )
}

export default Note
