import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  flex: 0 1 400px;
  background-color: white;
  box-shadow: 2px 2px 5px #282c34;
  border-radius: 4px;
  padding: 15px 30px;
`

export const FormRow = styled.div`
  margin: 0 0 10px;
  display: flex;
  label {
    flex: 0 1 100px;
  }
  input {
    flex: 1 0 auto;
  }
`
export const edgeRowCss = css`
  text-align: center;
  margin: 0 0 10px;
`
export const HeaderRow = styled.div`
  ${edgeRowCss}
`
export const SubmitRow = styled.div`
  ${edgeRowCss}
`
