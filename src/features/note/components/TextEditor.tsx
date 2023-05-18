import styled from "styled-components"
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  Editor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js"
import "draft-js/dist/Draft.css"
import { Dispatch, useCallback, useContext, useEffect, useMemo, useState } from "react"
import draftToHtml from "draftjs-to-html"
import * as React from "react"
import debounce from "lodash/debounce"
import { NoteContext } from "../index"
import apiNoteService from "../../../services/ApiNoteService"
import { format } from "date-fns"

const Wrapper = styled.div`
  position: relative;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: white;
  padding: 30px;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  .DraftEditor-root {
    flex: 1 0 auto;
  }
  .DraftEditor-editorContainer {
    width: 100%;
    height: 100%;
  }
`
const TimeInfo = styled.div`
  text-align: center;
  margin: 0 0 10px;
  color: #aaa;
`

function fromHTML(content: string, setEditorState: Dispatch<any>) {
  const blocksFromHTML = convertFromHTML(content)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )
  setEditorState(EditorState.createWithContent(state))
}

interface UpdateNoteArgs {
  noteId: number
  content: string
  text: string
  setNoteList: Dispatch<any>
  setCurNoteIndex: Dispatch<any>
}

async function createNote({ setNoteList }: Pick<UpdateNoteArgs, "setNoteList">) {
  try {
    const userId = Number(localStorage.getItem("userId"))
    await apiNoteService.createNewNote({ userId, content: "", text: "" })
    const { data: newNoteList } = await apiNoteService.getNoteList()
    setNoteList(newNoteList)
  } catch (e: unknown) {
    const error = e as Error
    alert(error.message)
  }
}
async function updateNote({ noteId, content, text, setNoteList, setCurNoteIndex }: UpdateNoteArgs) {
  try {
    await apiNoteService.updateNote(noteId, { content, text })
    const { data: newNoteList } = await apiNoteService.getNoteList()
    setNoteList(newNoteList)
    setCurNoteIndex(0)
  } catch (e) {
    const error = e as Error
    alert(error.message)
  }
}

function TextEditor() {
  const {
    shouldFromHTML,
    curNoteIndex,
    noteList,
    setShouldFromHTML,
    setNoteList,
    setCurNoteIndex,
  } = useContext(NoteContext)
  const curNote = noteList[curNoteIndex]
  const content = curNote?.content
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    if (content !== undefined && shouldFromHTML) {
      fromHTML(content, setEditorState)
      setShouldFromHTML(false)
    }
  }, [content])

  useEffect(() => {
    if (!noteList.length) {
      setEditorState(EditorState.createEmpty())
    }
  }, [noteList])

  const lazyUpdateNote = useMemo(
    () =>
      debounce(updateNote, 500, {
        trailing: true,
        leading: false,
      }),
    []
  )

  function handleKeyCommand(command: EditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return "handled"
    }

    if (command === "me") return "handled"

    return "not-handled"
  }

  const HEADING = "header-one"

  const onFocus = () => {
    if (!noteList.length) {
      createNote({ setNoteList })
      setShouldFromHTML(false)
    }
  }

  const onChange = (newState: EditorState) => {
    const currentContent = newState.getCurrentContent()
    const firstBlockKey = currentContent.getBlockMap().first().getKey()
    const currentBlockKey = newState.getSelection().getAnchorKey()
    const isFirstBlock = currentBlockKey === firstBlockKey
    const currentBlockType = RichUtils.getCurrentBlockType(newState)
    const isHeading = currentBlockType === HEADING
    if (isFirstBlock !== isHeading) {
      return setEditorState(RichUtils.toggleBlockType(newState, HEADING))
    }
    setEditorState(newState)

    if (noteList.length) {
      // Update process
      const text = newState.getCurrentContent().getPlainText()
      const newList = [...noteList]
      newList[curNoteIndex].text = text
      setNoteList(newList)

      // Code to handle tohtml extraction:
      const rawContentState = convertToRaw(newState.getCurrentContent())
      const htmlContent = draftToHtml(rawContentState)

      const oldContent = editorState.getCurrentContent()
      if (oldContent !== currentContent) {
        lazyUpdateNote({
          text,
          content: htmlContent,
          noteId: newList[curNoteIndex].id,
          setNoteList,
          setCurNoteIndex,
        })
        setShouldFromHTML(false)
      }
    }
  }

  return (
    <Wrapper>
      <TimeInfo>
        {curNote?.updatedAt && format(new Date(curNote.updatedAt), "dd/MM/yy - hh:mm")}
      </TimeInfo>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        onFocus={onFocus}
      />
    </Wrapper>
  )
}

export default TextEditor
