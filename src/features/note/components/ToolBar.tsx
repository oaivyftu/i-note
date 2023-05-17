import styled from "styled-components"
import Icon from "../../../components/Icon"
import downloadIcon from "../../../static/download.png"
import deleteIcon from "../../../static/delete.png"
import Button from "../../../components/Button"

const Wrapper = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 0 0 5px;
`

function ToolBar() {
  return (
    <Wrapper>
      <Button>
        <Icon src={downloadIcon} />
      </Button>
      <Button>
        <Icon src={deleteIcon} />
      </Button>
    </Wrapper>
  )
}

export default ToolBar
