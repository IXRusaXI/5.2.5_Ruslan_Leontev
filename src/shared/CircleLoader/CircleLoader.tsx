import { Center, Container, Image } from "@mantine/core"
import loaderIcon from './../../assets/loader.gif'

function CircleLoader() {
    return (
        <Container size="sm" mt="xl">
            <Center h="100%">
                <Image w='20%' h='20%' src={loaderIcon} alt="загрузка"/>
            </Center>
        </Container>
    )
}

export default CircleLoader