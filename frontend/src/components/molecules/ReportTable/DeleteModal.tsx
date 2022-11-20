import Modal from "../../atoms/Modal/Modal";
import styled from "styled-components";
import Button from "../../atoms/Button/Button";

const DocsList = styled.ul`
  list-style: decimal;
  list-style-position: inside;
  margin: 1rem 0;
  li {
    
  }
`

const DeleteButton = styled(Button)`
  border-color: ${({theme}) => theme.colors.red};
  color: ${({theme}) => theme.colors.red};
  transition: .2s all;
  &:hover, &:focus {
    background: ${({theme}) => theme.colors.red};
    color: white;
  }
`

const DeleteModal = ({isOpened, setIsModalOpened}) => {
    return (
        <Modal opened={isOpened} setIsOpened={setIsModalOpened}>
            <div style={{height:'100%', padding: '1rem 2rem'}}>
                <h2>Czy chcesz usunąć podane dokumenty?</h2>
                <DocsList>
                    <li>sdsf</li>
                </DocsList>
                <DeleteButton>Usuń</DeleteButton>
            </div>

        </Modal>
    )
}
export default DeleteModal
