import { Input } from '@mantine/core';
import searchIcon from './../../shared/icons/search.svg'
import './style.scss'


interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {

  return (
    <Input
        value={value}
        onChange={(event) => onChange(event)}
        placeholder="Должность или название компании"
        size="lg"
        w={450}
        className={'search-input'}
        leftSection={
            <img 
            src={searchIcon} 
            height={20} 
            width={20} 
            alt="search"
            />
        }
    />
  );
}

export default SearchInput