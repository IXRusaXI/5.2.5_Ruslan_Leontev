import { Container, Portal, Title, Text, Group, Button, Image } from "@mantine/core"
import closeIcon from './../icons/close.svg'
import './style.scss'
import { useAppDispatch } from "../../store/typedHooks"
import { errorActions } from "../../store/slices/error/errorSlice"

const container = document.getElementById('modal-root')


function ErrorModal() {
    const dispatch = useAppDispatch()

    return (
        <Portal target={container || 'body'}>
            <Container
                size="xs"
                px="md"
                py="md"
                bg="red"
                style={{ 
                    borderRadius: '8px',
                    boxShadow: '0 0 6px 3px rgba(255, 0, 0, 0.35)', 
                    position: 'fixed',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                <Group justify="space-between">
                    <Title order={3}>Произошла ошибка</Title>
                    <Button
                        onClick={() => {
                            dispatch(errorActions.hideError())
                        }}

                        className="close-modal-btn"
                        h='26'
                        w='26'
                        radius="50%"
                    >
                        <Image 
                            src={closeIcon}
                            width={30}
                            height={30}
                        />
                    </Button>
                </Group>

                <Text>Отображен заранее заготовленный список вакансий</Text>
            </Container>
        </Portal>
    )
}

export default ErrorModal