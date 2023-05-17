import styled from "styled-components"
import { convertToRaw, Editor, EditorCommand, EditorState, RichUtils } from "draft-js"
import "draft-js/dist/Draft.css"
import { useState } from "react"
import draftToHtml from "draftjs-to-html"
import * as React from "react"

const Wrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: white;
  padding: 30px;
  display: flex;
  align-items: stretch;
  .DraftEditor-root {
    flex: 1 0 auto;
  }
  .DraftEditor-editorContainer {
    width: 100%;
    height: 100%;
  }
`

function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  function handleKeyCommand(command: EditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return "handled"
    }

    if (command === "me") return "handled"

    return "not-handled"
  }
  const rawContentState = convertToRaw(editorState.getCurrentContent())

  const markup = draftToHtml(rawContentState)
  const HEADING = "header-one"

  const onChange = (editorState: EditorState) => {
    const currentContent = editorState.getCurrentContent()
    const firstBlockKey = currentContent.getBlockMap().first().getKey()
    const currentBlockKey = editorState.getSelection().getAnchorKey()
    const isFirstBlock = currentBlockKey === firstBlockKey
    const currentBlockType = RichUtils.getCurrentBlockType(editorState)
    const isHeading = currentBlockType === HEADING
    if (isFirstBlock !== isHeading) {
      return setEditorState(RichUtils.toggleBlockType(editorState, HEADING))
    }
    setEditorState(editorState)
  }

  return (
    <Wrapper>
      <Editor editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={onChange} />
    </Wrapper>
  )
}

export default TextEditor
