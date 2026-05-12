import { useParams } from "react-router-dom";
import { Vacancy as VacancyCard } from "../../widgets/Vacancy/Vacancy"
import { Container } from "@mantine/core";
import { type Vacancy } from './../types/types'
import { useQueryParams } from "../../tools/params/ParamTool";


function VacancyPage() {
    const { id } = useParams();
    let vacancy: Vacancy | undefined;
    const { getVacancyById } = useQueryParams()

    if (id) vacancy = getVacancyById(id)

    return (
        vacancy && <Container size="sm" py="lg">
            <VacancyCard
                key={id}
                vacancy={vacancy}
            />
        </Container>
        

    )
}

export default VacancyPage
