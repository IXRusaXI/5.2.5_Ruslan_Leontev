import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/typedHooks"
import { filterActions } from "../../store/slices/filter/filterSlice"


export function useQueryParams() {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    const stateSearchString = useAppSelector(state => state.filter.searchString)
    const stateSkills = useAppSelector(state => state.filter.skills)
    const stateCity = useAppSelector(state => state.filter.city)
    const allVacancies = useAppSelector(state => state.vacancy.all)

    function getVacancyById(id: string) {
        return allVacancies.find((vacancy) => vacancy.id === id)
    }

    function updateSearchString(inputSearchString?: string) {
        const searchString = searchParams.get('searchString')

        if (inputSearchString !== undefined) {
            dispatch(filterActions.setSearchString(inputSearchString))
            updateParams('searchString', inputSearchString)
            return
        }

        if (searchString) {
            dispatch(filterActions.setSearchString(searchString))
        } else if (stateSearchString) {
            updateParams('searchString', stateSearchString)
        }
    }

    function updateSkills(inputSkills?: string[]) {
        const paramSkills = searchParams.get('skills')

        if (inputSkills != undefined) {
            dispatch(filterActions.setSkills(inputSkills))
            updateParams('skills', inputSkills)
            return
        }

        if (paramSkills && paramSkills.length > 0) {
            const mass = paramSkills.split(',')

            if (JSON.stringify(mass) !== JSON.stringify(stateSkills)) {
                dispatch(filterActions.setSkills(mass))
            }
        } else if (stateSkills && stateSkills.length > 0) {
            updateParams('skills', stateSkills)
        }
    }

    function updateCity(city?: string | null) {
        const paramCity = searchParams.get('city')

        if (city) {
            dispatch(filterActions.updateCity(city))
            if (city === 'Все города') {
                updateParams('city', '')
            } else {
                updateParams('city', city)
            }
            
            return
        }

        if (paramCity && paramCity.length > 0) {
            if (JSON.stringify(paramCity) !== JSON.stringify(stateCity)) {
                dispatch(filterActions.updateCity(paramCity))
            }
        } else if (stateCity && stateCity !== 'Все города') {
            updateParams('city', stateCity)
        } else if (stateCity === 'Все города') {
            updateParams('city', '')
        }
    }

    function updateParams(paramName: string, paramValue: any) {
        const newParams = new URLSearchParams(searchParams);

        if (Array.isArray(paramValue)) {
            if (paramValue.length > 0) {
                newParams.set(paramName, paramValue.join(','));
            } else {
                newParams.delete(paramName); 
            }
        } else if (paramValue && paramValue.length > 0) {
            newParams.set(paramName, paramValue);
        } else {
            newParams.delete(paramName);
        }

        setSearchParams(newParams);
    }
 
    return {
        getVacancyById,
        updateSearchString,
        updateSkills,
        updateCity
    }
}
