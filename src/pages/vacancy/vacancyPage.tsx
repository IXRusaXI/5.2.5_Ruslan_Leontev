import { Navigate, useParams } from "react-router-dom";
import { Vacancy as VacancyCard } from "../../widgets/Vacancy/Vacancy"
import { Container, Title, Text } from "@mantine/core";
import { type Vacancy } from './../types/types'
import { useQueryParams } from "../../tools/params/ParamTool";
import ShadowWrapper from './../../shared/ShadowWrapper/ShadowWrapper';


function VacancyPage() {
    const { id } = useParams();
    let vacancy: Vacancy | undefined;
    const { getVacancyById } = useQueryParams()

    if (id) vacancy = getVacancyById(id)

    return (<>
        {vacancy && <Container size="sm" py="lg">
            <VacancyCard
                key={id}
                vacancy={vacancy}
            />
        </Container>}
        
        {vacancy && <Container size="sm" py="lg">
            <ShadowWrapper>
                <Title order={3}>Компания</Title>
                <Text mb='xl'>{vacancy.employer?.employerDescription}</Text>
                <Title order={4}>О проекте:</Title>
                <Text>{vacancy.description}</Text>
            </ShadowWrapper>
        </Container>}
    </>)
}

export default VacancyPage
